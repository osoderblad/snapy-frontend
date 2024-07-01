<template>
  <section>
    <div class="w-full m-auto">
      <h3>Mitt Konto</h3>
    </div>

    <div v-if="userCustomer?.Customers" class="mb-6">
      <h4 class="mb-2">Kundinformation</h4>
      <span>Kundföretag som du är kopplad till.</span>

      <div
        class="bg-accent/10 py-3 px-6 rounded-lg w-fit my-2"
        v-for="customer in userCustomer.Customers"
      >
        <div v-if="isPrivateCustomer(customer)">
          <p>Privatkund</p>
        </div>

        <div v-if="isBusinessCustomer(customer)">
          <span
            v-if="isAdmin(customer)"
            class="p-2 bg-green-300/40 rounded-xl block w-fit my-2"
            >Admin</span
          >
          {{ customer.customer_id }}
          <span>
            {{ customer.name }} /
            {{ customer.organization_number }}
          </span>
          <br />
          <!-- <button class="btn btn-sm mt-2">
            Välj att agera med detta konto.
          </button> -->

          <div class="my-3" v-if="isAdmin(customer)">
            <p class="">Lägg till användare:</p>

            <ElementInputAndLabel
              v-model="addUserEmail"
              label="Email"
              type="email"
            ></ElementInputAndLabel>
            <button
              class="btn btn-sm mt-5"
              @click="addUser(customer.customer_id)"
              :disabled="addUserEmail.length < 5"
            >
              Lägg till
            </button>
          </div>
        </div>

        <!-- <ElementInputAndLabel
          class="my-2"
          v-model="userCustomer.Customer.email"
          label="Mejl"
          type="text"
          :disabled="true"
        ></ElementInputAndLabel>

        <ElementInputAndLabel
          class="my-2"
          v-model="userCustomer.Customer.name"
          label="Namn"
          type="text"
          :disabled="true"
        ></ElementInputAndLabel>

        <ElementInputAndLabel
          class="my-2"
          v-model="userCustomer.Customer.address"
          label="Adress"
          type="text"
        ></ElementInputAndLabel>

        <ElementInputAndLabel
          class="my-2"
          v-model="userCustomer.Customer.postal_code"
          label="Adress"
          type="text"
        ></ElementInputAndLabel>

        <ElementInputAndLabel
          class="my-2"
          v-model="userCustomer.Customer.phone"
          label="Telefonummer"
          type="text"
        ></ElementInputAndLabel>

        <ElementInputAndLabel
          class="my-2"
          v-if="userCustomer.Customer.type == 'Business'"
          v-model="userCustomer.Customer.organization_number"
          label="Organisationsnummer"
          type="text"
        ></ElementInputAndLabel> -->
      </div>
    </div>

    <div v-if="userCustomer?.User">
      <h4>Din användare</h4>
      <ElementInputAndLabel
        class="my-2"
        v-model="userCustomer.User.first_name"
        label="Förnamn"
        type="text"
      ></ElementInputAndLabel>
      <ElementInputAndLabel
        class="my-2"
        v-model="userCustomer.User.last_name"
        label="Efternamn"
        type="text"
      ></ElementInputAndLabel>
      <ElementInputAndLabel
        class="my-2"
        v-model="userCustomer.User.address"
        label="Adress"
        type="text"
      ></ElementInputAndLabel>
    </div>
  </section>
</template>

<script async setup lang="ts">
import {
  getCurrentUserCustomer,
  type UserCustomer,
} from "~/helpers/supabasehelper";
import type { CustomerView } from "~/types/customer";

const userCustomer = ref<UserCustomer>();
const client = useSupabaseClient();

const addUserEmail = ref("");

onMounted(async () => {
  userCustomer.value = await getCurrentUserCustomer();
});

async function addUser(customer_id: number | undefined) {
  if (!customer_id) {
    return;
  }
  // find user by email get user_id
  const { data: userProfile, error: userProfileError } = await client
    //@ts-ignore
    .schema("public")
    .from("user_profiles")
    .select("*")
    .eq("email", addUserEmail.value)
    .single();

  if (userProfile) {
    // add user to customers_users table
    const { data, error } = await client
      //@ts-ignore
      .schema("public")
      .from("customer_users")
      .insert({
        customer_id: customer_id,
        user_id: userProfile.id,
        role: "User",
      })
      .single();

    if (!error) {
      alert("Success");
    }

    if (error) {
      console.error(error);
    }
  }
}

function isPrivateCustomer(customer: CustomerView) {
  return customer.type === "Private";
}

function isAdmin(customer: CustomerView) {
  return customer.role === "Admin";
}

function isBusinessCustomer(customer: CustomerView) {
  return customer.type === "Business";
}
</script>
