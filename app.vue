<template>
  <div>
    <!-- max-w-[55px] -->
    <Header />
    <div class="container-app flex flex-col lg:grid lg:grid-cols-10 lg:gap-5">
      <aside
        class="lg:col-span-2 2xl:col-span-1 dark:bg-[#1C2330] dark:bg-opacity-20 sidenav"
        v-if="sideNavOpen"
      >
        <UVerticalNavigation class="px-2 lg:my-2 my-4" :links="links" />
      </aside>
      <div class="lg:col-span-8 2xl:col-span-9">
        <NuxtLoadingIndicator :height="4" :throttle="400" />
        <NuxtPage keepalive />
      </div>
    </div>
  </div>
</template>

<script setup>
// const route = useRoute();

const sideNavOpen = useState("sideNavOpen", () => true);

useSeoMeta({
  title: "Snapbacks by Snapy",
  description: "Snapbacks by Snapy",
});

const links = [
  [
    // {
    //   label: "Profile",
    //   avatar: {
    //     src: "https://avatars.githubusercontent.com/u/739984?v=4",
    //   },
    //   badge: 100,
    // },
    {
      label: "Start",
      icon: "i-heroicons-home",
      to: "/",
    },
    {
      label: "Domäner",
      icon: "i-heroicons-link",
      to: "/domaner",
    },
    {
      label: "Portfolio",
      icon: "i-heroicons-briefcase",
      to: "/portfolio",
    },
  ],
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
