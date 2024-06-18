export function useNotifier() {
  const { $bus } = useNuxtApp();

  const notify = (message: string, type: string = "success") => {
    const toast = { message, type };

    $bus.$emit("notify", {
      message: toast.message,
      type: toast.type,
    });
  };

  return { notify };
}
