import 'package:fresh_nest/globals.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class ShimmerAgroItem extends StatelessWidget {
  /// Index is for sizing
  final int index;

  const ShimmerAgroItem({
    super.key,
    required this.index,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 0.5 * getWidth(context),
      height:
          index % 2 == 0 ? 0.2 * getHeight(context) : 0.3 * getHeight(context),
      child: Stack(
        children: [
          Positioned.fill(
            child: Container(
              padding: const EdgeInsets.all(8.0),
              margin: const EdgeInsets.all(2.0),
              decoration: BoxDecoration(
                color: Theme.of(context).cardColor,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 5.0,
                    spreadRadius: 3.0,
                    offset: const Offset(5.0, 5.0),
                  )
                ],
                borderRadius: BorderRadius.circular(10.0),
              ),
              child: LayoutBuilder(builder: (context, constraints) {
                return Column(
                  children: [
                    Expanded(
                      child: ClipRRect(
                        borderRadius: const BorderRadius.only(
                          topRight: Radius.circular(10.0),
                          bottomRight: Radius.circular(10.0),
                          topLeft: Radius.circular(10.0),
                        ),
                        child: Shimmer(
                          gradient: shimmerGradient,
                          child: Container(
                            color: Colors.green,
                            width: double.infinity,
                            height: double.infinity,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Shimmer(
                                gradient: shimmerGradient,
                                child: Container(
                                  color: Colors.green,
                                  width: 0.4 * constraints.maxWidth,
                                  height: 15,
                                ),
                              ),
                              const Spacer(),
                              Shimmer(
                                gradient: shimmerGradient,
                                child: Container(
                                  color: Colors.green,
                                  width: 0.2 * constraints.maxWidth,
                                  height: 15,
                                ),
                              ),
                            ],
                          )
                        ]),
                  ],
                );
              }),
            ),
          ),
          Positioned(
            right: 0,
            top: 0,
            child: GestureDetector(
              onTap: () async {},
              child: Shimmer(
                gradient: shimmerGradient,
                child: Container(
                  width: 40,
                  height: 40,
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
