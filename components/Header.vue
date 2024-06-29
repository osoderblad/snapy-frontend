<template>
  <header
    class="navbar bg-base-100 fixed top-0 bg-opacity-85 backdrop-blur-[0.5rem] z-[1000] justify-between flex"
  >
    <div class="">
      <h1 class="btn btn-ghost text-2xl md:text-3xl font-medium gap-0 mb-0">
        <NuxtLink class="no-underline" to="/">
          Snapy<span class="text-[#64649E]">.se</span>
        </NuxtLink>
      </h1>
    </div>
    <div class="links">
      <span v-for="link in topNavLinks">
        <NuxtLink :to="link.to" v-text="link.label" class="mr-2 no-underline" />
      </span>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar border-2 border-[#612FA8] p-[0.3px] bg-[#322353] hover:border-"
        >
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow links links-side"
        >
          <li v-for="link in userLinks" class="mb-1">
            <NuxtLink :to="link.to" v-text="link.label" />
          </li>
          <li>
            <NuxtLink v-if="!user" to="/login" class="opacity-60 no-underline">
              Logga in / Registrera
              <LockClosedIcon class="w-5 h-5 inline"></LockClosedIcon>
            </NuxtLink>

            <span v-if="user" @click="logout()" class="opacity-60">
              Logga ut
            </span>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { LockClosedIcon } from "@heroicons/vue/24/solid";
import CompleteAccountBanner from "~/asyncComponents/completeAccountBanner.vue";
const props = defineProps(["links"]);
const user = useSupabaseUser();
const client = useSupabaseClient();

function logout() {
  client.auth.signOut();
  navigateTo("/");
}
const topNavLinks = computed(() => {
  return props.links.filter((link: any) => {
    const requiresLogin = link.needLoggedIn || false;
    const profileMenu = link.profileMenu;
    return (!requiresLogin || user.value) && !profileMenu;
  });
});

const userLinks = computed(() => {
  return props.links.filter((link: any) => {
    const requiresLogin = link.needLoggedIn || false;
    const profileMenu = link.profileMenu;
    return (!requiresLogin || user.value) && profileMenu;
  });
});
</script>
