<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import * as Table from "$lib/ui/table";
  import { Card } from "$lib/ui/card";
  import type { Preplan } from "$lib/stores/preplan";
  import { Button } from "$lib/ui/button";
  import * as Tooltip from "$lib/ui/tooltip";

  import { Info } from "lucide-svelte";
  export let swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  export let targetAudience: Preplan["competitiveAnalysis"]["targetAudience"];

  export let competitors: Preplan["competitiveAnalysis"]["competitors"];
</script>

<div class="w-full pr-2 space-y-6">
  <div class="p-3 w-full">
    <h1 class="font-semibold text-lg mb-2">Swot analysis</h1>
    <div class="gap-2 relative w-full grid grid-cols-2">
      {#each Object.values(swot) as n, i}
        <div
          class={twMerge(
            "p-3 flex-1 rounded-md w-full min-h-36 border relative",
            "via-background to-background shadow-sm",
            [
              "bg-gradient-to-tl bg-green-50 ",
              "bg-gradient-to-tr bg-yellow-50 ",
              "bg-gradient-to-bl bg-blue-50 ",
              "bg-gradient-to-br bg-red-50 ",
            ][i],
            "bg-background",
          )}
        >
          <h2 class="uppercase font-semibold mb-2">
            {Object.keys(swot)[i]}
          </h2>
          {#each n as s, i}
            <div class="text-secondary-foreground">{i + 1}. {s}</div>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <div class="p-3 w-full">
    <h1 class="font-semibold text-lg mb-2">Competitors</h1>
    <Card>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px] text-center">Logo</Table.Head>
            <Table.Head class="w-[100px]">Competitor</Table.Head>
            <Table.Head>Size</Table.Head>
            <Table.Head>Sentiment</Table.Head>
            <Table.Head>Pricing Model</Table.Head>
            <Table.Head>Features</Table.Head>
            <!-- <Table.Head>Description</Table.Head> -->
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each competitors as c}
            <Table.Row class="w-min">
              <Table.Cell>
                <div class="flex-center">
                  <img
                    alt="Logo"
                    class="rounded-full h-9 w-9"
                    src={c.logoUrl}
                  />
                </div>
              </Table.Cell>
              <Table.Cell class="font-medium">
                <div class="flex items-center text-left">
                  <a href={c.url} class="text-primary underline">
                    {c.name}
                  </a>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild let:builder>
                      <Button builders={[builder]} variant="ghost" size="icon">
                        <Info class="w-4 h-4 text-secondary-foreground" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <p>{c.description}</p>
                    </Tooltip.Content>
                  </Tooltip.Root>
                </div>
              </Table.Cell>
              <Table.Cell>{c.size}</Table.Cell>
              <Table.Cell>{c.reviewSentiment}</Table.Cell>
              <Table.Cell>{c.pricingModel}</Table.Cell>
              <Table.Cell>{c.features}</Table.Cell>

              <!-- <Table.Cell>{c.description}</Table.Cell> -->
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </Card>
  </div>

  <div class="p-3 w-full">
    <h1 class="font-semibold text-lg mb-2">Target Audience</h1>
    <div class="grid grid-cols-2 gap-2">
      <div>
        <h2 class="font-semibold">Demographics</h2>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <h3 class="font-semibold">Age</h3>
            <p class="text-secondary-foreground">
              {targetAudience.demographics.age}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
