<template>
  <section>
    <div class="w-full">
      <div class="flex flex-wrap">
        <div
          class="hidden lg:w-[40%] lg:flex w-full private h-auto p-4 justify-center items-center"
        >
          <h2
            class="text-3xl bg-gradient-to-br from-orange-500 to-yellow-300 bg-clip-text text-transparent font-extrabold block"
          >
            Låt oss konfigurera ditt nya glänsande konto ✨
          </h2>
        </div>

        <div
          class="lg:w-[60%] w-full private h-auto p-4 justify-center items-start"
        >
          <h3 class="w-full">Berätta för oss om dig själv</h3>
          <TabGroup>
            <TabList
              class="flex space-x-1 rounded-xl bg-blue-900/20 p-1 max-w-md"
            >
              <Tab
                as="template"
                v-slot="{ selected }"
                @click="chooseType('Private')"
              >
                <button
                  :class="[
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-base-100 text-base-content shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                  ]"
                >
                  Privatperson
                </button>
              </Tab>
              <Tab
                as="template"
                v-slot="{ selected }"
                @click="chooseType('Business')"
              >
                <button
                  :class="[
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-base-100 text-base-content shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                  ]"
                >
                  Företag
                </button>
              </Tab>
            </TabList>
          </TabGroup>

          <OnboardingPrivate
            v-if="selectedTab == 'Private'"
          ></OnboardingPrivate>

          <OnboardingBusiness
            v-if="selectedTab == 'Business'"
          ></OnboardingBusiness>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
const selectedTab = ref("Private");

const chooseType = (type: string) => {
  selectedTab.value = type;
};
</script>
