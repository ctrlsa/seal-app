<script>
  import { Copy, Forward, XCircle, Info } from "lucide-svelte";
  import { copy } from 'svelte-copy';

  import StackedList from "$lib/ui/list/stacked.svelte";
  import StackedListItem from "$lib/ui/list/stackedItem.svelte";
  import File from "$lib/ui/input/file.svelte";
  import cover from "$lib/assets/images/random-cover.jpg";
  import toast from "svelte-french-toast";

  let uploadFile;
</script>

<svelte:head>
  <title>Seal</title>
</svelte:head>

<div class="pb-3 pt-2 pl-3 pr-3 overflow-y-auto">
  <StackedList class="max-w-sm">
    <StackedListItem>
      <div class="flex min-w-0 gap-x-4 w-full">
        <img class="h-24 w-24 flex-none shrink-0 bg-transparent rounded-xl" src="{cover}" alt="">
        <div class="min-w-0 flex-auto">
          <p class="truncate text-ellipsis overflow-hidden text-base font-semibold leading-6">Milky Way galaxy.jpg</p>
          <p class="text-ellipsis overflow-hidden mt-1 text-xs leading-5 text-gray-500 whitespace-nowrap">CID: QmUUrmqtfQMkG2zp5t57ajwMLkzLKRTcTBib8XW1x1GNSX</p>

          <div class="flex justify-end">
            <ul class="menu menu-xs menu-horizontal bg-base-200 rounded-box mt-2 mr-1">
              <li>
                <a href="/#">
                  <Info class="h-4 w-4" />
                </a>
              </li>
            </ul>

            <ul class="menu menu-xs menu-horizontal bg-base-200 rounded-box mt-2">
              <li>
                <a href="/index">
                  <Forward class="h-4 w-4" />Share
                </a>
              </li>
              <li>
                <a href="#" use:copy={cover}
                   on:svelte-copy="{() => toast.success(`Copied!`)}">
                  <Copy class="h-4 w-4" />Copy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StackedListItem>
    <StackedListItem>
      <div class="flex min-w-0 gap-x-4 w-full">
        <div class="skeleton w-24 h-24 shrink-0"></div>
        <div class="min-w-0 flex-auto">
          <p class="truncate text-ellipsis overflow-hidden text-base font-semibold leading-6">Uploading...</p>
          <p class="text-ellipsis overflow-hidden mt-1 text-xs leading-5 whitespace-nowrap text-gray-500">Waiting for CID from the provider</p>

          <div class="flex justify-end">
            <ul class="menu menu-xs menu-horizontal bg-base-200 rounded-box mt-2">
              <li>
                <a href="/index">
                  <XCircle class="h-4 w-4" />Cancel
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StackedListItem>
  </StackedList>
  <File class="file-input file-input-bordered file-input-info w-full max-w-md mt-3" />
</div>