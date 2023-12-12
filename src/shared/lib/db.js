import Dexie from "dexie";

export const db = new Dexie("Seal");

db.version(2).stores({
    files: "id, cid, pid, name, size, mimeType, status, encryption, created, updated, protocol, storageProvider, txHash, publicKey, url"
});