<!-- 
      <Form
        class="grid grid-cols-12 gap-4 max-w-2xl private"
        @submit="onSubmit"
        :validation-schema="schema"
      >

        <div class="col-span-3 flex justify-center items-center">Typ</div>
        <div class="col-span-9 relative max-w-xs">
          <Field
            name="type"
            as="select"
            v-model="customer.type"
            class="select select-bordered w-full max-w-xs"
            rules="required|oneOf:private,business"
            validateOn="blur"
          >
            <option disabled value="">Välj en typ</option>
            <option value="Private">Privat</option>
            <option value="Business">Företag</option>
          </Field>
          <ErrorMessage
            name="type"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>

        <div class="col-span-3 flex justify-center items-center">Namn</div>
        <div class="col-span-9 relative max-w-xs">
          <Field
            name="name"
            v-model="customer.name"
            class="p-5 input input-neutral bg-opacity-65 w-full border-neutral"
            rules="required"
            validateOn="blur"
          />
          <ErrorMessage
            name="name"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>

        <div class="col-span-3 flex justify-center items-center">Mejl</div>
        <div class="col-span-9 relative max-w-xs">
          <Field
            name="email"
            type="email"
            v-model="customer.email"
            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
            rules="required|email"
            validateOn="blur"
          />
          <ErrorMessage
            name="email"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>

        <div class="col-span-3 flex justify-center items-center">
          Telefonummer
        </div>
        <div class="col-span-9 relative max-w-xs">
          <Field
            name="phone"
            v-model="customer.phone"
            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
            validateOn="blur"
          />
          <ErrorMessage
            name="phone"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>

        <div
          v-if="customer.type == 'Business'"
          class="col-span-3 flex justify-center items-center"
        >
          Organization Number
        </div>
        <div
          v-if="customer.type == 'Business'"
          class="col-span-9 relative max-w-xs"
        >
          <Field
            name="organization_number"
            v-model="customer.organization_number"
            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
          />
          <ErrorMessage
            name="organization_number"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>

        <div
          v-show="customer.type == 'Private'"
          class="col-span-3 flex justify-center items-center"
        >
          Personnummer
        </div>
        <div
          v-show="customer.type == 'Private'"
          class="col-span-9 relative max-w-xs"
        >
          <Field
            name="pin"
            v-model="customer.pin"
            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
          />
          <ErrorMessage
            name="pin"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>

        <div class="col-span-3 flex justify-center items-center">Adress</div>
        <div class="col-span-9 relative max-w-xs">
          <Field
            name="address"
            v-model="customer.address"
            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
          />
          <ErrorMessage
            name="address"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>

        <div class="col-span-3 flex justify-center items-center">Postkod</div>
        <div class="col-span-9 relative max-w-xs">
          <Field
            name="postal_code"
            v-model="customer.postal_code"
            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
          />
          <ErrorMessage
            name="postal_code"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>

        <div class="col-span-3 flex justify-center items-center">Stad</div>
        <div class="col-span-9 relative max-w-xs">
          <Field
            name="city"
            v-model="customer.city"
            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
          />
          <ErrorMessage
            name="city"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>

        <div class="col-span-3 flex justify-center items-center">Land</div>
        <div class="col-span-9 relative max-w-xs">
          <Field
            name="country"
            v-model="customer.country"
            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
          />
          <ErrorMessage
            name="country"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>

        <div class="col-span-12">
          <div class="divider">Frivilliga fält</div>
        </div>

        <div class="col-span-3 flex justify-center items-center">
          Faktura Mejl
        </div>
        <div class="col-span-9 relative max-w-xs">
          <Field
            name="invoice_email"
            type="email"
            v-model="customer.invoice_email"
            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
          />
          <ErrorMessage
            name="invoice_email"
            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
          />
        </div>
        <div class="col-span-12 flex justify-center">
          <button type="submit" class="btn btn-primary mt-4">
            Slutför registrering
          </button>
        </div>
      </Form> -->

