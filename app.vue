<template>
  <div>
    <ClientOnly>
      <CompleteAccountBanner v-if="!accountCompleted"></CompleteAccountBanner>
      <Header :links="links" />

      <Toast />
    </ClientOnly>
    <div id="ftco-loader" class="fullscreen" :class="loaded ? 'hide' : ''">
      <div
        id="preloader"
        style="display: flex; justify-content: center; height: 100svh"
      >
        <span class="opacity-20 align-middle flex">
          <span
            class="align-middle loading loading-ball loading-lg text-accent -right-[25px]"
          ></span>
          <span
            class="align-middle loading loading-ball loading-lg text-accent"
          ></span>
          <span
            class="align-middle loading loading-ball loading-lg text-accent -left-[25px]"
          ></span>
        </span>
      </div>
    </div>

    <div class="container-app">
      <div class="lg:col-span-8">
        <NuxtLoadingIndicator :height="4" :throttle="400" />
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LinkIcon,
  HomeIcon,
  BriefcaseIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/vue/24/solid";
const CompleteAccountBanner = defineAsyncComponent(
  () => import("~/asyncComponents/completeAccountBanner.vue")
);
const loaded = ref(false);
// const sideNavOpen = useState("sideNavOpen", () => true);
// useState("isLoginOpen", () => false);
const accountCompleted = useState("accountCompleted", () => true);
// const client = useSupabaseClient();

onMounted(async () => {
  const client = useSupabaseClient();
  //listens on supabase auth state changes
  client.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
      IsAccountCompleted().then((res) => {
        accountCompleted.value = res;
      });
    }
  });

  setTimeout(async () => {
    accountCompleted.value = await IsAccountCompleted();
    loaded.value = true;
  }, 300);
});

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
    profileMenu: false,
    needLoggedIn: false,
  },
  {
    label: "Domäner",
    icon: LinkIcon,
    to: "/user/domaner",
    profileMenu: false,
    needLoggedIn: false,
  },
  {
    label: "Portfolio",
    icon: BriefcaseIcon,
    to: "/user/portfolio",
    profileMenu: false,
    needLoggedIn: true,
  },
  {
    label: "Mitt Konto",
    icon: UserIcon,
    to: "/user/myaccount",
    profileMenu: true,
    needLoggedIn: true,
  },
  {
    label: "Prenumeration",
    icon: CreditCardIcon,
    to: "/user/subscription",
    profileMenu: true,
    needLoggedIn: true,
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
