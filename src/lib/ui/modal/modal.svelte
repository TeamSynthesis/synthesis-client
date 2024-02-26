<script lang="ts">
  import MediaQuery from "svelte-media-queries";
  import * as Dialog from "$lib/ui/dialog";
  import * as Drawer from "$lib/ui/drawer";

  export let open: boolean;
</script>

<MediaQuery query="(min-width: 640px)" let:matches>
  {#if matches}
    <Dialog.Root bind:open>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            <slot name="title" />
          </Dialog.Title>
          <Dialog.Description>
            <slot name="description" />
          </Dialog.Description>
        </Dialog.Header>
        <slot />
        <Dialog.Footer>
          <slot name="footer" />
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  {:else}
    <Drawer.Root bind:open>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>
            <slot name="title" />
          </Drawer.Title>
          <Drawer.Description>
            <slot name="description" />
          </Drawer.Description>
        </Drawer.Header>
        <slot />
        <Drawer.Footer>
          <slot name="footer" />
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  {/if}
</MediaQuery>
