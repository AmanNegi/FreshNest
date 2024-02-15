import "package:flutter/material.dart";
import "package:fresh_nest/core/home/presentation/detail/item_fullview.dart";
import "package:fresh_nest/globals.dart";
import "package:fresh_nest/models/user.dart";
import "package:fresh_nest/widgets/action_button.dart";

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
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.user.name),
      ),
      body: Stack(
        children: [
          Positioned.fill(
            child: SingleChildScrollView(
              padding:
                  const EdgeInsets.symmetric(horizontal: 15.0, vertical: 10.0),
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
                      )
                    ],
                  ),
                  SizedBox(
                    height: 0.025 * getHeight(context),
                  ),
                  Text(
                    "Farm Images: ",
                    style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                          decoration: TextDecoration.underline,
                        ),
                  ),
                  const SizedBox(height: 20),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      mainAxisSpacing: 10,
                      crossAxisSpacing: 10,
                    ),
                    itemCount: widget.user.images.length,
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () {
                          goToPage(context,
                              ItemFullView(src: widget.user.images[index]));
                        },
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(15.0),
                          child: Image.network(
                            widget.user.images[index],
                            fit: BoxFit.cover,
                          ),
                        ),
                      );
                    },
                  ),
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
              padding:
                  const EdgeInsets.symmetric(horizontal: 15.0, vertical: 10.0),
              child: ActionButton(
                text: 'View Products',
                onPressed: () {},
              ),
            ),
          ),
        ],
      ),
    );
  }
}
