import type { ActionReturn } from "svelte/action";

export function stopTyping(node: any): ActionReturn {
  const handleKeyup = debounce((event: KeyboardEvent) => {
    // (1) the debounce logic
    if (node.contains(event.target)) {
      // (2) restrict the event to the only referring node
      node.dispatchEvent(new CustomEvent("stopTyping")); // (3) fire the event
    }
  }, 500);

  // (4) add a generic keyup event
  document.addEventListener("keyup", handleKeyup, true);

  return {
    destroy() {
      // (5) cleanup on destroy
      document.removeEventListener("keyup", handleKeyup, true);
    },
  };
}

function debounce(
  inputFunction: (event: KeyboardEvent) => void,
  timeToWaitBeforeFiringInMs = 500
) {
  let timer: NodeJS.Timeout;
  return (...args: [event: KeyboardEvent]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      inputFunction.apply(this, args);
    }, timeToWaitBeforeFiringInMs);
  };
}
