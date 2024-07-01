<template>
  <section>
    <div class="w-full m-auto">
      <h3>Mitt Konto</h3>
    </div>

    <div v-if="userCustomer?.Customer" class="mb-6">
      <h4>
        Kundinformation
        <span v-if="userCustomer.Customer.type === 'Private'"
          >(Privatkund)</span
        >
        <span v-if="userCustomer.Customer.type === 'Business'"
          >(Företagskund)</span
        >
      </h4>

      <ElementInputAndLabel
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
      ></ElementInputAndLabel>
    </div>

    <div v-if="userCustomer?.User">
      <h4>Personlig information</h4>
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

const userCustomer = ref<UserCustomer>();

onMounted(async () => {
  userCustomer.value = await getCurrentUserCustomer();
});
</script>
