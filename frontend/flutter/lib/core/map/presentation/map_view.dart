import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fresh_nest/core/home/presentation/profile/farm_profile.dart';
import 'package:fresh_nest/core/map/application/map_manager.dart';
import 'package:fresh_nest/core/map/application/map_provider.dart';
import 'package:fresh_nest/data/cache/app_cache.dart';
import 'package:fresh_nest/globals.dart';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapViewPage extends ConsumerStatefulWidget {
  const MapViewPage({
    super.key,
  });

  @override
  ConsumerState<MapViewPage> createState() => _MapViewPageState();
}

class _MapViewPageState extends ConsumerState<MapViewPage> {
  late MapManager _mapManager;

  late BitmapDescriptor markerIcon;
  late BitmapDescriptor specialIcon;

  // 29.758039789163472, 76.67219946024011
  CameraPosition currentPosition = const CameraPosition(
    target: LatLng(29.758039789163472, 76.67219946024011),
    zoom: 14.5,
  );
  GoogleMapController? controller;
  Set<Marker> markers = {};

  final stores = [];
  final startAddressController = TextEditingController();

  _determinePosition() async {
    if (locationData.currentLocation == null) {
      bool serviceEnabled;
      LocationPermission permission;

      serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        bool res = await Geolocator.openLocationSettings();
        if (!res) return Future.error('Location services are disabled.');
      }

      permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          return Future.error('Location permissions are denied');
        }
      }

      if (permission == LocationPermission.deniedForever) {
        return Future.error(
            'Location permissions are permanently denied, we cannot request permissions.');
      }

      var pos = await Geolocator.getCurrentPosition();
      var currentLatLng = LatLng(pos.latitude, pos.longitude);
      locationData.currentLocation = currentLatLng;
    }

    currentPosition = CameraPosition(
      target: locationData.currentLocation!,
      zoom: 15.0,
    );

    appCache.currentLocation = locationData.currentLocation;

    if (controller != null) {
      // addMarker(currentPosition.target);
      controller!.moveCamera(
        CameraUpdate.newCameraPosition(currentPosition),
      );
      setState(() {});
    }
  }

  @override
  void initState() {
    _mapManager = MapManager(context, ref);
    getMarkers();
    if (appCache.currentLocation != null) {
      currentPosition = CameraPosition(
        target: appCache.currentLocation!,
        zoom: 15.0,
      );
      setState(() {});
    }

    super.initState();
  }

  void getMarkers() async {
    markerIcon = await BitmapDescriptor.fromAssetImage(
      const ImageConfiguration(size: Size(12, 12)),
      'assets/map_marker.png',
    );

    final stores = await _mapManager.getStores();

    for (var item in stores) {
      final latLng = LatLng(
        item.location.coordinates[0],
        item.location.coordinates[1],
      );
      addMarker(
        latLng,
        () => {
          goToPage(
            context,
            FarmProfilePage(user: item),
          )
        },
      );
    }

    setState(() {});
  }

  void addMarker(LatLng loc, Function onClick) async {
    print("Adding marker at ${loc.latitude} ${loc.longitude}");
    markers.add(
      Marker(
        icon: markerIcon,
        markerId: MarkerId(DateTime.now().microsecondsSinceEpoch.toString()),
        position: loc,
        onTap: () {
          onClick();
        },
      ),
    );
  }

  _getAddress(String address) async {
    List<Location> data = await locationFromAddress(address);
    if (data.isEmpty) return;

    addMarker(LatLng(data[0].latitude, data[0].longitude), () {});
    currentPosition = CameraPosition(
      target: LatLng(data[0].latitude, data[0].longitude),
      zoom: 15.0,
    );
    controller!.moveCamera(
      CameraUpdate.newCameraPosition(currentPosition),
    );
  }

  @override
  void dispose() {
    controller!.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Find Nearby Farms"),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          Positioned.fill(
            child: GoogleMap(
              myLocationEnabled: true,
              zoomControlsEnabled: false,
              scrollGesturesEnabled: true,
              mapType: MapType.hybrid,
              initialCameraPosition: currentPosition,
              compassEnabled: true,
              myLocationButtonEnabled: true,
              markers: markers,
              onMapCreated: (GoogleMapController? c) {
                if (c != null) {
                  controller = c;
                  if (appCache.currentLocation == null) {
                    _determinePosition();
                  }
                }
              },
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: SizedBox(
              height: 0.2 * getHeight(context),
              width: double.infinity,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: ref.read(mapProvider).getStores().length,
                itemBuilder: (context, index) {
                  final item = ref.read(mapProvider).getStores()[index];
                  return GestureDetector(
                    onTap: () {
                      controller!.animateCamera(
                        CameraUpdate.newCameraPosition(
                          CameraPosition(
                            target: LatLng(
                              item.location.coordinates[0],
                              item.location.coordinates[1],
                            ),
                            zoom: 15.0,
                          ),
                        ),
                      );
                    },
                    child: Container(
                      margin: const EdgeInsets.symmetric(
                          horizontal: 15.0, vertical: 15.0),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 15.0,
                        vertical: 10.0,
                      ),
                      height: 0.15 * getHeight(context),
                      width: 0.85 * getWidth(context),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(10.0),
                            child: item.images.isNotEmpty
                                ? Image.network(
                                    item.images[0],
                                    fit: BoxFit.cover,
                                    width: 0.3 * getWidth(context),
                                    height: double.infinity,
                                  )
                                : Container(
                                    color: Colors.green[100],
                                    child: Image.asset(
                                      "assets/logo.png",
                                      fit: BoxFit.contain,
                                      width: 0.3 * getWidth(context),
                                      height: double.infinity,
                                    ),
                                  ),
                          ),
                          const SizedBox(width: 15),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  item.name,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                  ),
                                ),
                                Text(
                                  item.email,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                // Text(item.location.toString()),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class LocationData {
  LatLng? currentLocation;
  LatLng? pickupLocation;
  LatLng? destinationLocation;
}

LocationData locationData = LocationData();
