import { error } from '@sveltejs/kit';

import { db } from "$shared/lib/db";


export async function load({ params }) {
  const file = await db.files.get(params.id);

  if (file !== undefined) return file;

  error(404, "Not found");
}