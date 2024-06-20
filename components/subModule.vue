<template>
  <div class="">
    <div class="mx-auto max-w-4xl text-center">
      <h2 class="text-2xl font-bold">Prenumeration</h2>

      <p class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Prisplaner för alla typer
      </p>
    </div>
    <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8">
      Välj en prisvärd plan som är fullspäckad med de bästa funktionerna för
      engagera din publik, skapa kundlojalitet och driva försäljning.
    </p>
    <div
      class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3"
    >
      <div
        v-for="(tier, index) in tiers"
        :key="tier.id"
        :class="[
          index == 1 ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
          'rounded-3xl p-8',
        ]"
      >
        <h2
          :id="tier.id"
          :class="[index == 1 ? '' : '', 'text-lg font-semibold leading-8']"
        >
          {{ tier.name }}
        </h2>
        <p class="mt-4 text-sm leading-6">
          {{ tier.description }}
        </p>
        <p class="mt-6 flex items-baseline gap-x-1">
          <span class="text-4xl font-bold tracking-tight">
            {{ tier.amount }}
          </span>
          <span class="text-sm font-semibold leading-6">sek/mån</span>
        </p>

        <div>
          <form action="/api/subscribe" method="post" v-if="user">
            <input type="hidden" name="customer_id" :value="user?.id" />
            <input type="hidden" name="name" :value="tier.name" />
            <input type="hidden" name="price_id" :value="tier.id" />
            <button type="submit" href="#" aria-describedby="tier-hobby">
              <span
                :aria-describedby="tier.id"
                :class="[
                  index == 1
                    ? 'bg-indigo-600 shadow-sm hover:bg-indigo-500'
                    : ' ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-6 block px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-lg',
                ]"
                >Prenumerera</span
              >
            </button>
          </form>
        </div>

        <ul role="list" class="mt-8 space-y-3 text-sm leading-6">
          <li
            v-for="feature in tier.features"
            :key="feature"
            class="flex gap-x-3"
          >
            <CheckIcon class="h-6 w-5 flex-none" aria-hidden="true" />
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/20/solid";
const user = useSupabaseUser();
const tiers = ref<Tier[]>([
  {
    id: "price_1PT8ZI2Mj8slfhWsDoMeO7AX",
    name: "Basic",
    description: "En bra start för att komma igång",
    features: ["Domän hantering", "NS/DNS för egen domän", "15 antal dagar"],

    amount: 0,
  },
  {
    id: "price_1PT8Z82Mj8slfhWsAwU4Eu5W",
    name: "Standard",
    description: "För dig som vill ha lite mer",
    features: [
      "Domän hantering",
      "NS/DNS för egen domän",
      "25 antal dagar",
      "Snapback",
      "Finns på Google",
      "Wayback Machine",
    ],
    amount: 200,
  },
  {
    id: "price_1PT8Yv2Mj8slfhWsr7TgCl7Q",
    name: "Premium",
    description: "För dig som vill ha allt",
    features: [
      "Domän hantering",
      "NS/DNS för egen domän",
      "30 antal dagar",
      "Snapback",
      "Finns på Google",
      "Wayback Machine",
      "DNS historik",
      "Ahref Data / Stats",
      "Moz Data?",
      "Whois historik",
      "Se potentiella utgående domäner",
    ],
    amount: 300,
  },
]);
type Tier = {
  id: string;
  name: string;
  description: string;
  features: string[];
  amount: number;
};
</script>