<template>
  <section>
    <div class="w-full">
      <!-- <div class="w-full text-center mb-7">
        <h3>Slutför registrering</h3>
      </div> -->

      <div class="flex flex-wrap">
        <div
          class="hidden lg:w-[40%] lg:flex w-full private h-auto p-4 justify-center items-center"
        >
          <h2 class="text-3xl">
            Låt oss konfigurera ditt nya glänsande konto ✨
          </h2>
        </div>

        <div
          class="lg:w-[60%] w-full private h-auto p-4 justify-center items-start"
        >
          <h3 class="w-full">Berätta för oss om dig själv</h3>
          <TabGroup>
            <TabList
              class="flex space-x-1 rounded-xl bg-blue-900/20 p-1 max-w-md"
            >
              <Tab
                as="template"
                v-slot="{ selected }"
                @click="chooseType('Private')"
              >
                <span
                  :class="[
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                  ]"
                >
                  Privatperson
                </span>
              </Tab>
              <Tab
                as="template"
                v-slot="{ selected }"
                @click="chooseType('Business')"
              >
                <span
                  :class="[
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                  ]"
                >
                  Företag
                </span>
              </Tab>
            </TabList>
          </TabGroup>

          <Form @submit="onSubmit" :validation-schema="schemaPrivate">
            <div class="relative">
              <div key="1" v-if="step === 1">
                <h3 class="text-xl text-gray-300 absolute right-0">
                  steg 1/<span class="text-gray-500">3</span>
                </h3>

                <div class="w-full max-w-md px-2 py-16 sm:px-0">
                  <div class="py-10">
                    <div class="flex gap-3">
                      <div class="relative max-w-xs">
                        <div
                          class="col-span-3 flex justify-center items-center"
                        >
                          Förnamn
                        </div>
                        <div class="col-span-9 relative max-w-xs">
                          <Field
                            name="firstName"
                            v-model="customer.firstName"
                            class="p-5 input input-neutral bg-opacity-65 w-full border-neutral"
                            rules="required"
                            validateOn="blur"
                          />
                          <ErrorMessage
                            name="firstName"
                            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
                          />
                        </div>
                      </div>

                      <div class="relative max-w-xs">
                        <div
                          class="col-span-3 flex justify-center items-center"
                        >
                          Efternamn
                        </div>
                        <div class="col-span-9 relative max-w-xs">
                          <Field
                            name="lastName"
                            v-model="customer.lastName"
                            class="p-5 input input-neutral bg-opacity-65 w-full border-neutral"
                            rules="required"
                            validateOn="blur"
                          />
                          <ErrorMessage
                            name="lastName"
                            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="relative max-w-xs mt-3">
                      <div class="col-span-3 flex justify-center items-center">
                        Telefonummer
                      </div>
                      <div class="col-span-9 relative max-w-xs">
                        <Field
                          name="phone"
                          v-model="customer.phone"
                          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
                          validateOn="blur"
                        />
                        <ErrorMessage
                          name="phone"
                          class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
                        />
                      </div>
                    </div>

                    <div
                      v-if="customer.type == 'Business'"
                      class="col-span-3 flex justify-center items-center"
                    >
                      Org.nmr
                    </div>
                    <div
                      v-if="customer.type == 'Business'"
                      class="col-span-9 relative max-w-xs"
                    >
                      <Field
                        name="organization_number"
                        v-model="customer.organization_number"
                        class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
                      />
                      <ErrorMessage
                        name="organization_number"
                        class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
                      />
                    </div>

                    <div
                      v-show="customer.type == 'Private'"
                      class="col-span-3 flex justify-center items-center"
                    >
                      Personnummer
                    </div>
                    <div
                      v-show="customer.type == 'Private'"
                      class="col-span-9 relative max-w-xs"
                    >
                      <Field
                        name="pin"
                        v-model="customer.pin"
                        class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
                      />
                      <ErrorMessage
                        name="pin"
                        class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
                      />
                    </div>

                    <div class="col-span-3 flex justify-center items-center">
                      Adress
                    </div>
                    <div class="col-span-9 relative max-w-xs">
                      <Field
                        name="address"
                        v-model="customer.address"
                        class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
                      />
                      <ErrorMessage
                        name="address"
                        class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
                      />
                    </div>

                    <div class="flex gap-3">
                      <div class="relative max-w-xs">
                        <div
                          class="col-span-3 flex justify-center items-center"
                        >
                          Postnummer
                        </div>
                        <div class="col-span-9 relative max-w-xs">
                          <Field
                            name="postal_code"
                            v-model="customer.postal_code"
                            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
                          />
                          <ErrorMessage
                            name="postal_code"
                            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
                          />
                        </div>
                      </div>

                      <div class="relative max-w-xs">
                        <div
                          class="col-span-3 flex justify-center items-center"
                        >
                          Stad
                        </div>
                        <div class="col-span-9 relative max-w-xs">
                          <Field
                            name="city"
                            v-model="customer.city"
                            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
                          />
                          <ErrorMessage
                            name="city"
                            class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-span-3 flex justify-center items-center">
                      Land
                    </div>
                    <div class="col-span-9 relative max-w-xs">
                      <Field
                        name="country"
                        disabled
                        v-model="customer.country"
                        class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
                      />
                      <ErrorMessage
                        name="country"
                        class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div key="2" v-if="step === 2">
                <h3 class="text-xl text-gray-300 absolute right-0">
                  steg 2/<span class="text-gray-500">3</span>
                </h3>

                <span class="btn btn-sm btn-ghost mr-2" @click="step = 1"
                  >Tillbaka</span
                >
                <span class="btn btn-sm btn-accent" @click="step = 3"
                  >Nästa steg</span
                >
              </div>
              <div key="3" v-if="step === 3">
                <h3 class="text-xl text-gray-300 absolute right-0">
                  steg 3/<span class="text-gray-500">3</span>
                </h3>
                <span class="btn btn-sm btn-ghost mr-2" @click="step = 2"
                  >Tillbaka</span
                >
                <span class="btn btn-sm btn-accent">Slutför</span>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const { notify } = useNotifier();
