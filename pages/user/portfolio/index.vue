<template>
  <section>
    <div v-if="accountCompleted">
      <div class="w-full m-auto">
        <div v-if="!loaded" class="w-full flex justify-center">
          <span class="loading loading-infinity loading-lg opacity-60"></span>
        </div>

        <div v-if="loaded && bookedDomains && bookedDomains.length == 0">
          <h3>Inga domäner bokade ännu!</h3>
          <p>
            Det ser ut som att du inte har bokat några domäner ännu. Gå till
            <NuxtLink to="/user/domaner">Domäner</NuxtLink> för att boka en
            domän.
          </p>
        </div>

        <ul v-if="loaded && bookedDomains && bookedDomains.length > 0">
          <h2
            class="bg-gradient-to-br from-orange-500 to-yellow-300 bg-clip-text text-transparent font-bold"
          >
            Bokade domäner
          </h2>
          <div class="max-w-md">
            Vid utgånget datum för domän kommer vi att göra ett köp av domänen.
            Vid ett lyckat köp/registrering kommer domänen att flyttas till ditt
            konto.
          </div>

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
                ><span class="text-xs"> Pris:</span>
                {{ numberWithThousandSpace(item.price) }} kr</span
              >
            </div>
          </li>
        </ul>

        <ul
          v-if="loaded && completedDomains && completedDomains.length > 0"
          class="mt-16"
        >
          <h2
            class="bg-gradient-to-br from-orange-500 to-yellow-300 bg-clip-text text-transparent font-bold"
          >
            Köpta/Vunna domäner 🎉
          </h2>
          <div class="max-w-md">
            Här hittar du domäner som vi har köpt åt dig. Domäner som vi har
            köpt åt dig kommer att flyttas till ditt konto.
          </div>
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
              <span
                ><span class="text-xs"> Pris:</span>
                {{ numberWithThousandSpace(item.price) }} kr</span
              >
            </div>

            <div
              class="my-5 p-2 rounded-md max-w-md"
              :class="isPaid(item) ? 'bg-green-300/40' : 'bg-red-300/40'"
            >
              <h4 class="mb-0 nunito">
                Faktura <span class="italic text-md">xxx</span>
              </h4>
              <div v-if="isPaymentPending(item)">
                <span>Obetald</span>
              </div>
              <div v-if="isPaid(item)">
                <span>Betald</span>
              </div>
              <span
                class="btn btn-sm my-3"
                :class="isPaid(item) ? 'bg-opacity-80' : ''"
                >Ladda ner faktura
              </span>

              <span
                class="btn btn-sm my-3 ml-2 btn-ghost bg-[#1D2234]"
                v-if="isPaymentPending(item)"
                >Betala med Swish
              </span>

              <span
                class="btn btn-sm my-3 ml-2 btn-ghost bg-[#1D2234]"
                v-if="isPaid(item)"
                >Ladda ner Kvitto
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
const bookedDomains = ref<Snapback_Order[] | null>([]);
const completedDomains = ref<Snapback_Order[] | null>([]);
const { getBookedDomains, getCompletedDomains } = useDomains();
const loaded = ref(false);
const accountCompleted = useState("accountCompleted");

function isPaid(item: Snapback_Order) {
  return item.payment_status === "Paid";
}
function isPaymentPending(item: Snapback_Order) {
  return item.payment_status === "Pending";
}

onMounted(async () => {
  const { data: bookedData, error: bookedError } = await getBookedDomains();
  const { data: completedData, error: completedError } =
    await getCompletedDomains();

  if (!bookedError) {
    bookedDomains.value = bookedData;
  }
  if (!completedError) {
    completedDomains.value = completedData;
  }

  loaded.value = true;
});

function getDate(date: string) {
  if (!date) return "";
  return date.split("T")[0];
}
</script>
