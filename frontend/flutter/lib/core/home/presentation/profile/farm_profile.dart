import "package:flutter/material.dart";
import "package:fresh_nest/core/home/application/home_manager.dart";
import "package:fresh_nest/core/home/presentation/detail/item_fullview.dart";
import "package:fresh_nest/core/home/presentation/widgets/agro_grid_view.dart";
import "package:fresh_nest/core/home/presentation/widgets/loading_widget.dart";
import "package:fresh_nest/globals.dart";
import "package:fresh_nest/models/millet_item.dart";
import "package:fresh_nest/models/user.dart";
import "package:fresh_nest/widgets/action_button.dart";
import "package:shimmer/shimmer.dart";

class FarmProfilePage extends StatefulWidget {
  final User user;

  const FarmProfilePage({
    super.key,
    required this.user,
  });

  @override
  State<FarmProfilePage> createState() => _FarmProfilePageState();
}

class _FarmProfilePageState extends State<FarmProfilePage> {
  bool viewProducts = false;
  ValueNotifier<bool> isLoading = ValueNotifier(true);
  List<MilletItem> products = [];

  @override
  void initState() {
    super.initState();

    getAllFarmerItems(widget.user.id).then((value) {
      isLoading.value = false;
      products = value;
      if (mounted) setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.user.name),
      ),
      body: LoadingWidget(
        isLoading: isLoading,
        child: Stack(
          children: [
            Positioned.fill(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(
                    horizontal: 15.0, vertical: 10.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Wrap(
                      spacing: 10,
                      children: [
                        Chip(
                          avatar: const Icon(Icons.alternate_email),
                          label: Text(widget.user.email),
                        ),
                        Chip(
                          avatar: const Icon(Icons.phone),
                          label: Text(widget.user.phone),
                        ),
                        GestureDetector(
                          onTap: () {
                            //TODO: Take to google maps
                          },
                          child: Chip(
                            avatar: Image.asset("assets/map_icon.png"),
                            label: const Text("View on Map"),
                          ),
                        ),
                        const Divider(
                          height: 30,
                        ),
                        viewProducts
                            ? FarmProductsWidget(products: products)
                            : FarmImagesWidget(user: widget.user),
                      ],
                    ),
                    SizedBox(height: 0.025 * getHeight(context)),
                  ],
                ),
              ),
            ),
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: Container(
                decoration: BoxDecoration(color: Colors.white, boxShadow: [
                  BoxShadow(
                    blurRadius: 5.0,
                    color: Colors.black.withOpacity(0.05),
                    offset: const Offset(0.0, -2.0),
                  )
                ]),
                padding: const EdgeInsets.symmetric(
                    horizontal: 15.0, vertical: 10.0),
                child: ActionButton(
                  text: viewProducts ? 'View Farm Images' : 'View Products',
                  onPressed: () {
                    viewProducts = !viewProducts;
                    setState(() {});
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class FarmProductsWidget extends StatelessWidget {
  final List<MilletItem> products;
  const FarmProductsWidget({
    super.key,
    required this.products,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Farm Products: ",
          style: Theme.of(context).textTheme.headlineSmall!.copyWith(),
        ),
        const SizedBox(height: 20),
        if(products.isEmpty)
        SizedBox(
          height: 0.3 * getHeight(context),
          child: const Center(
            child: Text("No products available"),
          ),
        ),
        AgroGridView(list: products),
      ],
    );
  }
}

class FarmImagesWidget extends StatelessWidget {
  final User user;
  const FarmImagesWidget({
    super.key,
    required this.user,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Farm Images: ",
          style: Theme.of(context).textTheme.headlineSmall!.copyWith(),
        ),
        const SizedBox(height: 20),
        if (user.images.isEmpty)
          SizedBox(
            height: 0.3 * getHeight(context),
            child: const Center(
              child: Text("No images available"),
            ),
          ),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            mainAxisSpacing: 10,
            crossAxisSpacing: 10,
          ),
          itemCount: user.images.length,
          itemBuilder: (context, index) {
            return GestureDetector(
              onTap: () {
                goToPage(context, ItemFullView(src: user.images[index]));
              },
              child: ClipRRect(
                borderRadius: BorderRadius.circular(15.0),
                child: Image.network(
                  user.images[index],
                  fit: BoxFit.cover,
                  loadingBuilder: (context, child, loadingProgress) {
                    if (loadingProgress == null) return child;
                    return Shimmer(
                      gradient: shimmerGradient,
                      child: Container(
                        decoration: const BoxDecoration(
                          color: Colors.white,
                        ),
                        width: double.infinity,
                        height: double.infinity,
                      ),
                    );
                  },
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}
