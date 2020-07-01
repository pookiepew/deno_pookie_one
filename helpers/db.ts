import { MongoClient, Collection } from "https://deno.land/x/mongo@v0.8.0/mod.ts"

let userCollection: Collection | null = null;

export function connect() {
  const client = new MongoClient();

  client.connectWithUri(
    'mongodb://devdb:devdb@192.168.86.126:27000'
  );

  const db = client.database('dev');
  userCollection = db.collection('users');
}

export function getUserCollection() {
  return userCollection;
}