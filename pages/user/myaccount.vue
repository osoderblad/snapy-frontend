<template>
  <section>
    <div class="w-full m-auto">
      <h3>Mitt Konto!</h3>
    </div>

    <div v-if="user">
      <i class="text-sm">
        Konto skapat: {{ user.created_at?.split("T")[0] }}
      </i>

      <div class="mt-2 grid grid-cols-12 gap-6 py-5 max-w-[450px] w-full">
        <div class="col-span-3 flex justify-center items-center">Email</div>
        <div class="col-span-9">
          <input
            type="text"
            class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
            disabled
            :value="user.email"
          />
        </div>

        <div class="col-span-3 flex justify-center items-center">Typ</div>
        <div class="col-span-9">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Privat</span>
              <input
                type="radio"
                name="radio-10"
                class="radio checked:bg-red-500"
                checked="checked"
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Företag</span>
              <input
                type="radio"
                name="radio-10"
                class="radio checked:bg-blue-500"
                checked="checked"
              />
            </label>
          </div>
        </div>

        <!-- <div class="col-span-3 flex justify-center items-center">
           Kolumn
          </div>
          <div class="col-span-9">
            <input
              type="text"
              class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral"
              placeholder="t('username')"
              v-model="userInfo.username" />
          </div>

          <div class="col-span-3 flex justify-center items-center">
            <label for="first-name">{{ $t("firstName") }}</label>
          </div>
          <div class="col-span-9">
            <input
              type="text"
              placeholder="Förnman"
              v-model="userInfo.first_name"
              class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral" />
          </div>

          <div class="col-span-3 flex justify-center items-center">
            <label for="last-name">{{ $t("lastName") }}</label>
          </div>

          <div class="col-span-9">
            <input
              type="text"
              :placeholder="t('lastName')"
              v-model="userInfo.last_name"
              class="p-5 input input-neutral bg-opacity-65 w-full max-w-xs border-neutral" />
          </div> -->
      </div>
    </div>
  </section>
</template>

<script async setup>
// const jj = ref(0);

const user = useSupabaseUser();
</script>
