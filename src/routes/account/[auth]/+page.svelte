<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { Input } from "$lib/ui/input";
  import { Label } from "$lib/ui/label";
  import { Loader2 } from "lucide-svelte";
  import { GithubIcon } from "$lib/ui/icon";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Logo } from "$lib/ui/logo";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";
  import { twMerge } from "tailwind-merge";

  export let data: PageData;

  let errorMessage: string = "";

  const {
    form: superFormStore,
    errors,
    constraints,
    delayed,
    enhance,
  } = superForm(data.form, {
    delayMs: 200,
    taintedMessage: null,
    onSubmit() {
      errorMessage = "";
    },
  });

  onMount(() => {
    errorMessage = $page.url.searchParams.get("error") ?? "";
    if ($page.url.searchParams.get("error")) goto("?");
  });
</script>

<div
  class="h-screen min-h-screen relative overflow-hidden flex flex-col sm:flex-center pt-[20%] sm:pt-0 md:-mt-10"
>
  <div class="sm:max-w-[28rem] w-full px-4 flex flex-col gap-6">
    <div class="flex flex-col space-y-2 sm:text-center sm:items-center">
      <Logo class="h-12 w-12 mb-1" />
      <h1 class="text-2xl font-semibold tracking-tight">
        {$page.params.auth === "sign-in"
          ? "Sign in to your account"
          : "Sign up for an account"}
      </h1>
      <p class="text-sm text-muted-foreground">
        Continue with email/password or GitHub.
      </p>
    </div>

    <Button
      data-sveltekit-preload-data="off"
      data-sveltekit-reload
      href="/account/github?action={$page.params.auth}"
      variant="outline"
      class="shadow-sm"
      ><GithubIcon class="mr-2 h-5 w-5" />
      Continue with GitHub</Button
    >
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>

    <form use:enhance action="/account/{$page.params.auth}" method="post">
      <div class="grid gap-2">
        <input-group class="space-y-3">
          <div class="grid gap-1">
            <Label
              for="email"
              class={twMerge("text-destructive-foreground" && $errors.email)}
              >Email</Label
            >
            <Input
              bind:value={$superFormStore.email}
              {...$constraints.email}
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autocomplete="off"
              autocapitalize="none"
              required
            />
          </div>
          <div class="grid gap-1">
            <Label for="password">Password</Label>
            <Input
              bind:value={$superFormStore.password}
              {...$page.params.auth == "sign-up" ? $constraints.password : {}}
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              autocapitalize="none"
              autocomplete="off"
              autocorrect="off"
              required
            />
            <Label
              class={twMerge(
                "italic text-muted-foreground leading-4",
                $page.params.auth == "sign-in" && "hidden"
              )}
              for="password"
            >
              Password must be at least 8 characters long, contain at least 1
              uppercase letter, 1 lowercase letter, and 1 number.
            </Label>
          </div>
        </input-group>

        <Button type="submit" class="mt-6" disabled={$delayed}>
          {#if $delayed}
            <Loader2 class="mr-2 animate-spin h-5 w-5" />
          {/if}
          Continue with email
        </Button>
      </div>
    </form>

    <div class="relative">
      <a
        class="a text-left text-sm"
        href="/account/{$page.params.auth === 'sign-in'
          ? 'sign-up'
          : 'sign-in'}"
        >{$page.params.auth === "sign-in" ? "Dont have" : "Already have"} an account?{" "}</a
      >
      <a
        class:hidden={$page.params.auth === "sign-up"}
        href="/account/forgot-password"
        class="a absolute -bottom-6 left-0 text-left text-sm"
      >
        Forgot password?
      </a>
    </div>
    <p class="text-sm h-5 mt-2 text-left text-destructive">
      {(errorMessage || $errors._errors?.at(0)) ?? ""}
    </p>
  </div>
  <p
    class="absolutef bottom-2 translate-y-12 px-4 sm:px-8 sm:text-center text-sm text-muted-foreground"
  >
    By continuing, you agree to our{" "}
    <a href="/legal/terms-of-service" class="a"> Terms of Service </a>{" "}
    {" and "}
    <a href="/legal/privacy-policy" class="a"> Privacy Policy </a>
    .<br />
  </p>
</div>
