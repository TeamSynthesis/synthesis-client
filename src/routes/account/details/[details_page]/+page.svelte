<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { Input } from "$lib/ui/input";
  import { Label } from "$lib/ui/label";
  import { Loader2 } from "lucide-svelte";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";
  import { Progress } from "$lib/ui/progress";
  import * as Avatar from "$lib/ui/avatar";
  import Basic from "./_components/pages/basic.svelte";

  export let data: PageData;

  const superformConfig = superForm(data.form, {
    delayMs: 200,
    taintedMessage: null,
  });

  let page: number = 1;
</script>

<Basic {superformConfig} />
