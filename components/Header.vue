<!-- <template>
  <header
    class="border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800 bg-opacity-85 backdrop-blur-[0.5rem] py-2"
  >
    <div
      class="mx-auto px-4 flex items-center justify-between gap-3 h-[--header-height] my-3"
    >
      <div class="lg:flex-1 flex items-center gap-1.5">
        <a
          href="/"
          class="flex items-end gap-2 no-underline font-bold text-xl text-gray-900 dark:text-white"
        >
          <h5 class="underline-none mb-0">
            <span class="nunito">Snapbacks by</span>
            <span class="ml-2 text-primary-400 text-3xl">
              Snapy<span class="text-gray-500">.se</span></span
            >
          </h5>
        </a>
      </div>

      <div class="flex items-center justify-end lg:flex-1 gap-1.5">  
        <div class="cursor-pointer">
          <NuxtLink v-if="!user" to="/login" class="opacity-60 no-underline">
            Logga in / Registrera
            <LockClosedIcon class="w-5 h-5 inline"></LockClosedIcon>
          </NuxtLink>

          <span v-if="user" @click="logout()" class="opacity-60">
            Logga ut
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/24/solid";

const user = useSupabaseUser();
const client = useSupabaseClient();

function logout() {
  client.auth.signOut();
  navigateTo("/");
}
</script> -->

<template>
  <header
    class="navbar bg-base-100 fixed top-0 bg-opacity-85 backdrop-blur-[0.5rem] z-[1000] justify-between flex"
  >
    <div class="">
      <h1 class="btn btn-ghost text-2xl md:text-3xl font-medium gap-0 mb-0">
        <a class="no-underline" href="/">
          Snapy<span class="text-[#64649E]">.se</span>
        </a>
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
          <li v-for="link in userLinks">
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
const props = defineProps(["links"]);
import { LockClosedIcon } from "@heroicons/vue/24/solid";

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
