(() => {
  const toast = document.querySelector("[data-toast]");
  let toastTimer;

  const showToast = (message) => {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 1800);
  };

  const legacyCopy = (text) => {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied;
  };

  document.addEventListener("click", async (event) => {
    const trigger = event.target.closest("[data-copy]");
    if (!trigger) return;

    const text = trigger.dataset.copy;
    const label = trigger.dataset.copyLabel || "내용";
    if (!text) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else if (!legacyCopy(text)) {
        throw new Error("Copy failed");
      }
      showToast(`${label} 완료`);
    } catch {
      showToast(`복사하지 못했습니다: ${text}`);
    }
  });
})();
