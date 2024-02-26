<script lang="ts">
  import * as Dialog from "$lib/ui/dialog";
  import { Button } from "$lib/ui/button";
  import { Target, Palette, BarChart4 } from "lucide-svelte";
  import Overview from "./sections/overview.svelte";
  import Design from "./sections/design.svelte";
  import CompetitiveAnalysis from "./sections/competitive-analysis.svelte";

  export let open: boolean;
  let preplan = {
    Overview: {
      Title: "QuickSlice Pizza Delivery",
      UserPrompt: "a pizza delivery app",
      Description:
        "QuickSlice is a mobile application designed to revolutionize the way users order and receive their favorite pizzas. Leveraging intuitive UI/UX design, real-time order tracking, and an extensive variety of local and gourmet pizzas, QuickSlice aims to provide a seamless, fast, and satisfying pizza delivery experience.",
      SuggestedNames: [
        {
          Name: "QuickSlice",
          Reason: "Emphasizes speed and convenience in pizza delivery.",
          Domain: "quicksliceapp.com",
        },
        {
          Name: "QuickSlice",
          Reason: "Emphasizes speed and convenience in pizza delivery.",
          Domain: "quicksliceapp.com",
        },
        {
          Name: "QuickSlice",
          Reason: "Emphasizes speed and convenience in pizza delivery.",
          Domain: "quicksliceapp.com",
        },
        {
          Name: "Pizzaroo",
          Reason: "A playful, memorable name that suggests quick delivery.",
          Domain: "pizzaroo.delivery",
        },
      ],
    },
    design: {
      colorPalette: {
        primary: "yellow",
        neutral: "warmGray",
        reason:
          "The color palette is designed to be vibrant and appetizing, reflecting the joy and excitement of ordering pizza.",
      },
      icons: [
        {
          imageUrl: "https://picsum.photos/350",
          description:
            "A vibrant and engaging user interface showcasing pizza options.",
        },
        {
          imageUrl: "https://picsum.photos/350",
          description:
            "A vibrant and engaging user interface showcasing pizza options.",
        },
        {
          imageUrl: "https://picsum.photos/350",
          description:
            "A vibrant and engaging user interface showcasing pizza options.",
        },
        {
          imageUrl: "https://picsum.photos/350",
          description:
            "A vibrant and engaging user interface showcasing pizza options.",
        },
      ],
      mockups: [
        {
          imageUrl: "https://picsum.photos/350",
          description:
            "A vibrant and engaging user interface showcasing pizza options.",
        },
        {
          imageUrl: "https://picsum.photos/350",
          description:
            "A vibrant and engaging user interface showcasing pizza options.",
        },
        {
          imageUrl: "https://picsum.photos/350",
          description:
            "A vibrant and engaging user interface showcasing pizza options.",
        },
        {
          imageUrl: "https://picsum.photos/350",
          description:
            "A vibrant and engaging user interface showcasing pizza options.",
        },
      ],
    },
    MoodBoard: {
      Images: [
        {
          ImgUrl: "https://picsum.photos/350",
          Description:
            "A vibrant and engaging user interface showcasing pizza options.",
        },
      ],
    },
    Branding: {
      Icons: [
        {
          Reason:
            "Icon resembling a pizza slice to immediately communicate app's purpose.",
          ImgUrl: "https://picsum.photos/350",
        },
      ],
      Slogan: "Slice of Happiness, Delivered Fast.",
    },
    competitiveAnalysis: {
      Competitors: [
        {
          Name: "Domino's Pizza App",
          Size: "Large",
          ReviewSentiment: 4,
          Features: [
            "Real-time tracking",
            "Customizable orders",
            "Loyalty program",
          ],
          PricingModel: "Free app, pay per order",
          Url: "https://www.dominos.com",
          Description:
            "A global leader in pizza delivery with a highly functional app.",
          LogoUrl: "https://picsum.photos/350",
        },
      ],
      swot: {
        strengths: [
          "User-friendly design",
          "Wide variety of pizzas",
          "Integration with local pizzerias",
        ],
        weaknesses: [
          "New brand, lesser-known",
          "Requires building a user base",
        ],
        opportunities: [
          "Expanding gourmet pizza selection",
          "Partnerships with local businesses",
        ],
        threats: [
          "Established competitors",
          "Changing food delivery regulations",
        ],
      },
    },
    ColorPalette: {
      Primary: ["#E63946", "#F1FAEE"],
      Neutral: ["#A8DADC", "#457B9D", "#1D3557"],
      Reason:
        "The color palette is designed to be vibrant and appetizing, reflecting the joy and excitement of ordering pizza.",
    },
    Mockups: {
      Images: [
        {
          ImgUrl: "https://picsum.photos/350",
          Description:
            "Home screen with a list of pizzas and promotional offers.",
        },
      ],
    },
    Wireframes: [
      {
        Screen: "Home Screen",
        Description:
          "Features a carousel of top pizzas, a search bar, and categories for easy navigation.",
        ImgUrl: "https://picsum.photos/350",
      },
    ],
    Typography: {
      Font: "Roboto, sans-serif",
      Reason:
        "Roboto is a versatile, modern font that ensures readability across devices and enhances the user interface.",
    },
    Features: {
      Must: [
        "Real-time GPS tracking of delivery",
        "Secure payment gateway",
        "User account creation and management",
      ],
      Should: ["Loyalty and rewards program", "Custom pizza builder tool"],
      Could: [
        "Integration with smart home devices for order notifications",
        "Augmented reality (AR) feature to visualize pizza sizes",
      ],
      Wont: ["Table reservation feature", "Dine-in menu options"],
    },
    Technology: {
      Stacks: [
        {
          Name: "React Native",
          Description: "A framework for building native apps using React.",
          LogoUrl: "https://picsum.photos/350",
          Reason:
            "Enables development of both Android and iOS apps from a single codebase, speeding up the development process.",
        },
        {
          Name: "Node.js",
          Description:
            "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
          LogoUrl: "https://picsum.photos/350",
          Reason:
            "Facilitates building scalable network applications, ideal for handling multiple pizza order requests.",
        },
      ],
    },
    TargetAudience: {
      Demographics: {
        Age: "18-35 years",
      },
    },
  };

  const navigation = [
    {
      title: "YOUR PLAN",
      links: [
        {
          title: "Overview",
          icon: Target,
          slug: "overview",
        },
        {
          title: "Competitive analysis",
          icon: BarChart4,
          slug: "competitive-analysis",
        },
        {
          title: "Design",
          icon: Palette,
          slug: "design",
        },
      ],
    },
  ];

  let section: string = "design";
