<template>
  <div>
    <div id="prenumeration">
      <h4 class="pt-6 pb-2" id="Prenumeration">Prenumeration</h4>
      <div v-if="subscription" class="">
        <h3>{{ subscription.name }}</h3>
        <span class="text-lg">
          {{ subscription.plan?.amount && subscription.plan?.amount / 100 }}
          <span class="font-bold">
            kr/{{ subscription.plan?.interval === "month" ? "mån" : "år" }}
          </span>
        </span>
        <div>
          <div :key="index" class="pb-1">
            <span
              class="bg-yellow-500 bg-opacity-20 text-yellow-900 font-extrabold text-sm py-1 px-4 rounded-lg flex items-center justify-center w-fit m-auto"
              v-if="subscription.status == 'trialing'"
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
                Din Provperiod löper ut
                <span class="font-bold">
                  den
                  {{
                    convertUnixTimestampToSweDateAndMonth(
                      subscription.current_period_end
                    )
                  }}
                </span>
              </span>
            </span>

            <span
              class="updatesAt block my-3"
              v-if="!subscription.cancel_at_period_end"
            >
              Abonnemanget
              <b>förnyas</b> den:
              <br />
              <b class="text-sm">
                {{
                  convertUnixTimestampToSwedishDate(
                    subscription.current_period_end
                  )
                }}</b
              >

              <span class="text-xs block pt-2 max-w-xs m-auto"
                >(om du vill avsluta prenumerationen bör du gå in på
                Hantera-Prenumeration och då avbryta prenumerationen)</span
              >
            </span>

            <span
              class="endsAt block my-3"
              v-if="subscription.cancel_at_period_end"
            >
              Abonnemanget <b>avslutas</b> den:<br />

              <b class="text-sm">{{
                convertUnixTimestampToSwedishDate(subscription.cancel_at)
              }}</b>
            </span>
          </div>

          <form action="/api/stripe/createPortalSession" method="post">
            <input type="hidden" name="user_id" :value="user.id" />
            <button
              type="submit"
              href="#"
              aria-describedby="tier-hobby"
              class="btn btn-sm btn-neutral shadow-md my-2 rounded-full"
            >
              Hantera prenumeration
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  convertUnixTimestampToSwedishDate,
  convertUnixTimestampToSweDateAndMonth,
} from "../helpers/webhelper";
const user = useSupabaseUser();
const emit = defineEmits(["isPending"]);
defineProps(["subscription"]);
</script>
