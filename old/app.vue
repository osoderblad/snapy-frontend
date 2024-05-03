<template>
  <div class="">
    <Header />
    <div
      class="py-2 container-app flex flex-col lg:grid lg:grid-cols-10 lg:gap-8"
    >
      <aside class="lg:col-span-2">
        <UVerticalNavigation class="px-2" :links="links" />
      </aside>
      <div class="lg:col-span-8">
        <NuxtLoadingIndicator :height="4" :throttle="400" />
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
// const route = useRoute();

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
