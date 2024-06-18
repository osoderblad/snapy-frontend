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
      <div class="mt-16 flex justify-center">
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
      </div>
      <div
        class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4"
      >
        <div
          v-for="tier in pricing.tiers"
          :key="tier.id"
          :class="[
            tier.mostPopular
              ? 'ring-2 ring-indigo-600'
              : 'ring-1 ring-gray-200',
            'rounded-3xl p-8',
          ]"
        >
          <h2
            :id="tier.id"
            :class="[
              tier.mostPopular ? '' : '',
              'text-lg font-semibold leading-8',
            ]"
          >
            {{ tier.name }}
          </h2>
          <p class="mt-4 text-sm leading-6">
            {{ tier.description }}
          </p>
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-4xl font-bold tracking-tight">{{
              tier.price[frequency.value]
            }}</span>
            <span class="text-sm font-semibold leading-6">{{
              frequency.priceSuffix
            }}</span>
          </p>
          <a
            :href="tier.href"
            :aria-describedby="tier.id"
            :class="[
              tier.mostPopular
                ? 'bg-indigo-600 shadow-sm hover:bg-indigo-500'
                : ' ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
              'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            ]"
            >Buy plan</a
          >
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

<script setup>
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  RadioGroup,
  RadioGroupOption,
} from "@headlessui/vue";
import {
  Bars3Icon,
  MinusSmallIcon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { CheckIcon } from "@heroicons/vue/20/solid";
const client = useSupabaseClient();
const user = useSupabaseUser();
const isSubbed = ref(false);

const pricing = {
  frequencies: [
    { value: "monthly", label: "Monthly", priceSuffix: "/month" },
    { value: "annually", label: "Annually", priceSuffix: "/year" },
  ],
  tiers: [
    {
      name: "Hobby",
      id: "tier-hobby",
      href: "#",
      price: { monthly: "$15", annually: "$144" },
      description: "The essentials to provide your best work for clients.",
      features: ["5 products", "Up to 1,000 subscribers", "Basic analytics"],
      mostPopular: false,
    },
    {
      name: "Freelancer",
      id: "tier-freelancer",
      href: "#",
      price: { monthly: "$30", annually: "$288" },
      description: "The essentials to provide your best work for clients.",
      features: [
        "5 products",
        "Up to 1,000 subscribers",
        "Basic analytics",
        "48-hour support response time",
      ],
      mostPopular: false,
    },
    {
      name: "Startup",
      id: "tier-startup",
      href: "#",
      price: { monthly: "$60", annually: "$576" },
      description: "A plan that scales with your rapidly growing business.",
      features: [
        "25 products",
        "Up to 10,000 subscribers",
        "Advanced analytics",
        "24-hour support response time",
        "Marketing automations",
      ],
      mostPopular: true,
    },
    {
      name: "Enterprise",
      id: "tier-enterprise",
      href: "#",
      price: { monthly: "$90", annually: "$864" },
      description: "Dedicated support and infrastructure for your company.",
      features: [
        "Unlimited products",
        "Unlimited subscribers",
        "Advanced analytics",
        "1-hour, dedicated support response time",
        "Marketing automations",
        "Custom reporting tools",
      ],
      mostPopular: false,
    },
  ],
};

const frequency = ref(pricing.frequencies[0]);
</script>
