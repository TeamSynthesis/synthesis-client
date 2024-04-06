<script lang="ts">
  import "../app.css";
  import "@fontsource/inter";
  import "@fontsource/inter/100.css";
  import "@fontsource/inter/200.css";
  import "@fontsource/inter/300.css";
  import "@fontsource/inter/400.css";
  import "@fontsource/inter/500.css";
  import "@fontsource/inter/600.css";
  import "@fontsource/inter/700.css";
  import "@fontsource/inter/800.css";
  import "@fontsource/inter/900.css";

  import user from "$lib/stores/user";
    import { AlertTriangle, Loader2 } from "lucide-svelte";

  export let data;

  const getProfile = async ()=>{
    const _user = await data.props.userProfile;
    if(typeof _user === "string") throw new Error(_user);
    if(_user) $user = _user;
    console.log("user", _user)
  } 
</script>

{#await getProfile()}
  <div class="flex flex-col items-center justify-center w-full h-screen gap-2 p-4">
    <div class="relative flex-col flex-center">
      <Loader2 class="text-primary h-5 w-5 animate-spin duration-150" />
    </div>
  </div>
{:then _} 
  <slot />
{:catch error}
  <div class="flex flex-col items-center justify-center w-full h-screen gap-2 p-4">
    <div class="relative inline-flex">
        <AlertTriangle class="w-10 h-10 text-red-500" />
    </div>
    <div class="mt-4 text-center">
        <h1 class="text-xl font-semibold">Failed to load user profile</h1>
        <p class="text-sm text-secondary-foreground">
            {error.message}
        </p>
    </div>
  </div>  
{/await}
