import 'dart:async';

import 'package:fresh_nest/core/admin/application/admin_apis.dart';
import 'package:fresh_nest/core/admin/application/admin_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AdminManager {
  final BuildContext context;
  Timer? timer;
  final WidgetRef ref;

  AdminManager(this.context, this.ref) {
    attach();
  }

  dispose() {
    debugPrint("[admin_manager] Detaching Listeners...");
    if (timer != null) {
      timer!.cancel();
    }
  }

  // Using Polling instead of WebSockets
  attach() async {
    debugPrint("[admin_manager] Attaching Listeners...");
    var data = await AdminAPIs.getRecentItems();
    ref.read(adminProvider).updateItems(data);

    timer = Timer.periodic(
      const Duration(seconds: 10),
      (timer) async {
        if (context.mounted) {
          var data = await AdminAPIs.getRecentItems();
          ref.read(adminProvider).updateItems(data);
        }
      },
    );
  }
}
