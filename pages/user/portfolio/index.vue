<template>
  <section>
    <div v-if="accountCompleted">
      <div class="w-full m-auto">
        <div v-if="!loaded" class="w-full flex justify-center">
          <span class="loading loading-infinity loading-lg opacity-60"></span>
        </div>

        <div v-if="loaded && bookedDomains.length == 0">
          <h3>Inga domäner bokade ännu!</h3>
          <p>
            Det ser ut som att du inte har bokat några domäner ännu. Gå till
            <NuxtLink to="/user/domaner">Domäner</NuxtLink> för att boka en
            domän.
          </p>
        </div>

        <ul v-if="loaded && bookedDomains.length > 0">
          <h3>Bokade domäner</h3>
          <li
            class="w-full max-w-2xl px-4 my-3 py-3 bg-secondary/30 rounded-lg shadow-lg"
            v-for="item in bookedDomains"
          >
            <h4 class="mb-2">
              {{ item.domain_name }}
            </h4>

            <div class="flex gap-x-3 flex-wrap">
              <span v-if="item.order_time">
                <span class="text-xs"> Bokad:</span>
                {{ getBoughtDate(item.order_time) }}
              </span>
              <span
                ><span class="text-xs"> Status:</span>
                {{ item.order_status }}</span
              >
              <span><span class="text-xs"> Pris:</span> {{ item.price }}</span>
            </div>
          </li>
        </ul>

        <ul v-if="loaded && bookedDomains.length > 0" class="mt-16">
          <h3>Köpta domäner</h3>
          <li
            class="w-full max-w-2xl px-4 my-3 py-3 bg-secondary/30 rounded-lg shadow-lg"
            v-for="item in bookedDomains"
          >
            <h4 class="mb-2">
              {{ item.domain_name }}
            </h4>

            <div class="flex gap-x-3 flex-wrap">
              <span v-if="item.order_time">
                <span class="text-xs"> Köpt:</span>
                {{ getBoughtDate(item.order_time) }}
              </span>
              <span
                ><span class="text-xs"> Status:</span>
                {{ item.order_status }}</span
              >
              <span><span class="text-xs"> Pris:</span> {{ item.price }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <h3>
        Fullfölj registreringen på
        <NuxtLink to="/user/onboarding">Onboarding</NuxtLink>
      </h3>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Snapback_Order } from "~/types/snapback_orders";

const bookedDomains = ref<Snapback_Order[]>([]);
const loaded = ref(false);
const accountCompleted = useState("accountCompleted");

onMounted(async () => {
  const { data, error } = await getBookedDomains();

  if (!error) {
    loaded.value = true;
    bookedDomains.value = data;
  }
});

function getBoughtDate(date: string) {
  if (!date) return "";
  return date.split("T")[0];
}
</script>