const accountCompleted = useState("accountCompleted");

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const step = ref<number>(1);

const customer = ref({
  // customer_id: null,
  type: "Private",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization_number: "",
  pin: "",
  address: "",
  postal_code: "",
  city: "",
  country: "Sverige",
  invoice_email: "",
  // namesrs_id: null,
  // fortnox_customer_number: null,
});

function chooseType(type: string) {
  customer.value.type = type;
  // step.value = 2;
}

onMounted(() => {
  if (accountCompleted.value) {
    navigateTo("/");
  }
});

watch(accountCompleted, (value) => {
  if (value === true) {
    navigateTo("/");
  }
});

const schemaPrivate = yup.object({
  type: yup
    .string()
    .required("Typ är obligatorisk")
    .oneOf(["Private", "Business"], "Invalid customer type"),
  firstName: yup.string().required("Förnamn är obligatoriskt"),
  lastName: yup.string().required("Efternamn är obligatoriskt"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Mejl är obligatoriskt"),
  phone: yup.string().required(),

  organization_number: yup
    .string()
    .when("type", (type) =>
      type.includes("Business")
        ? yup.string().required()
        : yup.string().nullable().notRequired()
    ),
  pin: yup
    .string()
    .when("type", (type) =>
      type.includes("Private")
        ? yup.string().required()
        : yup.string().nullable().notRequired()
    ),

  address: yup.string().required(),
  postal_code: yup.number().required(),
  city: yup.string().required(),
  country: yup.string().default("Sverige").required(),
  invoice_email: yup.string().email("Invalid email address").nullable(),
});

async function onSubmit(values: any) {
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  // if type is private, remove organization number
  if (values.type === "Private") {
    delete values.organization_number;
  }
  // if type is business, remove pin
  if (values.type === "Business") {
    delete values.pin;
  }

  var { data, error } = await client
    //@ts-ignore
    .schema("public")
    .from("customers")
    .insert(values)
    .select("customer_id")
    .single();

  console.log(data);
  if (data) {
    // lägg till koppling till customers_users tabellen

    if (user && user.value) {
      var { data: cu, error } = await client
        //@ts-ignore
        .schema("public")
        .from("customer_users")
        .insert({ customer_id: data.customer_id, user_id: user.value.id });

      if (!error) {
        accountCompleted.value = true;
        navigateTo("/");
        notify("Kund skapad");
      }
    }
  }
}
</script>
