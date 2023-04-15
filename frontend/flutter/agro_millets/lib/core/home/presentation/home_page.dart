import 'package:agro_millets/core/home/application/home_manager.dart';
import 'package:agro_millets/core/home/application/home_provider.dart';
import 'package:agro_millets/core/home/presentation/add_item/add_item.dart';
import 'package:agro_millets/core/home/presentation/widgets/drawer.dart';
import 'package:agro_millets/core/home/presentation/widgets/grid_item.dart';
import 'package:agro_millets/data/auth_state_repository.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/models/millet_item.dart';
import 'package:agro_millets/widgets/text/large_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

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
      floatingActionButton: Consumer(
        builder: (_, ref, __) {
          var val = ref.read(authProvider);
          if (val.isAdmin() || val.isFarmer()) {
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
      ),
      appBar: AppBar(
        title: const Text("Agro Millets"),
        centerTitle: true,
      ),
      body: ListView(
        children: [
          _getHeading(),
          _getGridView(ref.watch(homeProvider).getItems()),
        ],
      ),
    );
  }

  _getHeading() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 10.0),
      child: Consumer(
        builder: (context, ref, _) {
          var val = ref.read(authProvider);
          if (val.isFarmer()) {
            return const LargeText("Your Products");
          } else if (val.isAdmin()) {
            return const LargeText("All Products");
          }
          return const LargeText("Explore Products");
        },
      ),
    );
  }

  _getGridView(List<MilletItem> list) {
    return MasonryGridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      padding: const EdgeInsets.only(
        left: 15,
        right: 15,
        bottom: 30.0,
      ),
      crossAxisCount: 2,
      mainAxisSpacing: 10,
      crossAxisSpacing: 10,
      itemCount: list.length,
      itemBuilder: (context, index) {
        return AgroItem(
          index: index,
          item: list[index],
        );
      },
    );
  }
}
