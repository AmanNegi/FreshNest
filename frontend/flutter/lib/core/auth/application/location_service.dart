import 'package:fresh_nest/globals.dart';
import 'package:location/location.dart';

class LocationService {
  final Location _location = Location();
  LocationData? _locationData;

  LocationData? get locationData => _locationData;

  Future<void> requestLocation() async {
    bool serviceEnabled = await _location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await _location.requestService();
      if (!serviceEnabled) {
        showToast("Kindly enable location services to continue.");
        return;
      }
    }

    PermissionStatus permissionGranted = await _location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await _location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) {
        showToast("Kindly grant location permissions to continue.");
        return;
      }
    }

    _locationData = await _location.getLocation();
  }
}

LocationService locationService = LocationService();
