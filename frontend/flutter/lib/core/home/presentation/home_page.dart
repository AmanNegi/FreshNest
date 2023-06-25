import 'package:fresh_nest/core/home/application/home_manager.dart';
import 'package:fresh_nest/core/home/application/home_provider.dart';
import 'package:fresh_nest/core/home/presentation/add_item/add_item.dart';
import 'package:fresh_nest/core/home/presentation/widgets/agro_grid_view.dart';
import 'package:fresh_nest/core/home/presentation/widgets/drawer.dart';
import 'package:fresh_nest/core/search/presentation/search_page.dart';
import 'package:fresh_nest/data/cache/app_cache.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/widgets/text/large_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
class HomePage extends ConsumerStatefulWidget {
  const HomePage({super.key});

  @override
  ConsumerState<HomePage> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> {
  late HomeManager _homeManager;

  @override
  void initState() {
    _homeManager = HomeManager(context, ref);
    super.initState();
  }

  @override
  void dispose() {
    _homeManager.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const AgroDrawer(),
      floatingActionButton: _getFloatingActionButton(),
      appBar: AppBar(
        title: const Text("Fresh Nest"),
        centerTitle: true,
        actions: [
          if (!appCache.isAdmin())
            IconButton(
              icon: const Icon(Icons.search),
              onPressed: () {
                goToPage(context, const SearchPage());
              },
            )
        ],
      ),
      body: ListView(
        children: [
          _getHeading(),
          AgroGridView(
            list: ref.watch(homeProvider).getItems(),
          ),
        ],
      ),
    );
  }

  Builder _getFloatingActionButton() {
    return Builder(
      builder: (context) {
        if (appCache.isLoggedIn() &&
            (appCache.isAdmin() || appCache.isFarmer())) {
          return FloatingActionButton(
            onPressed: () async {
              _homeManager.dispose();
              await goToPage(context, AddItemPage(homeManager: _homeManager));
              _homeManager.attach();
            },
            child: const Icon(Icons.add),
          );
        }
        return Container();
      },
    );
  }

  _getHeading() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 10.0),
      child: Builder(
        builder: (context ) {
          if (appCache.isFarmer()) {
            return const LargeText("Your Products");
          } else if (appCache.isAdmin()) {
            return const LargeText("All Products");
          }
          return const LargeText("Explore Products");
        },
      ),
    );
  }
}
