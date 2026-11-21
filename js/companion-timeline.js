(() => {
  "use strict";

  const timeline = document.querySelector("#companion-timeline");
  if (!timeline) return;

  const items = [...timeline.querySelectorAll(".companion-timeline-item")];
  const nodes = items.map((item) => item.querySelector(".companion-timeline-node"));
  if (!items.length || nodes.some((node) => !node)) return;

  let frameId = 0;

  function updateProgress() {
    frameId = 0;

    const timelineRect = timeline.getBoundingClientRect();
    const firstNodeRect = nodes[0].getBoundingClientRect();
    const lastNodeRect = nodes[nodes.length - 1].getBoundingClientRect();
    const railStart = firstNodeRect.top + firstNodeRect.height / 2 - timelineRect.top;
    const railEnd = lastNodeRect.top + lastNodeRect.height / 2 - timelineRect.top;
    const railHeight = Math.max(0, railEnd - railStart);
    const focusY = window.innerHeight * 0.62;
    const progress = railHeight
      ? Math.min(1, Math.max(0, (focusY - firstNodeRect.top - firstNodeRect.height / 2) / railHeight))
      : 0;

    timeline.style.setProperty("--companion-rail-start", `${railStart}px`);
    timeline.style.setProperty("--companion-rail-height", `${railHeight}px`);
    timeline.style.setProperty("--companion-progress-height", `${railHeight * progress}px`);

    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const nodeRect = nodes[index].getBoundingClientRect();
      const nodeCenter = nodeRect.top + nodeRect.height / 2;
      item.classList.toggle("is-reached", nodeCenter <= focusY);
      item.classList.toggle("is-current", itemRect.top <= focusY && itemRect.bottom > focusY);
    });
  }

  function scheduleProgressUpdate() {
    if (frameId) return;
    frameId = window.requestAnimationFrame(updateProgress);
  }

  scheduleProgressUpdate();
  window.addEventListener("scroll", scheduleProgressUpdate, { passive: true });
  window.addEventListener("resize", scheduleProgressUpdate, { passive: true });
})();
