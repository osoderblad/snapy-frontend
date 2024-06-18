<template>
  <div
    v-if="toasts.length > 0"
    class="toasts fixed z-[1000] left-[50%] top-[7.3rem] max-w-sm p-5 w-full stack"
    style="transform: translate(-50%, -50%)">
    <div
      v-for="(toast, index) in toasts"
      :key="toast.id"
      :class="[
        'flex flex-col items-center w-full p-4 mb-4 rounded-lg shadow bg-gray-800 text-gray-300 ',
        toast.className,
      ]"
      role="alert">
      <div class="flex items-center w-full">
        <ToastSuccess
          v-if="toast.type == 'success' || !toast.type"></ToastSuccess>
        <ToastDanger v-if="toast.type == 'danger'"></ToastDanger>
        <ToastWarning v-if="toast.type == 'warning'"></ToastWarning>
        <div class="ms-3 text-sm font-normal">
          {{ toast.message }}
        </div>
        <span
          @click="removeItem(index)"
          class="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 cursor-pointer"
          aria-label="Close">
          <span class="sr-only">Close</span>
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </span>
      </div>
      <div class="h-1 mt-3 overflow-hidden absolute bottom-[1.5px] w-[98%]">
        <div
          class="bg-indigo-400 bg-opacity-20 h-1 rounded-b-full"
          style="animation: countdown 5150ms linear"></div>
      </div>
    </div>
  </div>
</template>

<style>
.fade-in {
  animation: fadeIn 0.2s linear forwards;
}

.fade-out {
  animation: fadeOut 0.2s linear forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes countdown {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>

<script setup lang="js">
const toasts = ref([
]);
const { $bus } = useNuxtApp();


// remove toast
const removeItem = (index) => {
  toasts.value.splice(index, 1);
};

$bus.$on("notify", (obj) => {
    obj.id = Date.now(); // En unik identifierare för varje toast
    obj.className = 'fade-in'; // Initial klass för fade-in effekt
    toasts.value.unshift(obj);
    setTimeout(() => {
        const index = toasts.value.findIndex(t => t.id === obj.id);
        if (index !== -1) {
            toasts.value[index].className = 'fade-out';
            // När fade-out effekten är klar, ta bort objektet från listan
            setTimeout(() => {
                toasts.value.splice(index, 1);
            }, 200); // Säkerställ att detta är samma tid som animationens längd
        }
    }, obj.timeout || 5000);
});
</script>
