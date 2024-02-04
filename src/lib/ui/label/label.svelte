<script lang="ts">
  import { Label as LabelPrimitive } from "bits-ui";
  import { cn } from "$lib/helpers/shadcn";

  type $$Props = LabelPrimitive.Props;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<LabelPrimitive.Root
  class={cn(
    "text-xs ml-1.5 font-normal text-secondary-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className
  )}
  {...$$restProps}
>
  <slot />
</LabelPrimitive.Root>
