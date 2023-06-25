import 'package:agro_millets/colors.dart';
import 'package:agro_millets/core/cart/presentation/cart_page.dart';
import 'package:agro_millets/core/home/presentation/profile/user_profile.dart';
import 'package:agro_millets/data/auth_state_repository.dart';
import 'package:agro_millets/data/cache/app_cache.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:package_info_plus/package_info_plus.dart';

class AgroDrawer extends StatefulWidget {
  const AgroDrawer({super.key});

  @override
  State<AgroDrawer> createState() => _AgroDrawerState();
}

class _AgroDrawerState extends State<AgroDrawer> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          UserAccountsDrawerHeader(
            decoration: const BoxDecoration(
              color: semiDarkColor,
            ),
            accountName: Text(appCache.getUserName()),
            accountEmail: Text(appCache.getEmail()),
          ),
          ListTile(
            title: const Text("Profile"),
            leading: const Icon(Icons.people),
            onTap: () {
              goToPage(context, const UserProfile());
            },
          ),
          if (!appCache.isAdmin() && !appCache.isFarmer())
            ListTile(
              title: const Text("Cart"),
              leading: const Icon(Icons.shopping_cart_outlined),
              onTap: () {
                goToPage(context, const CartPage());
              },
            ),
          Consumer(builder: (context, ref, child) {
            return ListTile(
              title: const Text("Logout"),
              leading: const Icon(Icons.logout),
              onTap: () {
                ref.read(authProvider).clearUserData();
                goToPage(context, const App(), clearStack: true);
              },
            );
          }),
          const Spacer(),
          Image.asset("assets/logo_app.png", height: 50),
          const SizedBox(height: 10),
          FutureBuilder(
              future: PackageInfo.fromPlatform(),
              builder: (context, snapshot) {
                if (snapshot.hasData && snapshot.data != null) {
                  return Text(
                    "FreshNest v${snapshot.data!.version}",
                    style: const TextStyle(color: Colors.grey, fontSize: 12),
                  );
                }
                return const Text(
                  "FreshNest",
                  style: TextStyle(color: Colors.grey, fontSize: 12),
                );
              }),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}
