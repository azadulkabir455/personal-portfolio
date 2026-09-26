"use client";

import { useEffect } from "react";

const revealSelector = "[data-reveal], [data-reveal-group] > *";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting, boundingClientRect, rootBounds }) => {
          const element = target as HTMLElement;
          if (isIntersecting) {
            element.dataset.revealState = "visible";
            return;
          }
          element.dataset.revealState = boundingClientRect.top < (rootBounds?.top ?? 0) ? "above" : "below";
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const observeWithin = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => observer.observe(element));
    };

    const unobserveWithin = (root: HTMLElement) => {
      if (root.matches(revealSelector)) observer.unobserve(root);
      root.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => observer.unobserve(element));
    };

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(revealSelector)) observer.observe(node);
          observeWithin(node);
        });
        record.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement) unobserveWithin(node);
        });
      });
    });

    observeWithin(document);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
