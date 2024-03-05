<div class="flex flex-col gap-4 w-full px-3 sm:px-0 mt-2 -mb-6">
  <input-group class="space-y-3">
    <div class="grid gap-1">
      <Label for="name">Name</Label>
      <Input
        id="name"
        name="name"
        placeholder="Pied piper"
        type="name"
        minlength={2}
        maxlength={64}
        autocapitalize="none"
        autocomplete="off"
        autocorrect="off"
        required
      />
    </div>
    <div class="grid gap-1">
      <Label for="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        placeholder="A mobile messaging app that ..."
        minlength={32}
        maxlength={2056}
        required
      />
      <Label class="italic text-muted-foreground leading-4" for="description">
        PS: Writing a more detailed description will lead to a better result, so
        go all out. Need some inspo? Check out <a href="/prompt-examples"
          >our examples</a
        >
      </Label>
    </div>
  </input-group>
</div>

<div class="flex gap-2 justify-end mt-3" slot="footer">
  {#if page === "ai"}
    <Button
      variant="outline"
      type="submit"
      on:click={() => {
        page = createProjectFrom;
      }}>Back</Button
    >

    <Button type="submit" disabled={loading}>
      {#if loading}
        <Loader2 class="mr-2 animate-spin h-5 w-5" />
      {/if}
      Create project
    </Button>
  {/if}
</div>
