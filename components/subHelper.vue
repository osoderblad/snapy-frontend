<template>
  <div class="text-sm max-w-md">
    <div id="prenumeration">
      <div class="text-center my-2">
        <h3>{{ sub.name }}</h3>
        <span class="text-lg">
          {{ sub.plan?.amount && sub.plan?.amount / 100 }}
          <span class="font-bold">
            kr/{{ sub.plan?.interval === "month" ? "månad" : "år" }}
          </span>
        </span>
      </div>

      <div class="text-center">
        <span
          class="bg-yellow-500 bg-opacity-20 text-white font-extrabold text-sm py-1 px-4 rounded-lg flex items-center justify-center w-fit m-auto"
          v-if="isTrialing()"
        >
          <span class="mr-2">
            <svg
              aria-hidden="true"
              class="fill-yellow-600"
              height="12"
              width="12"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm1-8.577V4a1 1 0 1 0-2 0v4a1 1 0 0 0 .517.876l2.581 1.49a1 1 0 0 0 1-1.732z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span>
            yourTrialPeriodExpires
            <span class="font-bold">
              den
              {{
                convertUnixTimestampToSweDateAndMonth(sub?.current_period_end)
              }}
            </span>
          </span>
        </span>

        <span class="updatesAt block" v-if="!sub?.cancel_at_period_end">
          Prenumerationen
          <b class="text-lg text-[#abfc9b]">förnyas:</b>
          <br />
          <b>
            {{ convertUnixTimestampToSwedishDate(sub?.current_period_end) }}
          </b>
        </span>

        <span class="endsAt block" v-if="sub?.cancel_at_period_end">
          Prenumerationen
          <b class="text-lg text-[#fc9b9b]">upphör:</b>
          den
          <br />
          <b class="text-sm">
            {{ convertUnixTimestampToSwedishDate(sub.cancel_at) }}
          </b>
        </span>

        <span
          :class="[
            isBusy ? 'opacity-55 pointer-events-none' : 'bg-opacity-100',
            !sub?.cancel_at_period_end
              ? 'btn-error bg-[#e9343e]  text-white'
              : 'btn-success bg-[#25a335]  text-white',
          ]"
          class="btn btn-md border-none my-2"
          @click="subOrUnsub()"
        >
          <template v-if="!sub?.cancel_at_period_end">
            Avbryt prenumeration
          </template>
          <template v-else>Förnya prenumeration</template>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  convertUnixTimestampToSwedishDate,
  convertUnixTimestampToSweDateAndMonth,
  postToApi,
} from "../helpers/webhelper";
import {
  enterMaxHeight,
  leaveMaxHeight,
  beforeEnterMaxHeight,
} from "../helpers/transitionHelpers";
const emit = defineEmits(["isPending"]);
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/20/solid";
import type { SubscriptionDetails } from "~/helpers/supabasehelper";

const props = defineProps({
  subscription: Object as PropType<SubscriptionDetails>,
});
const { notify } = useNotifier();
const sub = ref<SubscriptionDetails>(props.subscription!);
const isBusy = ref(false);

function isTrialing() {
  return sub.value?.status == "trialing";
}

function subClasses() {
  if (!sub.value?.cancel_at_period_end) {
    return "background-color:rgb(37 163 53 / 20%);";
  } else if (isTrialing()) {
    return "background-color:rgb(234 179 8 / 20%);";
  }
  return "background-color:rgb(233 52 62 / 20%); ";
}

function subOrUnsub() {
  if (!sub.value?.cancel_at_period_end) {
    unsubscribe();
    return;
  }

  renewsubscription();
}

async function unsubscribe() {
  if (!props.subscription?.id) {
    return;
  }

  isBusy.value = true;
  const { data, error } = await postToApi("unsubscribe", {
    subscriptionId: props.subscription.id,
  });

  if (error) {
    // notify user
    notify("error unsubscribe", "danger");
    isBusy.value = false;
    return;
  }

  if (data) {
    sub.value = convertStripeSubscriptionToSubscriptionDetails(data);
    // notify user
    notify("Du har avslutat din prenumeration", "warning");
  }
  isBusy.value = false;
}

async function renewsubscription() {
  if (!props.subscription?.id) {
    return;
  }
  isBusy.value = true;
  const { data, error } = await postToApi("renewsubscription", {
    subscriptionId: props.subscription.id,
  });

  if (error) {
    // notify user
    notify("Fel vid förnyelse av prenumeration", "danger");
    isBusy.value = false;
    return;
  }

  if (data) {
    // notify
    notify("Du har förnyat din prenumeration");
    sub.value = convertStripeSubscriptionToSubscriptionDetails(data);
  }
  isBusy.value = false;
}
</script>
