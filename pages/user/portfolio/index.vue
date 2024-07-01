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
          <h2
            class="bg-gradient-to-br from-orange-500 to-yellow-300 bg-clip-text text-transparent font-bold"
          >
            Bokade domäner
          </h2>
          <li
            class="w-full max-w-2xl px-4 my-3 py-3 bg-indigo-400/30 rounded-lg shadow-lg"
            v-for="item in bookedDomains"
          >
            <h3 class="mb-2">
              {{ item.domain_name }}
            </h3>

            <div class="flex gap-x-3 flex-wrap">
              <span v-if="item.order_time">
                <span class="text-xs"> Bokad:</span>
                {{ getDate(item.order_time) }}
              </span>
              <span
                ><span class="text-xs"> Pris:</span> {{ item.price }} kr</span
              >
            </div>
          </li>
        </ul>

        <ul v-if="loaded && completedDomains.length > 0" class="mt-16">
          <h2
            class="bg-gradient-to-br from-orange-500 to-yellow-300 bg-clip-text text-transparent font-bold"
          >
            Köpta/Vunna domäner 🎉
          </h2>
          <li
            class="w-full max-w-2xl px-4 my-3 py-3 bg-fuchsia-400/30 rounded-lg shadow-lg"
            v-for="item in completedDomains"
          >
            <h3 class="mb-2">
              {{ item.domain_name }}
            </h3>

            <div class="flex gap-x-3 flex-wrap">
              <span v-if="item.order_time">
                <span class="text-xs"> Köpt:</span>
                {{ getDate(item.order_time) }}
              </span>
              <!-- <span
                ><span class="text-xs"> Status:</span>
                {{ item.order_status }}</span
              > -->
              <span
                ><span class="text-xs"> Pris:</span> {{ item.price }} kr</span
              >
            </div>

            <div class="my-5">
              <h4 class="mb-0 nunito">
                Faktura <span class="italic text-md">xxx</span>
              </h4>

              <div v-if="item.payment_status === 'Pending'">
                <span
                  class="bg-red-200 text-red-800 text-sm p-2 rounded-md font-bold my-2 block w-fit"
                  >Obetald</span
                >
              </div>

              <div v-if="item.payment_status === 'Paid'">
                <span
                  class="bg-green-200 text-green-800 text-sm p-2 rounded-md font-bold my-2 block w-fit"
                  >Betald</span
                >
              </div>

              <span
                class="btn btn-sm my-3"
                :class="item.payment_status === 'Paid' ? 'bg-opacity-80' : ''"
                >Ladda ner faktura
              </span>
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
const { getBookedDomains, getCompletedDomains } = useDomains();
const completedDomains = ref<Snapback_Order[]>([]);
const loaded = ref(false);
const accountCompleted = useState("accountCompleted");

onMounted(async () => {
  const { data, error } = await getBookedDomains();
  const { data: domains } = await getCompletedDomains();

  if (!error) {
    loaded.value = true;
    bookedDomains.value = data;
    completedDomains.value = domains;
  }
});

function getDate(date: string) {
  if (!date) return "";
  return date.split("T")[0];
}
</script>
