<template>
  <div>
    <!-- max-w-[55px] -->
    <Header />
    <Toast />
    <div
      class="container-app flex flex-col lg:grid lg:grid-cols-10 lg:gap-5 p-2"
    >
      <aside class="lg:col-span-2 2xl:col-span-1 sidenav" v-if="sideNavOpen">
        <SideNav
          class="p-2 lg:my-2 my-4 dark:bg-[#181825] rounded-lg"
          :links="links"
        />
      </aside>
      <div class="lg:col-span-8 2xl:col-span-9">
        <NuxtLoadingIndicator :height="4" :throttle="400" />
        <NuxtPage keepalive />
      </div>
    </div>
    <AuthLogin></AuthLogin>
  </div>
</template>

<script setup>
import { LinkIcon, HomeIcon, BriefcaseIcon } from "@heroicons/vue/24/solid";
const sideNavOpen = useState("sideNavOpen", () => true);
useState("isLoginOpen", () => false);

useHead({
  htmlAttrs: {
    "data-theme": "catppuccin",
  },
});

useSeoMeta({
  title: "Snapbacks by Snapy",
  description: "Snapbacks by Snapy",
});

const links = [
  {
    label: "Start",
    icon: HomeIcon,
    to: "/",
  },
  {
    label: "Domäner",
    icon: LinkIcon,
    to: "/user/domaner",
  },
  {
    label: "Portfolio",
    icon: BriefcaseIcon,
    to: "/user/portfolio",
  },
];
</script>

<style>
.sidenav a {
  color: #818181;
  padding: 10px;
  text-decoration: none;
  font-size: 16px;
}
</style>
