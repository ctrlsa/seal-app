/**
 * PENDING: file pending upload via a storage provider
 * UPLOADING: file is being uploaded
 * QUEUED: file queued for pushing to IPFS/Filecoin
 * STORED: file stored in IPFS/Filecoin
 * FAILED: failed to upload
 * REJECTED: file rejected by storage provider
 * DELETED: marked for deletion (local)
 */
export const UploadStatus = {
  PENDING: "pending",
  UPLOADING: "uploading",
  QUEUED: "queued",
  STORED: "stored",
  FAILED: "failed",
  REJECTED: "rejected",
  DELETED: "deleted"
}
