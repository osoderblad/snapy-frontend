export function beforeEnterMaxHeight(el: any) {
  el.style.maxHeight = "0"; // Initial max-height
}

export function enterMaxHeight(el: any) {
  el.style.maxHeight = `${el.scrollHeight}px`;
}

export function leaveMaxHeight(el: any) {
  el.style.maxHeight = "0";
}
