"use client";

import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

export function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // portal-root 요소 찾기 또는 생성
    let element = document.getElementById("portal-root");

    // 요소가 없으면 생성
    if (!element) {
      element = document.createElement("div");
      element.id = "portal-root";
      document.body.appendChild(element);
    }

    setPortalRoot(element);

    // 컴포넌트 언마운트 시 동적으로 생성한 요소 정리
    return () => {
      // 동적으로 생성한 경우에만 제거
      if (!document.getElementById("portal-root")?.parentElement) {
        document.body.removeChild(element);
      }
    };
  }, []);

  if (!mounted || !portalRoot) return null;

  return createPortal(children, portalRoot);
}
