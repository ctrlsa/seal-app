import { error } from "@sveltejs/kit";

import { db } from "$shared/lib/db";
import { filesize } from "filesize";
import dayjs from "dayjs";
import { capitalize } from "moderndash";
import { fromMime } from "human-filetypes";


export async function load({ params }) {
  let file = await db.files.get(params.id);

  if (file !== undefined) {
    file.hrSize = filesize(file.size);
    file.createdF = dayjs(file.created).format("MMM D, YYYY h:mm A");
    file.fileType = capitalize(fromMime(file.mimeType));
    file.protocol = capitalize(file.protocol);
    file.storageProvider = capitalize(file.storageProvider);

    return file;
  }

  error(404, "Not found");
}