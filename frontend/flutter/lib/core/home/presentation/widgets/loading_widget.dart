import 'package:flutter/material.dart';

class LoadingWidget extends StatelessWidget {
  final Widget child;
  final ValueNotifier<bool> isLoading;
  const LoadingWidget({
    super.key,
    required this.child,
    required this.isLoading,
  });

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: isLoading,
      child: child,
      builder: (context, value, child) {
        return Scaffold(
          resizeToAvoidBottomInset: true,
          body: AbsorbPointer(
            absorbing: isLoading.value,
            child: Stack(
              children: [
                if (isLoading.value)
                  const Positioned.fill(
                    child: Center(
                      child: CircularProgressIndicator(),
                    ),
                  ),
                Positioned.fill(
                  child: Opacity(
                    opacity: isLoading.value ? 0.2 : 1.0,
                    child: child!,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
