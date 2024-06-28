<template>
  <section class="mt-10">
    <div class="max-w-2xl w-full">
      <div class="w-full text-center mb-7">
        <h3>Slutför registrering</h3>
      </div>

      <Form
        class="grid grid-cols-12 gap-4 max-w-2xl"
        @submit="onSubmit"
        v-slot="{ errors }"
        :validation-schema="schema"
      >
        <!-- Type Field -->
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

        <!-- Name Field -->
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

        <!-- Email Field -->
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

        <!-- Phone Field -->
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

        <!-- Organization Number Field -->
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

        <!-- PIN Field -->
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

        <!-- Address Field -->
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

        <!-- Postal Code Field -->
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

        <!-- City Field -->
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

        <!-- Country Field -->
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

        <!-- Invoice Email Field -->
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

        <!-- NameSRS ID Field -->
        <!-- <div class="col-span-3 flex justify-center items-center">NameSRS ID</div>
      <div class="col-span-9 relative max-w-xs">
        <Field
          name="namesrs_id"
          v-model="customer.namesrs_id"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="namesrs_id" class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg" />
      </div> -->

        <!-- Fortnox Customer Number Field -->
        <!-- <div class="col-span-3 flex justify-center items-center">
        Fortnox Customer Number
      </div>
      <div class="col-span-9 relative max-w-xs">
        <Field
          name="fortnox_customer_number"
          v-model="customer.fortnox_customer_number"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="fortnox_customer_number" class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg" />
      </div> -->

        <!-- Submit Button -->
        <div class="col-span-12 flex justify-center">
          <button type="submit" class="btn btn-primary mt-4">
            Slutför registrering
          </button>
        </div>
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const { notify } = useNotifier();
const accountCompleted = useState("accountCompleted");
const customer = ref({
  type: "Private",
  name: null,
  email: null,
  phone: null,
  organization_number: "",
  pin: "",
  address: null,
  postal_code: null,
  city: null,
  country: null,
  invoice_email: null,
  // namesrs_id: null,
  // fortnox_customer_number: null,
});

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

const schema = yup.object({
  type: yup
    .string()
    .required("Typ är obligatorisk")
    .oneOf(["Private", "Business"], "Invalid customer type"),
  name: yup.string().required("Namn är obligatoriskt"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Mejl är obligatoriskt"),
  phone: yup.string().required(),

  // organization_number: yup
  //   .string()
  //   .when("type", (type) =>
  //     ["Business", "Private"].includes(type as any)
  //       ? yup
  //           .string()
  //           .required("Organisationsnummer är obligatoriskt för företag")
  //       : yup.string().notRequired()
  //   ),
  // pin: yup
  //   .string()
  //   .when("type", (type) =>
  //     ["Business", "Private"].includes(type as any)
  //       ? yup.string().required("PIN är obligatoriskt för privatpersoner")
  //       : yup.string().notRequired()
  //   ),

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

  // organization_number: yup.string().when("type", {
  //   is: (val: any) => {
  //     //this will output undefined
  //     console.log(val === "Business");
  //     return val === "Business";
  //   },
  //   then: (s) => s.required(),
  //   otherwise: (s) => s.nullable(),
  // }),

  // pin: yup.string().when("type", {
  //   is: (val: any) => {
  //     //this will output undefined
  //     return val === "Private";
  //   },
  //   then: (s) => s.required(),
  //   otherwise: (s) => s.nullable(),
  // }),

  address: yup.string().required(),
  postal_code: yup.number().required(),
  city: yup.string().required(),
  country: yup.string().default("Sverige").required(),
  invoice_email: yup.string().email("Invalid email address").nullable(),
  // namesrs_id: yup.number().nullable(),
  // fortnox_customer_number: yup.number().nullable(),
});

async function onSubmit(values: any) {
  const client = useSupabaseClient();
  const user = useSupabaseUser();

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
