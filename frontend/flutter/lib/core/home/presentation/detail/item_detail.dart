import 'package:fresh_nest/colors.dart';
import 'package:fresh_nest/core/cart/application/cart_manager.dart';
import 'package:fresh_nest/core/cart/application/cart_provider.dart';
import 'package:fresh_nest/core/home/application/comment_manager.dart';
import 'package:fresh_nest/core/home/application/comment_provider.dart';
import 'package:fresh_nest/core/home/application/home_manager.dart';
import 'package:fresh_nest/data/cache/app_cache.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/models/cart_item.dart';
import 'package:fresh_nest/models/comment.dart';
import 'package:fresh_nest/models/millet_item.dart';
import 'package:fresh_nest/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
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
          if (appCache.isCustomer())
            IconButton(
              onPressed: () {
                CartItem cartItem = CartItem(item: item.id, count: 1);
                ref.read(cartProvider).addItemToCart(cartItem);
                CartManager(context, ref, poll: false)
                    .addItemToCart(item: cartItem);
              },
              icon: const Icon(MdiIcons.cartPlus),
            ),
          if (appCache.isAdmin() || appCache.isOwnerOf(item.listedBy))
            IconButton(
              onPressed: () {
                Navigator.pop(context);
                deleteItem(item.id);
              },
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
                borderRadius: BorderRadius.circular(10.0),
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
                      fontSize: 22,
                      fontWeight: FontWeight.w400,
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
                      color: lightColor,
                      fontWeight: FontWeight.w600),
                ),
              ],
            ),
            SizedBox(height: 0.01 * getHeight(context)),
            Text(
              item.description,
              style: const TextStyle(
                fontSize: 15,
                color: Colors.grey,
              ),
            ),

            SizedBox(height: 0.025 * getHeight(context)),
            const Divider(height: 10),
            SizedBox(height: 0.025 * getHeight(context)),
            const Text(
              "Comments",
              style: TextStyle(
                fontSize: 20,
              ),
            ),
            SizedBox(height: 0.015 * getHeight(context)),
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
                  icon: const Icon(
                    MdiIcons.sendCircle,
                    size: 35,
                  ),
                  onPressed: () => postComment(),
                ),
              ],
            ),

            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: ref.watch(commentProvider).getComments().length,
              itemBuilder: (context, index) {
                var list = ref.watch(commentProvider).getComments();
                if (appCache.isAdmin()) {
                  return Dismissible(
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
                    child: _getCommentItem(list, index),
                  );
                } else {
                  return _getCommentItem(list, index);
                }
              },
            ),
            const SizedBox(height: 20),

            // _getQuantityIncrementer(context)
          ],
        ),
      ),
    );
  }

  ListTile _getCommentItem(List<CommentItem> list, int index) {
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
            timeago.format(list[index].commentAt, locale: 'en_short'),
            style: const TextStyle(
              fontSize: 13,
              color: Colors.grey,
            ),
          ),
        ],
      ),
      subtitle: Text(list[index].content),
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
