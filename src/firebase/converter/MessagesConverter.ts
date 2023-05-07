import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  Timestamp,
} from "firebase/firestore";

export type Message = {
  message: string;
  name: string;
  photoUrl: string;
  createdAt: Timestamp;
};

export const messagesConverter: FirestoreDataConverter<Message> = {
  toFirestore(message: Message): DocumentData {
    return {
      message: message.message,
      name: message.name,
      photoUrl: message.photoUrl,
      createdAt: message.createdAt,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);
    return {
      message: data.message,
      name: data.name,
      photoUrl: data.photoUrl,
      createdAt: data.createdAt,
    };
  },
};
