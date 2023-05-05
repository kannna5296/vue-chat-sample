import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
} from "firebase/firestore";

export type Chat = {
  message: string;
  userId: string;
};

export const chatsConverter: FirestoreDataConverter<Chat> = {
  toFirestore(chat: Chat): DocumentData {
    return {
      message: chat.message,
      userId: chat.userId,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Chat {
    const data = snapshot.data(options);
    return {
      message: data.message,
      userId: data.user_id,
    };
  },
};