</script>

<Dialog.Root bind:open>
  <Dialog.Content
    class="md:h-[80dvh] p-0 gap-0 flex flex-col md:w-[90%] max-w-[90%]"
  >
    <Dialog.Header class="border-b p-4">
      <Dialog.Title>Project preplan - {preplan.Overview.Title}</Dialog.Title>
    </Dialog.Header>
    <div class="w-full h-[calc(100%-52px)] flex">
      <aside class="h-full bg-secondary w-64 min-w-64 px-3">
        <div class="mt-4">
          {#each navigation as n}
            <span class="font-semibold text-sm">{n.title}</span>
            <div class="flex flex-col">
              {#each n.links as l}
                <Button
                  on:click={() => (section = l.slug)}
                  variant="ghost"
                  class="justify-start items-center p-1 rounded-none"
                >
                  <svelte:component this={l.icon} class="h-4 w-4 mr-2" />

                  {l.title}</Button
                >
              {/each}
            </div>
          {/each}
        </div>
        <div class="flex flex-col"></div>
      </aside>
      <div class="w-full">
        {#if section === "overview"}
          <Overview
            userPrompt={preplan.Overview.UserPrompt}
            description={preplan.Overview.Description}
            suggestedNames={preplan.Overview.SuggestedNames.map((x) => ({
              name: x.Name,
              reason: x.Reason,
              domainName: x.Domain,
            }))}
          />
        {:else if section === "design"}
          <Design
            colorPalette={preplan.design.colorPalette}
            icons={preplan.design.icons}
            mockups={preplan.design.mockups}
          />
        {:else if section === "competitive-analysis"}
          <CompetitiveAnalysis swot={preplan.competitiveAnalysis.swot} />
        {/if}
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>
