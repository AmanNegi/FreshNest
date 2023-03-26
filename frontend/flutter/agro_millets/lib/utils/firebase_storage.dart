import 'dart:io';

import 'package:firebase_storage/firebase_storage.dart';

class StorageManager {
  FirebaseStorage storage = FirebaseStorage.instance;

  Future<String> uploadItemImage(String itemId, File file) async {
    Reference ref = storage.ref().child("images/items/$itemId");
    UploadTask uploadTask = ref.putFile(file);
    TaskSnapshot taskSnapshot = await uploadTask;
    return taskSnapshot.ref.getDownloadURL();
  }
}

StorageManager storageManager = StorageManager();