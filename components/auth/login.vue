<template>
  <div class="">
    <h3>Logga In</h3>
    <form class="">
      <div class="mb-3">
        <input
          class="w-full max-w-sm input bg-primary text-black placeholder-gray-400 dark:bg-[#20697C] dark:text-[#B7FBFF] dark:placeholder-[#B7FBFF]"
          type="email"
          v-model="userForm.email"
          v-on:keyup.enter="login"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          class="w-full max-w-sm input bg-primary text-black placeholder-gray-400 dark:bg-[#20697C] dark:text-[#B7FBFF] dark:placeholder-[#B7FBFF]"
          type="password"
          v-on:keyup.enter="login"
          v-model="userForm.password"
          placeholder="Lösenord"
        />
      </div>

      <div class="my-5">
        <span
          :class="isBusy ? 'disabled' : ''"
          class="btn btn-accent w-full max-w-40"
          @click="login"
        >
          Logga In
          <span
            v-if="isBusy"
            class="loading loading-spinner loading-xs text-indigo-300"
          ></span>
        </span>
        <span class="btn btn-ghost ml-5 btn-md" @click="reset">
          Glömt lösenord?
        </span>
      </div>
    </form>
    <div class="divider">eller</div>
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
const { notify } = useNotifier();
const client = useSupabaseClient();
const userForm = ref({
  email: "",
  password: "",
});

const authGoogle = async () => {
  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    notify("Något gick fel, försök igen.", "danger");
  }
  if (!error) {
  }
};

const isBusy = ref(false);
const login = async () => {
  isBusy.value = true;
  const { error } = await client.auth.signInWithPassword({
    email: userForm.value.email,
    password: userForm.value.password,
  });

  if (error) {
    notify("Fel email eller lösenord", "danger");
  }

  if (!error) {
    navigateTo("/user/domaner");

    client.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigateTo("/login");
      }
    });
  }
  isBusy.value = false;
};

const reset = async () => {
  isBusy.value = true;
  const { error } = await client.auth.resetPasswordForEmail(
    userForm.value.email,
    {
      redirectTo: "http://localhost:3000/resetpassword",
    }
  );

  if (error) {
    notify("Något gick fel, försök igen.", "danger");
  }

  if (!error) {
    notify("Kolla din email för att återställa lösenordet");
  }
  isBusy.value = false;
};
</script>
