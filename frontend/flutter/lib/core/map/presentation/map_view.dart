import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fresh_nest/core/home/presentation/profile/farm_profile.dart';
import 'package:fresh_nest/core/map/application/map_manager.dart';
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
      'assets/logo.png',
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
        // icon: markerIcon,
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
        title: const Text("Find Nearby Stores"),
        centerTitle: true,
      ),
      body: GoogleMap(
        zoomControlsEnabled: false,
        // myLocationEnabled: true,
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
    );
  }
}

class LocationData {
  LatLng? currentLocation;
  LatLng? pickupLocation;
  LatLng? destinationLocation;
}

LocationData locationData = LocationData();
