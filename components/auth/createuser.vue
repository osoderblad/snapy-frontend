<template>
  <div class="my-5 text-center">
    <h3>Skapa Konto</h3>

    <form class="block" autocomplete="off">
      <div class="">
        <div class="mb-4">
          <input
            class="w-full max-w-sm input bg-primary text-black placeholder-gray-400 dark:bg-[#20697C] dark:text-[#B7FBFF] dark:placeholder-[#B7FBFF]"
            type="email"
            :class="emailError ? 'border-red-500' : 'border-neutral'"
            required
            autocomplete="off"
            pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
            v-model="userForm.email"
            :on-keydown="checkEmail()"
            @focus="emailError = false"
            placeholder="Email"
          />
          <span
            class="text-xs block text-red-400 font-bold -top-3 right-5 absolute bg-accent px-2 py-1 rounded-md shadow-md"
            v-if="emailError"
          >
            Fel format på din email
          </span>
        </div>

        <div>
          <input
            class="w-full max-w-sm input bg-primary text-black placeholder-gray-400 dark:bg-[#20697C] dark:text-[#B7FBFF] dark:placeholder-[#B7FBFF]"
            type="password"
            autocomplete="off"
            required
            v-model="userForm.password"
            placeholder="Lösenord"
          />
        </div>
      </div>
      <Passwordchecker
        v-if="userForm.password?.length > 1"
        class="pl-3"
        :email="userForm.email"
        :password="userForm.password"
        :password2="userForm.password"
        @valid="isValidPassword = $event"
      ></Passwordchecker>

      <div class="my-5">
        <span
          class="btn btn-accent w-full max-w-40"
          @click="createUser"
          :class="isBusy || !isValid ? 'disabled' : ''"
        >
          Skapa konto
          <span v-if="isBusy" class="loading loading-spinner loading-xs"></span>
        </span>
      </div>
    </form>

    <div class="divider">Eller</div>
    <div class="w-full text-center">
      <button
        disabled
        @click="authGoogle()"
        class="btn btn-outline ml-2 align-middle"
      >
        <img
          src="~/assets/Google__G__Logo.svg"
          class="max-w-[20px] inline-block mr-2"
        />
        <span class="font-bold">Fortsätt med Google</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const { notify } = useNotifier();
const Passwordchecker = defineAsyncComponent(
  () => import("~/asyncComponents/passwordchecker.vue")
);

const isValidPassword = ref(false);
const userForm = ref({
  email: "",
  password: "",
});
const isBusy = ref(false);
const emailError = ref(false);

const authGoogle = async () => {
  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    notify("Något gick fel, försök igen.", "danger");
  }
  if (!error) {
    navigateTo("/login");
  }
};

const isValid = computed(() => {
  return (
    isValidPassword.value &&
    !emailError.value &&
    userForm.value.email.length > 2
  );
});

// Regex för att validera e-postadresser
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function checkEmail() {
  emailError.value =
    userForm.value.email.length > 2 && !emailRegex.test(userForm.value.email);
}

async function validateForm() {
  if (!isValid) {
    notify("Var god fyll i alla fält.", "danger");
    return false;
  }

  return true;
}

async function createUser() {
  var isFormValid = await validateForm();
  if (isFormValid) {
    const { error } = await client.auth.signUp({
      email: userForm.value.email,
      password: userForm.value.password,
    });

    if (error) {
      notify("Något gick fel", "danger");
    } else {
      notify("Konto skapat, kolla din mail för att aktivera kontot.");
    }
    isBusy.value = true;
  } else {
    return;
  }

  isBusy.value = false;
}
</script>
