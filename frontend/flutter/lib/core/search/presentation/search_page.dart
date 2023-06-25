import 'package:fresh_nest/colors.dart';
import 'package:fresh_nest/core/home/presentation/widgets/agro_grid_view.dart';
import 'package:fresh_nest/core/search/application/search_manager.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/models/millet_item.dart';
import 'package:fresh_nest/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  String query = "";
  SearchManager manager = SearchManager();
  List<MilletItem> results = [];
  ValueNotifier<bool> loading = ValueNotifier(false);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text("Search"),
      ),
      body: Column(
        children: [
          _getSearchField(),
          SizedBox(height: 0.025 * getHeight(context)),
          ValueListenableBuilder(
              valueListenable: loading,
              child: AgroGridView(list: results),
              builder: (context, value, child) {
                if (value) {
                  return const Expanded(
                    child: Center(
                      child: CircularProgressIndicator(),
                    ),
                  );
                }
                if (query.isEmpty || query.length < 3) {
                  return const Expanded(
                    child: Center(
                        child: Text("Query should be atleast 3 letters long")),
                  );
                }

                if (results.isEmpty) {
                  return const Expanded(
                    child: Center(child: Text("No Items Found")),
                  );
                }

                return Expanded(
                  child: AgroGridView(list: results),
                );
              }),
        ],
      ),
    );
  }

  performSearch() async {
    print("Searching $query...");
    loading.value = true;
    results = await manager.search(query);
    loading.value = false;
    setState(() {});
  }

  Container _getSearchField() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 15.0),
      child: Row(
        children: [
          Expanded(
            child: CustomTextField(
              hint: "Enter your query here",
              onSubmitted: (v) {
                performSearch();
              },
              onChanged: (v) {
                query = v;
              },
            ),
          ),
          const SizedBox(width: 10),
          Container(
            decoration: BoxDecoration(
                color: lightColor, borderRadius: BorderRadius.circular(10.0)),
            child: IconButton(
              onPressed: () async {
               await performSearch();
              },
              icon: const Icon(
                Icons.search,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
