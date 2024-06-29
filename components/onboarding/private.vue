<template>
  <Form
    @submit="onSubmitPrivate"
    :validation-schema="schemaPrivate"
    class="flex flex-col"
  >
    <div class="w-full max-w-lg px-4 py-16">
      <h4>Privatkund</h4>
      <div class="space-y-6">
        <div class="flex flex-col md:flex-row gap-4">
          <FormField
            name="firstName"
            label="Förnamn"
            :modelValue="customer.firstName"
            @update:modelValue="(value) => (customer.firstName = value)"
            rules="required"
            validateOn="blur"
          />
          <FormField
            name="lastName"
            label="Efternamn"
            :modelValue="customer.lastName"
            @update:modelValue="(value) => (customer.lastName = value)"
            rules="required"
            validateOn="blur"
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
        <FormField
          name="pin"
          label="Personnummer"
          placeholder="ÅÅMMDD-XXXX"
          mask="######-####"
          :modelValue="customer.pin"
          @update:modelValue="(value) => (customer.pin = value)"
        />
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

type PrivateCustomerPinInfo = {
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
} as PrivateCustomerPinInfo;
const privatePinInfo = ref<PrivateCustomerPinInfo>(newPrivateCustomer);

const customer = ref({
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
});
function validateAndExtractSwedishSSN(ssn: string) {
  const ssnPattern = /^(\d{2})(\d{2})(\d{2})-(\d{3})(\d)$/;
  const match = ssn.match(ssnPattern);

  if (!match) {
    return { valid: false, message: "Invalid format" };
  }

  // År, månad och dag extraheras
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  const individualNumbers = match[4];
  const genderDigit = parseInt(individualNumbers[2], 10); // Den näst sista siffran i individnumret

  // Skapa ett datum för att verifiera giltigheten
  const fullYear = year < 20 ? 2000 + year : 1900 + year;
  const date = new Date(fullYear, month - 1, day);
  if (
    date.getFullYear() !== fullYear ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return { valid: false, message: "Invalid date" };
  }

  // Könsbestämning baserad på den näst sista siffran i individnumret (udda för män, jämn för kvinnor)
  const gender = genderDigit % 2 === 0 ? "Woman" : "Man";

  // Använd Luhn-algoritmen för att verifiera kontrollsiffran
  if (!isValidLuhn(ssn.replace("-", ""))) {
    return { valid: false };
  }

  return { valid: true, gender, year: fullYear, month, day };
}

function isValidLuhn(number: string) {
  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    let digit = parseInt(number[number.length - 1 - i], 10);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

watch(
  () => customer.value.pin,
  (newVal) => {
    const result = validateAndExtractSwedishSSN(newVal);
    if (result.valid) {
      privatePinInfo.value = result;
    } else {
      // Hantera ogiltigt personnummer
      privatePinInfo.value = newPrivateCustomer;
      console.error("Ogiltigt personnummer");
    }
  }
);

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
  "Ogiltigt personnummer", // Felmeddelande om valideringen misslyckas
  (value) => {
    const result = validateAndExtractSwedishSSN(value || "");
    return result.valid; // Returnerar true eller false beroende på valideringsresultatet
  }
);

const schemaPrivate = yup.object({
  firstName: yup.string().required("Förnamn är obligatoriskt"),
  lastName: yup.string().required("Efternamn är obligatoriskt"),
  phone: yup.string().required(),
  pin: ssnValidation.required("Personnummer är obligatoriskt"),
  address: yup.string().required(),
  postal_code: yup.number().required(),
  city: yup.string().required(),
  country: yup.string().default("Sverige").required(),
});

async function onSubmitPrivate() {
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
    pin: cus.pin,
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
