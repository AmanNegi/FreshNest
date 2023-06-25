import 'package:fresh_nest/core/admin/application/admin_apis.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/models/user.dart';
import 'package:flutter/material.dart';

class UsersPage extends StatefulWidget {
  const UsersPage({super.key});

  @override
  State<UsersPage> createState() => _UsersPageState();
}

class _UsersPageState extends State<UsersPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("All Users")),
      body: FutureBuilder(
          future: AdminAPIs.getAllUsers(),
          builder: (context, snapshot) {
            if (snapshot.hasData && snapshot.data != null) {
              List<User> list = snapshot.data ?? [];
              return ListView.builder(
                itemCount: list.length,
                itemBuilder: (context, index) {
                  return Dismissible(
                    confirmDismiss: (direction) async {
                      showToast("Feature Coming Soon!");
                      return false;
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
                      leading: CircleAvatar(
                        child: Text(list[index].userType[0].toUpperCase()),
                      ),
                      title: Text(list[index].name),
                      subtitle: Text(list[index].email),
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
