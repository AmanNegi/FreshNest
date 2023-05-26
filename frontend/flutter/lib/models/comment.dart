// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class CommentItem {
  final String commentBy;
  final String name;
  final String content;
  final DateTime commentAt;
  final String id;
  CommentItem({
    required this.commentBy,
    required this.name,
    required this.content,
    required this.commentAt,
    required this.id,
  });

  CommentItem copyWith({
    String? commentBy,
    String? name,
    String? content,
    DateTime? commentAt,
    String? id,
  }) {
    return CommentItem(
      commentBy: commentBy ?? this.commentBy,
      name: name ?? this.name,
      content: content ?? this.content,
      commentAt: commentAt ?? this.commentAt,
      id: id ?? this.id,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'commentBy': commentBy,
      'name': name,
      'content': content,
      'commentAt': commentAt.toIso8601String(),
      '_id': id,
    };
  }

  factory CommentItem.fromMap(Map<String, dynamic> map) {
    return CommentItem(
      commentBy: map['commentBy'] as String,
      name: map['name'] as String,
      content: map['content'] as String,
      commentAt: DateTime.parse(map['commentAt']),
      id: map['_id'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory CommentItem.fromJson(String source) =>
      CommentItem.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'CommentItem(commentBy: $commentBy, name: $name, content: $content, commentAt: $commentAt, id: $id)';
  }

  @override
  bool operator ==(covariant CommentItem other) {
    if (identical(this, other)) return true;

    return other.commentBy == commentBy &&
        other.name == name &&
        other.content == content &&
        other.commentAt == commentAt &&
        other.id == id;
  }

  @override
  int get hashCode {
    return commentBy.hashCode ^
        name.hashCode ^
        content.hashCode ^
        commentAt.hashCode ^
        id.hashCode;
  }
}


//   factory Comment.fromJson(Map<String, dynamic> json) => Comment(
//         commentBy: json["commentBy"],
//         name: json["name"],
//         content: json["content"],
//         commentAt: DateTime.parse(json["commentAt"]),
//         id: json["_id"],
//       );

//   Map<String, dynamic> toJson() => {
//         "commentBy": commentBy,
//         "name": name,
//         "content": content,
//         "commentAt": commentAt.toIso8601String(),
//         "_id": id,
//       };
// }
