<template>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text" v-html="label"></span>
    </div>
    <input
      v-model="selectedValue"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      class="input input-bordered w-full max-w-xs"
    />
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

// Definiera props, inklusive den som används med v-model
const props = defineProps<{
  modelValue: string; // Hantera olika typer explicit
  label: string;
  placeholder?: string;
  type: string;
  disabled?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref(props.modelValue);

// Övervaka ändringar i props.modelValue för att uppdatera selectedValue
watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue;
  }
);

// Övervaka ändringar i selectedValue för att emittera update:modelValue
watch(selectedValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
