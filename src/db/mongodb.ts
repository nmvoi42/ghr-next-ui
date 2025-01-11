
import { unstable_cache } from 'next/cache';

import { MongoClient, ServerApiVersion } from 'mongodb';
import type { WithId, Document } from 'mongodb';

export const getClient = () => {
  return new MongoClient(
    process.env.DB_CONNECT_URL ?? '',
    {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: false,
        },
        connectTimeoutMS: 9000,
        serverSelectionTimeoutMS: 9000,
        socketTimeoutMS: 9000,
    }
  );
};



export const prefetchProfileByUserKey = (userkey: string) => {
  // Intentionally unawaited Promise to preload cache.
  const unawaitedPromise: Promise<WithId<Document> | null> = getProfileByUserKey(userkey);
  void unawaitedPromise;
}

/**
 * Fetches a Profile from mongodb based on the userkey.
 * This data is not often modified and benefits from caching mechanisms.
 *
 * @param userkey {string} - The userkey of the profile to fetch.
 */
export const getProfileByUserKey = unstable_cache(async (userkey: string) => {
  let dbProfile = null;
  const client = getClient();
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('profiles');
    dbProfile = await collection.findOne({userkey: userkey});
  } finally {
      await client.close();
  }
  return dbProfile;
});