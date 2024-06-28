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
            <p>{{ item.order_time }}</p>
            <p>{{ item.order_status }}</p>
            <p>{{ item.price }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <h3>
        Fullfölj registreringen på
        <NuxtLink to="/user/myaccount">Mitt konto</NuxtLink>
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
</script>
