import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  Timestamp,
} from "firebase/firestore";

export type Room = {
  id: string;
  name: string;
  thumnailUrl: string;
  createdAt: Timestamp;
};

export const roomsConverter: FirestoreDataConverter<Room> = {
  toFirestore(room: Room): DocumentData {
    return {
      id: room.id,
      name: room.name,
      thumnailUrl: room.thumnailUrl,
      createdAt: room.createdAt,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Room {
    const data = snapshot.data(options);
    return {
      id: data.id,
      name: data.name,
      thumnailUrl: data.thumnailUrl,
      createdAt: data.createdAt,
    };
  },
};
