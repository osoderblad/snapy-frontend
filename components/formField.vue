<template>
  <div class="flex flex-col relative">
    <label :for="name" class="mb-2 text-sm font-medium text-gray-200">{{
      label
    }}</label>
    <Field
      :name="name"
      v-maska="{ mask: mask, eager: true }"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      :class="inputClass"
      :rules="rules"
      :disabled="disabled"
      :validateOn="validateOn"
    />
    <ErrorMessage
      :name="name"
      class="text-red-900 absolute top-0 -right-2 text-xs bg-red-100 font-extrabold p-1 rounded-lg"
    />
    <slot></slot>
  </div>
</template>

<script setup>
import { vMaska } from "maska/vue";

const props = defineProps({
  name: String,
  placeholder: String,
  disabled: Boolean,
  label: String,
  modelValue: [String, Number, Object],
  inputClass: {
    type: String,
    default: "p-5 input input-neutral bg-opacity-65 w-full border-neutral",
  },
  rules: [String, Object],
  validateOn: String,
  mask: String, // Lägg till mask prop
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
