declare module "#app" {
  interface NuxtApp {
    $bus: {
      $on: (event: string, callback: (...args: any[]) => void) => void;
      $emit: (event: string, ...args: any[]) => void;
    };
  }
}

import mitt from "mitt";
const emitter = mitt();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("bus", {
    $on: emitter.on,
    $emit: emitter.emit,
  });
});
