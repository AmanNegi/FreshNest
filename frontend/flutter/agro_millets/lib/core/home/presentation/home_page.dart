import 'package:agro_millets/core/home/application/home.dart';
import 'package:agro_millets/core/home/presentation/add_item/add_item.dart';
import 'package:agro_millets/core/home/presentation/widgets/grid_item.dart';
import 'package:agro_millets/data/auth_state_repository.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/models/millet_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late HomeManager _homeManager;
  late Future getItemsFuture;

  @override
  void initState() {
    _homeManager = HomeManager(context);
    super.initState();
    getItemsFuture = _homeManager.getAllItems();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: Consumer(
        builder: (_, ref, __) {
          var val = ref.read(authProvider);
          if (val.isAdmin() || val.isFarmer()) {
            return FloatingActionButton(
              onPressed: () {
                goToPage(context, AddItemPage(homeManager: _homeManager))
                    .then((value) {
                  getItemsFuture = _homeManager.getAllItems();
                  setState(() {});
                });
              },
              child: const Icon(Icons.add),
            );
          }
          return Container();
        },
      ),
      appBar: AppBar(title: const Text("HomePage")),
      body: FutureBuilder(
        future: getItemsFuture,
        builder: (context, snapshot) {
          if (snapshot.hasData && snapshot.data != null) {
            print("Getting Data: ${snapshot.data}");
            List<MilletItem> data = snapshot.data!;
            return ListView(
              children: [
                _getGridView(data),
              ],
            );
          }
          return const Center(
            child: CircularProgressIndicator(),
          );
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
        top: 30.0,
      ),
      crossAxisCount: 2,
      mainAxisSpacing: 10,
      crossAxisSpacing: 10,
      itemCount: list.length,
      itemBuilder: (context, index) {
        return GridItem(
          index: index,
          item: list[index],
        );
      },
    );
  }
}
