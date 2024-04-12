import { sha512 } from "$lib/lib/crypto";


/** Generate anonymous user ID for analytics */
export async function generateUniqueUserID(id) {
  return await sha512(id);
}