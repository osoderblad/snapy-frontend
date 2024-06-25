<template>
  <section>
    <div class="w-full m-auto">
      <h3>Onboarding</h3>
    </div>

    <Form @submit="submitForm" class="grid grid-cols-12 gap-4">
      <!-- Type Field -->
      <div class="col-span-3 flex justify-center items-center">Type</div>
      <div class="col-span-9">
        <Field
          name="type"
          as="select"
          v-model="customer.type"
          class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
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

      <!-- Submit Button -->
      <div class="col-span-12 flex justify-center">
        <button type="submit" class="btn btn-primary mt-4">Submit</button>
      </div>
    </Form>
  </section>
</template>

<script setup lang="ts">
import { useForm, Field, Form, ErrorMessage } from "vee-validate";
import { object, string, number } from "yup";

const customer = ref({
  type: null,
  name: null,
  email: null,
  phone: null,
  // Initialize other fields similarly
});

const validationSchema = object({
  type: string()
    .required("Type is required")
    .oneOf(["private", "business"], "Invalid customer type"),
  name: string().required("Name is required"),
  email: string().email("Invalid email address").required("Email is required"),
  phone: string().nullable(),
  // Add other fields validation here if necessary
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const submitForm = handleSubmit((values) => {
  console.log("Form Values:", values);
  // Handle form submission
});
</script>
