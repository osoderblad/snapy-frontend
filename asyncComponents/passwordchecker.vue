<template>
  <ClientOnly>
    <div class="text-sm resetpassword rounded-lg text-white">
      <h5 class="m-0 mt-3">Lösenord</h5>
      <template v-for="field in fields">
        <span :style="`color : ${field.value ? green : red}`">
          <SvgCheckmark v-if="field.value" :color="green"></SvgCheckmark>
          <SvgCheckmark v-if="!field.value" :color="red"></SvgCheckmark>
          {{ field.text }}
        </span>
      </template>
      <span style="display: none">{{ isPasswordValid }}</span>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
type FieldValue = {
  text: string;
  value: boolean;
};
const props = defineProps(["password", "password2", "email"]);
const emit = defineEmits(["valid"]);

const green = "#cdf2cd";
const red = "#ffb7b7";

const isEmailValid = computed(() => {
  // Enkel regex för att kontrollera om e-postadressen är giltig
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email);
});

const hasPasswordLengt = computed(() => {
  return props.password.length >= 8;
});
const hasUpperCase = computed(() => {
  const hasUpperCase = /[A-Z]/.test(props.password);
  return hasUpperCase;
});
const hasLowerCase = computed(() => {
  const hasLowerCase = /[a-z]/.test(props.password);
  return hasLowerCase;
});
const hasNumber = computed(() => {
  const hasNumber = /\d/.test(props.password);
  return hasNumber;
});
const hasSpecialChar = computed(() => {
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    props.password
  );
  return hasSpecialChar;
});

const fields = ref([
  {
    text: "Måste vara minst 8 tecken långt.",
    value: hasPasswordLengt,
  },
  {
    text: "Måste innehålla minst en stor bokstav.",
    value: hasUpperCase,
  },
  {
    text: "Måste innehålla minst en liten bokstav.",
    value: hasLowerCase,
  },
  {
    text: "Måste innehålla minst en siffra.",
    value: hasNumber,
  },
  {
    text: "Måste innehålla minst ett specialtecken",
    value: hasSpecialChar,
  },
]) as Ref<FieldValue[]>;

const isPasswordValid = computed(() => {
  const hasMinLength = props.password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(props.password);
  const hasLowerCase = /[a-z]/.test(props.password);
  const hasNumber = /[0-9]/.test(props.password);

  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    props.password
  );

  var valid =
    isEmailValid &&
    hasMinLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar;

  emit("valid", valid);
  return valid;
});
</script>

<style type="text/css">
.resetpassword span {
  display: block;
  margin-bottom: 2px;
}
</style>
