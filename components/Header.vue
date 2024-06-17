<template>
  <header
    class="border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800 bg-opacity-85 backdrop-blur-[0.5rem]"
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
            <span class="absolute -top-[5px] ml-2 text-primary-400 text-3xl">
              Snapy<span class="text-gray-500">.se</span></span
            >
          </h5>
        </a>
      </div>
      <!-- <ul class="items-center gap-x-8 hidden lg:flex">
        <li class="relative">
          <a
            class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary"
            href="/releases"
            >Releases</a
          >
        </li>
      </ul> -->

      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <div class="relative" data-headlessui-state="">
          <div
            class="inline-flex w-full"
            role="button"
            data-n-ids='{"nzBDbpLyCOd-0":"nzBDbpLyCOd-0","nzBDbpLyCOd-1":"nzBDbpLyCOd-1"}'
            id="headlessui-popover-button-nzBDbpLyCOd-0"
            aria-expanded="false"
            data-headlessui-state=""
          >
            <button
              type="button"
              class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
              aria-label="Color picker"
            >
              <span
                class="i-heroicons-swatch-20-solid w-5 h-5 text-primary-500 dark:text-primary-400"
              ></span>
            </button>
          </div>
        </div>
        <div
          hidden=""
          style="
            position: fixed;
            top: 1;
            left: 1;
            width: 1;
            height: 0;
            padding: 0;
            margin: -1;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
            display: none;
          "
        ></div>

        <div class="relative inline-flex">
          <button
            type="button"
            class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
            aria-label="Search"
          >
            <span
              class="i-heroicons-magnifying-glass-20-solid flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            ></span>
          </button>
        </div>

        <!-- <ColorMode /> -->

        <span @click="openLogin" class="opacity-60">
          Logga in / Registrera
          <LockClosedIcon class="w-5 h-5 inline"></LockClosedIcon>
        </span>

        <a
          class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
          aria-label="GitHub"
          href="https://github.com/nuxt/ui"
          rel="noopener noreferrer"
          target="_blank"
          ><span
            class="i-simple-icons-github flex-shrink-0 h-5 w-5"
            aria-hidden="true"
          ></span
        ></a>

        <button
          @click="toggleSideNav()"
          type="button"
          class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center lg:hidden"
          aria-label="Open Menu"
        >
          <span
            class="i-heroicons-bars-3-20-solid flex-shrink-0 h-5 w-5"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/24/solid";
const isLoginOpen = useState("isLoginOpen");
const sideNavOpen = useState("sideNavOpen");

function openLogin() {
  isLoginOpen.value = true;
}
function toggleSideNav() {
  sideNavOpen.value = !sideNavOpen.value;
}
</script>
