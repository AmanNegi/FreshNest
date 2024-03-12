import 'package:fresh_nest/core/auth/application/auth.dart';
import 'package:fresh_nest/core/auth/application/location_service.dart';
import 'package:fresh_nest/core/home/presentation/widgets/loading_widget.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/widgets/action_button.dart';
import 'package:fresh_nest/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:fresh_nest/splash.dart';

class AdditionalDetailsPage extends ConsumerStatefulWidget {
  final String email;
  final String name;
  const AdditionalDetailsPage({
    super.key,
    required this.email,
    required this.name,
  });

  @override
  ConsumerState<AdditionalDetailsPage> createState() =>
      _AdditionalDetailsState();
}

class _AdditionalDetailsState extends ConsumerState<AdditionalDetailsPage> {
  late AuthManager _authManager;
  String dropdownValue = "customer";
  String email = "", password = "", username = "", phone = "";

  @override
  void initState() {
    email = widget.email;
    username = widget.name;

    _authManager = AuthManager(context, ref);
    super.initState();
    if (locationService.locationData == null) {
      locationService.requestLocation();
    }
  }

  @override
  Widget build(BuildContext context) {
    return LoadingWidget(
      isLoading: _authManager.isLoading,
      child: _getAdditionalDetails(context),
    );
  }

  SingleChildScrollView _getAdditionalDetails(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 15.0),
      child: Column(
        children: [
          const SizedBox(height: kToolbarHeight),
          Image.asset(
            "assets/logo_app.png",
            height: 100,
            width: 100,
          ),
          SizedBox(height: 0.015 * getHeight(context)),
          const Center(
            child: Text(
              "Fresh Nest",
              style: TextStyle(
                fontSize: 25,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          const Center(
            child: Text(
              "Just a few more details to continue",
              style: TextStyle(
                fontSize: 12,
              ),
            ),
          ),
          SizedBox(height: 0.025 * getHeight(context)),
          CustomTextField(
            value: username,
            onChanged: (v) => username = v,
            label: "Username",
          ),
          const SizedBox(height: 10),
          CustomTextField(
            value: email,
            isEditable: false,
            keyboardType: TextInputType.emailAddress,
            onChanged: (v) => email = v,
            label: "Email",
          ),
          const SizedBox(height: 10),
          CustomTextField(
            value: password,
            keyboardType: TextInputType.visiblePassword,
            isPassword: true,
            onChanged: (v) => password = v,
            label: "Password",
          ),
          const SizedBox(height: 10),
          CustomTextField(
            value: phone,
            keyboardType: TextInputType.phone,
            onChanged: (v) => phone = v,
            label: "Phone",
          ),
          _getUserTypeDropDown(context),
          SizedBox(height: 0.025 * getHeight(context)),
          ActionButton(
            isFilled: false,
            onPressed: () async {
              if (locationService.locationData == null &&
                  locationService.locationData!.latitude == null &&
                  locationService.locationData!.longitude == null) {
                showToast("Location not found!");
                locationService.requestLocation();
                return;
              }
              final location = LatLng(
                locationService.locationData!.latitude!,
                locationService.locationData!.longitude!,
              );

              final res = await _authManager.signUpUsingEmailPassword(
                email: email.trim(),
                name: username.trim(),
                password: password.trim(),
                phone: phone.trim(),
                userType: dropdownValue,
                location: location,
              );
              if (res == 1 && mounted) {
                goToPage(context, const RolePage(), clearStack: true);
              }
            },
            text: "Get Started!",
          ),
          SizedBox(height: 0.015 * getHeight(context)),
        ],
      ),
    );
  }

  _getUserTypeDropDown(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: DropdownButtonFormField(
        value: dropdownValue,
        items: const [
          DropdownMenuItem(value: "customer", child: Text("Customer")),
          DropdownMenuItem(value: "farmer", child: Text("Farmer")),
        ],
        onChanged: (v) {
          dropdownValue = v ?? dropdownValue;
          setState(() {});
        },
      ),
    );
  }
}
