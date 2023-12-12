import lighthouse from "@lighthouse-web3/sdk";

import { db } from "$lib/lib/db";
import { nanoid } from "$lib/lib/nanoid";
import { storageProviders } from "$lib/lib/enums/storageProviders"


const storageProviderName = storageProviders.lighthouse.name;
const storageProviderProtocol = storageProviders.lighthouse.protocol;
const storageProviderGatewayUrl = storageProviders.lighthouse.gatewayUrl;


export async function getUploadsCount(apiKey) {
  const uploads = await lighthouse.getUploads(apiKey);

  return uploads.data.totalFiles;
}

export async function syncUploads(apiKey){
  const fileList = await lighthouse.getUploads(apiKey);
  //console.log(fileList.data.totalFiles);

  // Add files to the database
  for (const file of fileList.data.fileList) {
    if (file.mimeType) {
      let newFile = {
        id: nanoid(),
        cid: file.cid,
        pid: file.id,
        name: file.fileName,
        size: file.fileSizeInBytes,
        mimeType: file.mimeType,
        status: file.status,
        encryption: file.encryption,
        created: file.createdAt,
        updated: file.lastUpdate,
        protocol: storageProviderProtocol,
        storageProvider: storageProviderName,
        txHash: file.txHash,
        publicKey: file.publicKey,
        url: storageProviderGatewayUrl + file.cid
      };

      // Add files to DB
      try {
        await db.files.add(newFile);
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }

  return true;
}
