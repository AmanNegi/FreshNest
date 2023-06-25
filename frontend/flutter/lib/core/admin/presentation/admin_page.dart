import 'package:fresh_nest/core/admin/application/admin_manager.dart';
import 'package:fresh_nest/core/admin/application/admin_provider.dart';
import 'package:fresh_nest/core/admin/presentation/products_page.dart';
import 'package:fresh_nest/core/admin/presentation/users_page.dart';
import 'package:fresh_nest/core/home/presentation/widgets/agro_item.dart';
import 'package:fresh_nest/core/home/presentation/widgets/drawer.dart';
import 'package:fresh_nest/globals.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';

class AdminPage extends ConsumerStatefulWidget {
  const AdminPage({super.key});

  @override
  ConsumerState<AdminPage> createState() => _AdminPageState();
}

class _AdminPageState extends ConsumerState<AdminPage> {
  late AdminManager _adminManager;

  @override
  void initState() {
    _adminManager = AdminManager(context, ref);
    super.initState();
  }

  @override
  void dispose() {
    _adminManager.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const AgroDrawer(),
      appBar: AppBar(
        title: const Text("Admin Page"),
        centerTitle: true,
      ),
      body: ListView(
        children: [
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Colors.lightGreen,
                  Colors.green,
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: Column(
              children: [
                _getTopHeader(context),
                Container(
                  margin: const EdgeInsets.symmetric(horizontal: 15.0),
                  child: const Divider(
                    color: Colors.white24,
                    height: 5,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 15.0, vertical: 15.0),
                  child: Row(
                    children: const [
                      Text(
                        "Recently addded ",
                        style: TextStyle(
                          fontSize: 23,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                      ),
                      Spacer(),
                      Icon(
                        Icons.arrow_forward,
                        color: Colors.white,
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
          Consumer(builder: (context, ref, child) {
            var recentItems = ref.watch(adminProvider).getItems();
            return MasonryGridView.count(
              crossAxisCount: 2,
              padding: const EdgeInsets.symmetric(
                horizontal: 15.0,
                vertical: 15.0,
              ),
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: recentItems.length,
              itemBuilder: (context, index) {
                return AgroItem(
                  index: index,
                  item: recentItems[index],
                );
              },
            );
          }),
        ],
      ),
    );
  }

  Container _getTopHeader(BuildContext context) {
    return Container(
      height: 0.15 * getHeight(context),
      width: double.infinity,
      padding: const EdgeInsets.symmetric(
        horizontal: 15.0,
        vertical: 10.0,
      ),
      child: Row(
        children: [
          _getTopOptions(
            "Users",
            MdiIcons.accountTie,
            goTo: const UsersPage(),
          ),
          const SizedBox(width: 15),
          _getTopOptions(
            "Products",
            MdiIcons.fruitPineapple,
            goTo: const ProductsPage(),
          ),
        ],
      ),
    );
  }

  Expanded _getTopOptions(String name, IconData icon, {Widget? goTo}) {
    return Expanded(
      flex: 1,
      child: GestureDetector(
        onTap: () {
          if (goTo != null) {
            goToPage(context, goTo);
          }
        },
        child: Container(
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10.0),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.075),
                  spreadRadius: 1.0,
                  blurRadius: 5.0,
                  offset: Offset.zero,
                )
              ]),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                color: Colors.lightGreen,
                size: 30,
              ),
              const SizedBox(height: 5),
              Text(
                name,
                style: const TextStyle(
                  fontSize: 16,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
