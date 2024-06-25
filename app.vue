<template>
  <div>
    <CompleteAccountBanner v-if="!accountCompleted"></CompleteAccountBanner>
    <Header />
    <Toast />
    <div
      class="container-app flex flex-col lg:grid lg:grid-cols-10 lg:gap-5 p-2"
    >
      <aside class="lg:col-span-2 sidenav" v-if="sideNavOpen">
        <SideNav
          class="p-2 lg:my-2 my-4 dark:bg-[#181825] rounded-lg"
          :links="links"
        />
      </aside>
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
const sideNavOpen = useState("sideNavOpen", () => true);
useState("isLoginOpen", () => false);
var accountCompleted = useState("accountCompleted", () => null);
const client = useSupabaseClient();
// const accountCompleted = ref(false);

const CompleteAccountBanner = defineAsyncComponent(
  () => import("~/asyncComponents/completeAccountBanner.vue")
);

onMounted(async () => {
  accountCompleted.value = await IsAccountCompleted();
});

useHead({
  htmlAttrs: {
    "data-theme": "catppuccin",
  },
});

//listens on supabase auth state changes

const { data } = client.auth.onAuthStateChange(async (event, session) => {
  if (event === "INITIAL_SESSION") {
    // handle initial session
  } else if (event === "SIGNED_IN") {
    accountCompleted.value = await IsAccountCompleted();
  } else if (event === "SIGNED_OUT") {
    accountCompleted.value = await IsAccountCompleted();
  }
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
    label: "Bokade domäner",
    icon: BriefcaseIcon,
    to: "/user/portfolio",
  },
  {
    label: "Mitt Konto",
    icon: UserIcon,
    to: "/user/myaccount",
  },
  {
    label: "Prenumeration",
    icon: CreditCardIcon,
    to: "/user/subscription",
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
