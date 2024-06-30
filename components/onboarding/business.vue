<template>
  <Form
    @submit="onSubmitBusiness"
    :validation-schema="schemaPrivate"
    class="flex flex-col"
  >
    <div class="w-full max-w-lg px-4 py-10">
      <h4>Företagskund</h4>
      <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:space-x-4">
          <FormField
            name="firstName"
            label="Förnamn"
            :modelValue="customer.firstName"
            @update:modelValue="(value) => (customer.firstName = value)"
            rules="required"
          />
          <FormField
            name="lastName"
            label="Efternamn"
            :modelValue="customer.lastName"
            @update:modelValue="(value) => (customer.lastName = value)"
            rules="required"
          />
        </div>

        <FormField
          name="phone"
          label="Telefonnummer"
          :modelValue="customer.phone"
          @update:modelValue="(value) => (customer.phone = value)"
        />

        <div class="flex flex-col md:flex-row gap-4">
          <FormField
            name="address"
            label="Adress"
            :modelValue="customer.address"
            @update:modelValue="(value) => (customer.address = value)"
          />
          <FormField
            name="postal_code"
            label="Postnummer"
            :modelValue="customer.postal_code"
            @update:modelValue="(value) => (customer.postal_code = value)"
          />
        </div>
        <div class="flex flex-col md:flex-row gap-4">
          <FormField
            name="city"
            label="Stad"
            :modelValue="customer.city"
            @update:modelValue="(value) => (customer.city = value)"
          />
          <FormField
            name="country"
            label="Land"
            :modelValue="'Sverige'"
            disabled
          />
        </div>

        <div class="flex flex-col md:flex-row md:space-x-4">
          <FormField
            name="business_name"
            label="Företagsnamn"
            :modelValue="customer.name"
            @update:modelValue="(value) => (customer.name = value)"
          />
          <!-- mask="######-####" -->
          <div>
            <FormField
              name="organization_number"
              label="Organisationsnummer"
              placeholder="xxxxxx-xxxx"
              mask="######-####"
              :modelValue="customer.organization_number"
              @update:modelValue="
                (value) => (customer.organization_number = value)
              "
            />
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-4">Submit</button>
  </Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import * as yup from "yup";
import type { Customer } from "~/types/customer";
const { notify } = useNotifier();
const accountCompleted = useState("accountCompleted");

const lastCheckedOrgNumber = ref({ val: "", valid: false });

type BusinessCustomerPinInfo = {
  valid: boolean;
  gender?: string;
  year?: number;
  month?: number;
  day?: number;
};

const newPrivateCustomer = {
  gender: "",
  year: 0,
  month: 0,
  day: 0,
  valid: false,
} as BusinessCustomerPinInfo;
const privatePinInfo = ref<BusinessCustomerPinInfo>(newPrivateCustomer);

const customer = ref({
  type: "Business",
  firstName: "",
  lastName: "",
  name: "",
  email: "",
  phone: "",
  organization_number: "",
  address: "",
  postal_code: "",
  city: "",
  country: "Sverige",
  invoice_email: "",
});
async function validateOrgNumber(orgNumber: string) {
  const res = await $fetch(`/api/checkOrg?orgNumber=${orgNumber}`);
  return res;
}

// watch(
//   () => customer.value.organization_number,
//   (newVal) => {
//     const result = validateOrgNumber(newVal);
//     //@ts-ignore
//     if (result.valid) {
//       //@ts-ignore
//       privatePinInfo.value = result;
//     } else {
//       // Hantera ogiltigt personnummer
//       privatePinInfo.value = newPrivateCustomer;
//       console.error("Ogiltigt personnummer");
//     }
//   }
// );

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

const ssnValidation = yup.string().test(
  "is-valid-ssn",
  "Ogiltigt Organisationsnummer", // Felmeddelande om valideringen misslyckas
  async (value) => {
    if (!value) return false;
    value = value.replace("-", "");
    if (value.length === 10) {
      if (value === lastCheckedOrgNumber.value.val) {
        return lastCheckedOrgNumber.value.valid;
      }

      const result = await validateOrgNumber(value);

      lastCheckedOrgNumber.value.val = value;
      lastCheckedOrgNumber.value.valid = result?.valid || false;

      if (result?.valid) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
);

const schemaPrivate = yup.object({
  firstName: yup.string().required("Förnamn är obligatoriskt"),
  lastName: yup.string().required("Efternamn är obligatoriskt"),
  name: yup.string().required("Namn är obligatoriskt"),
  phone: yup.string().required(),
  organization_number: ssnValidation.required(
    "Organisationsnummer är obligatoriskt"
  ),
  address: yup.string().required(),
  postal_code: yup.number().required(),
  city: yup.string().required(),
  country: yup.string().default("Sverige").required(),
});

async function onSubmitBusiness() {
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const { userProfile, customerr } = mapCustomerToValuesPrivate(
    user.value?.email || ""
  );

  var { data, error } = await client
    //@ts-ignore
    .schema("public")
    .from("customers")
    .insert(customerr)
    .select("customer_id")
    .single();

  if (data) {
    try {
      // update user profile table
      var { data: up, error } = await client
        //@ts-ignore
        .schema("public")
        .from("user_profiles")
        .update(userProfile)
        .match({ id: user.value?.id });
    } catch (error) {
      console.error(error);
    }

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

type UserProfilesDto = {
  pin: string;
  first_name: string;
  last_name: string;
  birth_year: string;
  birth_month: string;
  email: string;
  birth_day: string;
  gender: "M" | "F";
  additional_info: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  country: string; // Default value: 'Sverige'
};

function mapCustomerToValuesPrivate(email: string) {
  const cus = customer.value;

  // update user profile
  const userProfile = {
    // pin: cus.pin,
    organization_number: cus.organization_number,
    first_name: cus.firstName,
    last_name: cus.lastName,
    birth_year: privatePinInfo.value.year,
    birth_month: privatePinInfo.value.month,
    birth_day: privatePinInfo.value.day,
    gender: privatePinInfo.value.gender === "Man" ? "M" : "F",
    additional_info: "",
    phone: cus.phone,
    address: cus.address,
    city: cus.city,
    postal_code: cus.postal_code,
    country: cus.country,
  } as unknown as UserProfilesDto;

  const customerr = {
    type: cus.type,
    name: `${cus.firstName} ${cus.lastName}`,
    email: email,
    phone: cus.phone,
    organization_number: cus.organization_number,
    pin: cus.pin,
    address: cus.address,
    postal_code: cus.postal_code,
    city: cus.city,
    country: cus.country,
  } as unknown as Customer;
  return { userProfile, customerr };
}
</script>
