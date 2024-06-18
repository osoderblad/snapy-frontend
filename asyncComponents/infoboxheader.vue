<template>
  <div
    v-if="!isOkey"
    class="w-[90%] fixed bg-gradient-to-r from-[#3F4999] to-[#3B4690] text-white px-3 py-5 rounded-md my-10 z-[111] max-w-md bottom-10 shadow-md right-2 text-sm">
    <p>
      <InformationCircleIcon class="w-7 absolute -left-5 -top-7 opacity-80" />
      While our guided sessions are in
      <i>audio format</i>
      , instructional videos for each practice will be
      <b>uploaded shortly</b>
      . In the meantime, please follow along as best you can.
    </p>
    <span @click="closeInfoBox()" class="btn btn-sm">Ok!</span>
  </div>
</template>

<script setup>
import { InformationCircleIcon } from "@heroicons/vue/24/solid";

const isOkey = ref(true);

onMounted(() => {
  var local = window.localStorage.getItem("isOkey");

  if (local === "true") {
    isOkey.value = true;
  } else {
    isOkey.value = false;
  }
});

function closeInfoBox() {
  isOkey.value = true;
  window.localStorage.setItem("isOkey", true);
}
</script>
