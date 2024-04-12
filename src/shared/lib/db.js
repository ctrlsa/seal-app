import Dexie from "dexie";

import { DB_NAME } from "$lib/lib/constants";


const _DB_SCHEMA = {
    files: "id, cid, pid, name, size, mimeType, status, encryption, created, updated, protocol, storageProvider, txHash, publicKey, url",
};

export const db = new Dexie(DB_NAME);

db.version(1).stores(_DB_SCHEMA);
