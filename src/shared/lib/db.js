import Dexie from "dexie";

Dexie.delete("Seal");

export const db = new Dexie("SealDB");

db.version(1).stores({
    files: "id, cid, pid, name, size, mimeType, status, encryption, created, updated, protocol, storageProvider, txHash, publicKey, url"
});