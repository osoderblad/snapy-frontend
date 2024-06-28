<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close()" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#181825] p-6 text-left align-middle shadow-xl transition-all border-2 border-[#6236A7] border-opacity-40"
            >
              <DialogTitle as="span" class="text-lg font-medium leading-6"
                >Vill du boka <strong>{{ item.name }}</strong
                >?
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm">
                  {{ item.info_created_at }}
                </p>
              </div>

              <div class="bg-[#ba3742] text-red-100 rounded-lg p-3">
                <h4 class="mb-1 mt-0 text-lg">Tänk på</h4>
                <ul class="list-disc ml-5 text-sm">
                  <li>Det är bindande att boka en domän</li>
                  <li>Domänen kan inte avbokas</li>
                  <li>Domänen kan inte bytas</li>
                  <li>Domänen kan inte återbetalas</li>
                </ul>
              </div>

              <div class="form-control w-fit my-2">
                <label class="label cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="consent"
                    class="checkbox mr-3"
                  />
                  <span class="label-text"
                    >Jag godkänner, och är införstående och våra
                    tjänstevillkor.</span
                  >
                </label>
              </div>
              <div class="mt-4">
                <button
                  type="button"
                  :disabled="!consent"
                  class="inline-flex justify-center rounded-full border border-transparent text-white bg-[#5F2DA5] px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="bookIt()"
                >
                  Ja, boka nu!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import type { CombinedDomainInfo } from "~/types/bardate_domains";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import type { Snapback_Order } from "~/types/snapback_orders";
const emit = defineEmits(["close"]);
const { notify } = useNotifier();
const props = defineProps<{
  isOpen: boolean;
  item: CombinedDomainInfo;
}>();
const client = useSupabaseWrapper();
const available = ref(false);
const consent = ref(false);

// CheckAvailability
// await CheckAvailability();

watch(
  () => props.isOpen,
  async (newValue) => {
    if (newValue && props.item) {
      await CheckAvailability();
    }
  }
);
async function CheckAvailability() {
  // Check if domain is available
  // If available, set available to true
  const client = useSupabaseWrapper();

  const data = await client
    .select<Snapback_Order[]>("snapback_orders", "*")
    .eq("domain_id", props.item.id);

  console.log(data);
  available.value = true;
}

function close() {
  consent.value = false;
  emit("close");
}
const bookIt = async () => {
  const user_id = await getCustomerIdByUserId();

  const snapbackorder = {
    customer_id: user_id,
    domain_id: props.item.id,
    domain_name: props.item.name,
    order_status: "Pending",
    order_time: new Date(),
    payment_status: "Pending",
    price: 1337,
  } as unknown as Snapback_Order;

  const res = client.insert("snapback_orders", snapbackorder);

  if (res !== null) {
    notify("Din domän är bokad! Tack för din bokning!");
    emit("close");
    return;
  }
};
</script>
