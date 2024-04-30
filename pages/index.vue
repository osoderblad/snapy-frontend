<template>
  <section>
    <div class="max-w-6xl w-full m-auto">
      <h1>Domäner</h1>
      <ClientOnly>
        <TableView></TableView>
      </ClientOnly>
    </div>
  </section>
</template>

<script async setup>
// const TableViewa = defineAsyncComponent(() =>
//   import("~/asyncComponents/TableView.vue")
// );

const jj = ref(0);
</script>
