<template>
  <section>
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
      <!-- <div class="mt-16 flex justify-center">
        <fieldset aria-label="Payment frequency">
          <RadioGroup
            v-model="frequency"
            class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroupOption
              as="template"
              v-for="option in pricing.frequencies"
              :key="option.value"
              :value="option"
              v-slot="{ checked }"
            >
              <div
                :class="[
                  checked ? 'bg-indigo-600 text-white' : 'text-gray-50',
                  'cursor-pointer rounded-full px-2.5 py-1',
                ]"
              >
                {{ option.label }}
              </div>
            </RadioGroupOption>
          </RadioGroup>
        </fieldset>
      </div> -->
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
            <span class="text-sm font-semibold leading-6">{{ "sek" }}</span>
          </p>

          <div>
            <form action="/api/subscribe" method="post" v-if="user">
              <input type="hidden" name="customer_id" :value="user?.id" />
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

    <!-- 
    <div>
      <form action="/api/subscribe" method="post" v-if="user">
        <input type="hidden" name="customer_id" :value="user?.id" />
        <input type="hidden" name="price_id" :value="price.id" />
        <input type="hidden" name="canUseTrial" :value="false" />
        <button
          type="submit"
          href="#"
          aria-describedby="tier-hobby"
          class="btn btn-accent"
        >
          <span class="text-sm">{{ $t("subscribe") }}</span>
        </button>
      </form>
    </div>  -->
  </section>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/20/solid";
const user = useSupabaseUser();
const tiers = ref<Tier[]>([
  {
    id: "price_1PT8ZI2Mj8slfhWsDoMeO7AX",
    name: "Basic",
    description: "En bra start för att komma igång",
    features: ["Funktion 1", "Funktion 2", "Funktion 3"],
    amount: 0,
  },
  {
    id: "price_1PT8Z82Mj8slfhWsAwU4Eu5W",
    name: "Standard",
    description: "För dig som vill ha lite mer",
    features: ["Funktion 1", "Funktion 2", "Funktion 3"],
    amount: 200,
  },
  {
    id: "price_1PT8Yv2Mj8slfhWsr7TgCl7Q",
    name: "Premium",
    description: "För dig som vill ha allt",
    features: ["Funktion 1", "Funktion 2", "Funktion 3"],
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

const prices = ref([]);

onMounted(async () => {
  // const res = await getStripeProducts();
  // const pricePromises = res.data.map(async (product) => {
  //   const price = (await getPrice(product.id)) as Stripe.Price;
  //   if (price?.unit_amount == null) return;
  //   const unit_amount = price.unit_amount / 100;
  //   return { id: product.id, price: unit_amount, priceId: price.id }; // Förbered data som ett objekt med id och price
  // });
  // const priceResults = await Promise.all(pricePromises);
  // // Omvandla lista av resultat till ett objekt där nyckeln är id och värdet är priset
  // prices.value = priceResults.reduce((acc, current) => {
  //   acc[current.id] = { price: current?.price, priceId: current?.priceId }; // Tilldela varje pris till rätt ID
  //   return acc;
  // }, {});
  // tiers.value = res.data; // Direkt tilldelning till tiers
});
// const pricing = {
//   frequencies: [
//     { value: "monthly", label: "Månad", priceSuffix: "/månad" },
//     { value: "annually", label: "År", priceSuffix: "/år" },
//   ],
// };
// async function getPrice(prodId: string) {
//   const prices = await getStripePricesByProd(prodId);
//   if (prices.length === 0 && prices[0].unit_amount) return null;

//   //@ts-ignore
//   return prices[0];
// }

// const frequency = ref(pricing.frequencies[0]);
</script>
