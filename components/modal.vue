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
              <div v-if="!loaded">
                <div class="flex items-center justify-center">
                  <span class="loading loading-spinner"></span>
                </div>
              </div>
              <div v-if="loaded">
                <div v-if="!isBooked">
                  <DialogTitle as="span" class="text-lg font-medium leading-6"
                    >Vill du boka <strong>{{ item.name }}</strong
                    >?
                  </DialogTitle>
                  <div class="bg-[#ba3742] text-red-100 rounded-lg p-3 mt-2">
                    <h4 class="mb-1 mt-0 text-lg">Tänk på</h4>
                    <ul class="list-disc ml-5 text-sm">
                      <li>Det är bindande att boka en domän</li>
                      <li>Domänen kan inte avbokas</li>
                      <li>Domänen kan inte bytas</li>
                      <li>Domänen kan inte återbetalas</li>
                      <li v-if="domainPrice">
                        Priset för domänen är
                        <span class="underline font-bold"
                          >{{ numberWithThousandSpace(domainPrice) }} kr</span
                        >
                      </li>
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
                        >Jag godkänner, och är införstående om våra
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
                </div>
                <div v-if="isBooked">
                  <DialogTitle as="span" class="text-lg font-medium leading-6"
                    >Tyvärr, <strong>{{ item.name }}</strong> är redan bokad
                  </DialogTitle>
                  <div class="mt-4">
                    <button
                      type="button"
                      focusable
                      class="inline-flex justify-center rounded-full border border-transparent text-white bg-[#5F2DA5] px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="close()"
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import type { CombinedDomainInfoModal } from "~/types/bardate_domains";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import type { Snapback_Order } from "~/types/snapback_orders";
import { calculateDomainPrice } from "~/helpers/webhelper";
const emit = defineEmits(["close"]);
const { notify } = useNotifier();
const props = defineProps<{
  isOpen: boolean;
  item: CombinedDomainInfoModal;
}>();
const client = useSupabaseWrapper();
const isBooked = ref(false);
const consent = ref(false);
const loaded = ref(false);
const domainPrice = ref<number | undefined>(undefined);

onMounted(() => {
  IsBooked(props.item.id).then((res) => {
    isBooked.value = res;
    loaded.value = true;
    if (!isBooked.value) {
      //prod
      // const release_at = calculateDaysUntilRelease(props.item.release_at);
      const price = calculateDomainPrice(props.item.days_until_release);
      domainPrice.value = price;
    }
  });
});

function close() {
  consent.value = false;
  emit("close");
}

async function IsBooked(id: bigint) {
  const supabasewrapper = useSupabaseWrapper();

  const { data } = await supabasewrapper
    .select<Snapback_Order[]>("snapback_orders", "*")
    .eq("domain_id", id);

  if (data && data.length > 0) {
    return true;
  }
  return false;
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
    price: domainPrice.value,
  } as unknown as Snapback_Order;

  const { error } = await client.insert("snapback_orders", snapbackorder);

  if (!error) {
    notify("Din domän är bokad! Tack för din bokning!");
    emit("close");
    return;
  }
};
</script>
