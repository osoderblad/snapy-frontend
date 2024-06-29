<template>
  <section>
    <div class="w-full">
      <div class="flex flex-wrap">
        <div
          class="hidden lg:w-[40%] lg:flex w-full private h-auto p-4 justify-center items-center"
        >
          <h2
            class="text-3xl bg-gradient-to-br from-orange-500 to-yellow-300 bg-clip-text text-transparent font-extrabold block"
          >
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

          <Form
            @submit="onSubmit"
            :validation-schema="schemaPrivate"
            class="flex flex-col"
          >
            <div class="w-full max-w-lg px-4 py-16">
              <div class="space-y-6">
                <div class="flex flex-col md:flex-row md:space-x-4">
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

                <div v-if="customer.type === 'Business'">
                  <FormField
                    name="organization_number"
                    label="Org.nr"
                    :modelValue="customer.organization_number"
                    @update:modelValue="
                      (value) => (customer.organization_number = value)
                    "
                  />
                </div>

                <div v-if="customer.type === 'Private'">
                  <FormField
                    name="pin"
                    label="Personnummer"
                    placeholder="ÅÅMMDD-XXXX"
                    mask="######-####"
                    :modelValue="customer.pin"
                    @update:modelValue="(value) => (customer.pin = value)"
                    :rules="{
                      required: true,
                      validate: validateAndExtractSwedishSSN,
                    }"
                  />
                </div>

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
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import { TabGroup, TabList, Tab } from "@headlessui/vue";
const { notify } = useNotifier();
const accountCompleted = useState("accountCompleted");
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
  const checkDigit = parseInt(match[5], 10); // Sista siffran är kontrollsiffran
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
    return { valid: false, message: "Invalid control digit" };
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
      console.log(result);
      //  customer.value. = result.gender;
      //  customer.value.birthYear = result.year;
      //  customer.value.birthMonth = result.month;
      //  customer.value.birthDay = result.day;
    } else {
      // Hantera ogiltigt personnummer
      console.error("Ogiltigt personnummer");
    }
  }
);

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

const ssnValidation = yup.string().test(
  "is-valid-ssn",
  "Ogiltigt personnummer", // Felmeddelande om valideringen misslyckas
  (value) => {
    const result = validateAndExtractSwedishSSN(value || "");
    return result.valid; // Returnerar true eller false beroende på valideringsresultatet
  }
);

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
  pin: ssnValidation.required("Personnummer är obligatoriskt"),
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
