<template>
  <header class="fixed top-0 z-[1000] p-2 w-full">
    <div
      class="navbar bg-base-100 bg-opacity-85 backdrop-blur-[0.5rem] flex rounded-lg justify-between"
    >
      <div class="">
        <NuxtLink class="no-underline" to="/">
          <h1 class="btn btn-ghost text-2xl md:text-3xl font-medium gap-0 mb-0">
            Snapy<span class="text-[#64649E]">.se</span>
          </h1>
        </NuxtLink>
      </div>

      <div class="dropdown lg:hidden block">
        <div role="button" tabindex="0" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabIndex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li class="links links-side" v-for="link in topNavLinks">
            <NuxtLink
              @click="handleClick"
              :to="link.to"
              v-text="link.label"
              class="mr-2 no-underline mb-1"
            />
          </li>
        </ul>
      </div>

      <div class="links hidden lg:block">
        <span v-for="link in topNavLinks">
          <NuxtLink
            :to="link.to"
            v-text="link.label"
            class="mr-2 no-underline"
          />
        </span>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar border-2 border-[#612FA8] p-[0.3px] bg-[#322353]"
          >
            <div class="w-7 rounded-full">
              <img alt="user svg" src="/user.svg" />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow links links-side"
          >
            <span v-if="user?.email" class="p-2 opacity-80 text-sm">{{
              user?.email
            }}</span>
            <li v-for="link in userLinks" class="mb-1">
              <NuxtLink :to="link.to" v-text="link.label" />
            </li>
            <li>
              <NuxtLink
                v-if="!user"
                to="/login"
                class="opacity-60 no-underline"
              >
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
    </div>
  </header>
</template>

<script setup lang="ts">
import { LockClosedIcon } from "@heroicons/vue/24/solid";
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
const handleClick = () => {
  const elem = document.activeElement;
  if (elem) {
    elem?.blur();
  }
};

const userLinks = computed(() => {
  return props.links.filter((link: any) => {
    const requiresLogin = link.needLoggedIn || false;
    const profileMenu = link.profileMenu;
    return (!requiresLogin || user.value) && profileMenu;
  });
});
</script>
