<script lang="ts">
  import { Label } from "$lib/ui/label";
  import { Progress } from "$lib/ui/progress";
  import { ArrowLeft } from "lucide-svelte";
  import { page } from "$app/stores";
  import { twMerge } from "tailwind-merge";

  $: pageIndex =
    ["basic", "skills", "team"].indexOf($page.params.details_page) + 1;
</script>

<div
  class="h-screen overflow-hidden flex flex-col sm:flex-center pt-[20%] sm:pt-0 sm:-mt-10"
>
  <div class="sm:max-w-[28rem] w-full px-4 flex flex-col gap-6">
    <div class="flex flex-col space-y-2 sm:text-center sm:items-center">
      <div class="w-full flex flex-col mb-2">
        <div class="flex w-full">
          <Label
            class={twMerge(
              "text-right w-full mb-2 flex items-center gap-1 -translate-x-2",
              pageIndex == 1 && "hidden"
            )}
          >
            <ArrowLeft class="ml-2 w-4 h-4" />
            Back
          </Label>
          <Label for="progress" class="text-right w-full mb-2 -translate-x-2"
            >{pageIndex}/3</Label
          >
        </div>
        <Progress id="progress" value={(pageIndex / 3) * 100} />
      </div>
      <slot />
    </div>
  </div>
</div>
