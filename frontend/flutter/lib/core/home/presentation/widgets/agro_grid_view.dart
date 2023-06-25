import 'package:fresh_nest/core/home/presentation/widgets/agro_item.dart';
import 'package:fresh_nest/models/millet_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

class AgroGridView extends StatelessWidget {
  final List<MilletItem> list;
  const AgroGridView({super.key, required this.list});

  @override
  Widget build(BuildContext context) {
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
