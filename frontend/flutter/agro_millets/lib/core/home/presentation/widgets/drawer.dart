import 'package:flutter/material.dart';

class Drawer extends StatelessWidget {
  const Drawer({Key? key, required ListView child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(   
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text('Drawer Header'),
            ),
            ListTile(
              title: const Text('Edit Profile'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (contex) => const Edit_Profile()),
                );
              },
            ),
            ListTile(
              title: const Text('Item 2'),
              onTap: () {},
            ),
          ],
        ),
      ),
    );
  }
}

class Edit_Profile extends StatelessWidget {
  const Edit_Profile({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('Edit your profile')),
      ),
    );
  }
}
