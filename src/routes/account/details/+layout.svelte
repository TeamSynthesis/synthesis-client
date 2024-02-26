<script lang="ts">
  import { Label } from "$lib/ui/label";
  import { Progress } from "$lib/ui/progress";
  import { page } from "$app/stores";

  $: pageIndex =
    ["basic", "skills", "finalize"].indexOf($page.params.details_page) + 1;
</script>

<div
  class="h-screen overflow-hidden flex flex-col sm:flex-center pt-[20%] sm:pt-0 sm:-mt-10"
>
  <div class="sm:max-w-[28rem] w-full px-4 flex flex-col gap-6">
    <div class="flex flex-col space-y-2 sm:text-center sm:items-center">
      <div class="w-full flex flex-col mb-2">
        <Label for="progress" class="text-right w-full mb-2 -translate-x-2"
          >{pageIndex}/3</Label
        >
        <Progress id="progress" value={(pageIndex / 3) * 100} />
      </div>
      <slot />
    </div>
  </div>
</div>
