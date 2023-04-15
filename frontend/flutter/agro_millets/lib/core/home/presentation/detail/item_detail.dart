import 'package:agro_millets/core/home/application/comment_manager.dart';
import 'package:agro_millets/core/home/application/comment_provider.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/models/millet_item.dart';
import 'package:agro_millets/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:timeago/timeago.dart' as timeago;

class ItemDetailPage extends ConsumerStatefulWidget {
  final MilletItem item;
  const ItemDetailPage({Key? key, required this.item}) : super(key: key);

  @override
  ConsumerState<ItemDetailPage> createState() => _ItemDetailPageState();
}

class _ItemDetailPageState extends ConsumerState<ItemDetailPage> {
  late CommentManager _commentManager;
  late MilletItem item;
  final TextEditingController _commentController = TextEditingController();

  int amount = 1;

  @override
  void initState() {
    item = widget.item;
    _commentManager = CommentManager(context, ref, item.id);
    super.initState();
  }

  @override
  void dispose() {
    _commentManager.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios,
          ),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          // TODO: Check if is owner or admin
          IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.delete,
              color: Colors.red,
            ),
          ),
        ],
        elevation: 0,
        centerTitle: true,
        title: const Text("Details"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 0.015 * getHeight(context)),
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30.0),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(30.0),
                child: Image.network(
                  item.images[0],
                  height: 0.3 * getHeight(context),
                  fit: BoxFit.cover,
                  width: double.infinity,
                ),
              ),
            ),
            SizedBox(height: 0.025 * getHeight(context)),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: 0.6 * getWidth(context),
                  child: Text(
                    item.name,
                    style: const TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.w600,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const Spacer(),
                Text(
                  "₹ ${item.price}",
                  style: const TextStyle(
                      fontSize: 25,
                      // color: accentColor,
                      fontWeight: FontWeight.w600),
                ),
              ],
            ),
            SizedBox(height: 0.01 * getHeight(context)),
            Text(
              item.description,
              style: const TextStyle(
                color: Colors.grey,
              ),
            ),

            SizedBox(height: 0.025 * getHeight(context)),
            const Divider(),
            const Text(
              "Comments",
              style: TextStyle(
                fontSize: 20,
              ),
            ),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: ref.watch(commentProvider).getComments().length,
              itemBuilder: (context, index) {
                var list = ref.watch(commentProvider).getComments();
                return ListTile(
                  leading: CircleAvatar(
                    child: Text(list[index].name[0]),
                  ),
                  title: Row(
                    children: [
                      Text(
                        list[index].name,
                        style: const TextStyle(
                          fontSize: 13,
                        ),
                      ),
                      const Spacer(),
                      Text(
                        timeago.format(list[index].commentAt,locale: 'en_short'),
                        style: const TextStyle(
                          fontSize: 13,
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                  subtitle: Text(list[index].content),
                );
              },
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: CustomTextField(
                    hint: "Type comment here...",
                    controller: _commentController,
                    onChanged: (v) {},
                    onSubmitted: (v) => postComment(),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.message_rounded),
                  onPressed: () => postComment(),
                ),
              ],
            ),
            SizedBox(height: 0.1 * getHeight(context)),
            // _getQuantityIncrementer(context)
          ],
        ),
      ),
    );
  }

  void postComment() {
    _commentManager.addComment(_commentController.text);
    _commentController.text = "";
  }

  Container _getQuantityIncrementer(BuildContext context) {
    return Container(
      height: 0.1 * getHeight(context),
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      // color: Colors.red,
      child: Row(
        children: [
          Container(
            width: 0.3 * getWidth(context),
            height: 0.06 * getHeight(context),
            margin: const EdgeInsets.symmetric(vertical: 5.0),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey.withOpacity(0.3)),
              borderRadius: BorderRadius.circular(30.0),
            ),

            // color: Colors.green,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                GestureDetector(
                  onTap: () {
                    if (amount == 0) {
                      showToast("Can not reduce below 0");
                      return;
                    }
                    amount--;
                    setState(() {});
                  },
                  child: Container(
                      decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.grey.withOpacity(0.4)),
                      padding: const EdgeInsets.all(5.0),
                      child: const Icon(Icons.remove)),
                ),
                Text(
                  "$amount",
                  style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 17,
                  ),
                ),
                GestureDetector(
                  onTap: () {
                    if (amount == 50) {
                      showToast("You can only order 50 items at a time");
                      return;
                    }
                    amount++;
                    setState(() {});
                  },
                  child: Container(
                      decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.grey.withOpacity(0.4)),
                      padding: const EdgeInsets.all(5.0),
                      child: const Icon(Icons.add)),
                ),
              ],
            ),
          ),
          SizedBox(width: 0.1 * getWidth(context)),
          // Expanded(
          //   child: Consumer(builder: (context, ref, child) {
          //     return ActionButton(
          //       text: "Add to Cart",
          //       onPressed: () async {
          //         await cloudDatabase.addItemToCart(CartItem(
          //           item: item,
          //           amount: amount,
          //         ));
          //       },
          //     );
          //   }),
          // ),
        ],
      ),
    );
  }
}
