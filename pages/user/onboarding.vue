<template>
  <section class="">
    <div class="w-full">
      <h3>Onboarding</h3>
    </div>

    <Form
      v-slot="{ values }"
      class="grid grid-cols-12 gap-4 max-w-2xl"
      @submit="onSubmit"
      :validation-schema="schema"
    >
      <!-- Type Field -->
      <div class="col-span-3 flex justify-center items-center">Type</div>
      <div class="col-span-9">
        <Field
          name="type"
          as="select"
          v-model="customer.type"
          class="select select-bordered w-full max-w-xs"
          rules="required|oneOf:private,business"
          validateOn="blur"
        >
          <option disabled value="">Select a type</option>
          <option value="private">Private</option>
          <option value="business">Business</option>
        </Field>
        <ErrorMessage name="type" class="text-red-500" />
      </div>

      <!-- Name Field -->
      <div class="col-span-3 flex justify-center items-center">Name</div>
      <div class="col-span-9">
        <Field
          name="name"
          v-model="customer.name"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
          rules="required"
          validateOn="blur"
        />
        <ErrorMessage name="name" class="text-red-500" />
      </div>

      <!-- Email Field -->
      <div class="col-span-3 flex justify-center items-center">Email</div>
      <div class="col-span-9">
        <Field
          name="email"
          type="email"
          v-model="customer.email"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
          rules="required|email"
          validateOn="blur"
        />
        <ErrorMessage name="email" class="text-red-500" />
      </div>
      <div class="col-span-12">
        <div class="divider">Frivilliga fält</div>
      </div>
      <!-- Phone Field -->
      <div class="col-span-3 flex justify-center items-center">Phone</div>
      <div class="col-span-9">
        <Field
          name="phone"
          v-model="customer.phone"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
          validateOn="blur"
        />
        <ErrorMessage name="phone" class="text-red-500" />
      </div>

      <!-- Organization Number Field -->
      <div class="col-span-3 flex justify-center items-center">
        Organization Number
      </div>
      <div class="col-span-9">
        <Field
          name="organization_number"
          v-model="customer.organization_number"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="organization_number" class="text-red-500" />
      </div>

      <!-- PIN Field -->
      <div class="col-span-3 flex justify-center items-center">PIN</div>
      <div class="col-span-9">
        <Field
          name="pin"
          v-model="customer.pin"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="pin" class="text-red-500" />
      </div>

      <!-- Address Field -->
      <div class="col-span-3 flex justify-center items-center">Address</div>
      <div class="col-span-9">
        <Field
          name="address"
          v-model="customer.address"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="address" class="text-red-500" />
      </div>

      <!-- Postal Code Field -->
      <div class="col-span-3 flex justify-center items-center">Postal Code</div>
      <div class="col-span-9">
        <Field
          name="postal_code"
          v-model="customer.postal_code"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="postal_code" class="text-red-500" />
      </div>

      <!-- City Field -->
      <div class="col-span-3 flex justify-center items-center">City</div>
      <div class="col-span-9">
        <Field
          name="city"
          v-model="customer.city"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="city" class="text-red-500" />
      </div>

      <!-- Country Field -->
      <div class="col-span-3 flex justify-center items-center">Country</div>
      <div class="col-span-9">
        <Field
          name="country"
          v-model="customer.country"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="country" class="text-red-500" />
      </div>

      <!-- Invoice Email Field -->
      <div class="col-span-3 flex justify-center items-center">
        Invoice Email
      </div>
      <div class="col-span-9">
        <Field
          name="invoice_email"
          type="email"
          v-model="customer.invoice_email"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="invoice_email" class="text-red-500" />
      </div>

      <!-- NameSRS ID Field -->
      <div class="col-span-3 flex justify-center items-center">NameSRS ID</div>
      <div class="col-span-9">
        <Field
          name="namesrs_id"
          v-model="customer.namesrs_id"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="namesrs_id" class="text-red-500" />
      </div>

      <!-- Fortnox Customer Number Field -->
      <div class="col-span-3 flex justify-center items-center">
        Fortnox Customer Number
      </div>
      <div class="col-span-9">
        <Field
          name="fortnox_customer_number"
          v-model="customer.fortnox_customer_number"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
        />
        <ErrorMessage name="fortnox_customer_number" class="text-red-500" />
      </div>

      <!-- Submit Button -->
      <div class="col-span-12 flex justify-center">
        <button type="submit" class="btn btn-primary mt-4">
          Slutför registrering
        </button>
      </div>
    </Form>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const customer = ref({
  type: null,
  name: null,
  email: null,
  phone: null,
  organization_number: null,
  pin: null,
  address: null,
  postal_code: null,
  city: null,
  country: null,
  invoice_email: null,
  namesrs_id: null,
  fortnox_customer_number: null,
});

const schema = yup.object({
  type: yup
    .string()
    .required("Type is required")
    .oneOf(["private", "business"], "Invalid customer type"),
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup.string().nullable(),
  organization_number: yup.string().nullable(),
  pin: yup.string().nullable(),
  address: yup.string().nullable(),
  postal_code: yup.string().nullable(),
  city: yup.string().nullable(),
  country: yup.string().default("Sverige").nullable(),
  invoice_email: yup.string().email("Invalid email address").nullable(),
  namesrs_id: yup.number().nullable(),
  fortnox_customer_number: yup.number().nullable(),
});

async function onSubmit(values: any) {
  const client = await useSupabaseClient();
  console.log(values);
  var { data, error } = await client
    //@ts-ignore
    .schema("public")
    .from("customers")
    .insert(values);

  console.log(data);
  console.log(error);

  if (data) {
    console.error(data);
  }

  // Here you would typically make an API call to save the customer
}
</script>
