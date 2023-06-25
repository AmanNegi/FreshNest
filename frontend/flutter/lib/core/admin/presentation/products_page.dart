import 'package:fresh_nest/colors.dart';
import 'package:fresh_nest/core/admin/application/admin_apis.dart';
import 'package:fresh_nest/core/home/application/home_manager.dart';
import 'package:fresh_nest/core/home/presentation/detail/item_detail.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/models/millet_item.dart';
import 'package:flutter/material.dart';
import 'package:timeago/timeago.dart' as timeago;

class ProductsPage extends StatefulWidget {
  const ProductsPage({super.key});

  @override
  State<ProductsPage> createState() => _ProductsPageState();
}

class _ProductsPageState extends State<ProductsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("All Products")),
      body: FutureBuilder(
          future: AdminAPIs.getAllItems(),
          builder: (context, snapshot) {
            if (snapshot.hasData && snapshot.data != null) {
              List<MilletItem> list = snapshot.data ?? [];
              return ListView.separated(
                separatorBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 15.0),
                    child: Divider(
                      color: Colors.grey.withOpacity(0.2),
                    ),
                  );
                },
                itemCount: list.length,
                itemBuilder: (context, index) {
                  return Dismissible(
                    onDismissed: (direction) {
                      if (direction == DismissDirection.endToStart) {
                        deleteItem(list[index].id);
                        list.removeWhere((element) => element.id == list[index].id);
                      }
                    },
                    key: ValueKey(list[index].id),
                    background: Container(
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.centerLeft,
                          end: Alignment.centerRight,
                          colors: [
                            Colors.white,
                            Colors.red,
                          ],
                        ),
                      ),
                      child: Row(
                        children: const [
                          Spacer(),
                          Icon(
                            Icons.delete,
                            color: Colors.white,
                          ),
                          SizedBox(width: 20),
                        ],
                      ),
                    ),
                    child: ListTile(
                      onTap: () {
                        goToPage(context, ItemDetailPage(item: list[index]));
                      },
                      leading: CircleAvatar(
                        radius: 30,
                        backgroundImage: NetworkImage(
                          list[index].images[0],
                        ),
                      ),
                      title: Text(
                        list[index].name,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      subtitle: Text(timeago.format(list[index].listedAt)),
                      trailing: Text(
                        "₹ ${list[index].price}",
                        style: const TextStyle(
                          color: semiDarkColor,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  );
                },
              );
            }

            return const Center(
              child: CircularProgressIndicator(),
            );
          }),
    );
  }
}
