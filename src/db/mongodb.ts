
import { MongoClient, ServerApiVersion } from 'mongodb';

export const client = new MongoClient(
    process.env.DB_CONNECT_URL ?? '',
    {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: false,
        }
    }
);
