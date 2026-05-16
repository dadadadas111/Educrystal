"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Download, Share2, Smartphone, X } from "lucide-react";

import { cn } from "@/lib/utils";

type BeforeInstallPromptChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[];
  readonly userChoice: Promise<BeforeInstallPromptChoice>;
  prompt: () => Promise<void>;
};

type InstallPlatform = "hidden" | "ios" | "prompt" | "manual";

type RelatedApp = {
  platform: string;
  url?: string;
  id?: string;
};

function isStandaloneDisplay() {
  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };

  return window.matchMedia("(display-mode: standalone)").matches || navigatorWithStandalone.standalone === true;
}

function isIosDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isTouchMac = window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;

  return /iphone|ipad|ipod/.test(userAgent) || isTouchMac;
}

function canReceiveNativeInstallPrompt() {
  const userAgent = window.navigator.userAgent.toLowerCase();

  return !isIosDevice() && /chrome|chromium|edg|opr|samsungbrowser/.test(userAgent);
}

function isMobileLike() {
  return window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches;
}

function useInstallPrompt() {
  const [isMobileContext, setIsMobileContext] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    let isMounted = true;

    setIsMobileContext(isMobileLike());
    setIsStandalone(isStandaloneDisplay());
    setShowIosGuide(isIosDevice());
    setShowManualGuide(isMobileLike() && !isIosDevice() && !canReceiveNativeInstallPrompt());
    setIsReady(true);

    const navigatorWithInstalledApps = window.navigator as Navigator & {
      getInstalledRelatedApps?: () => Promise<readonly RelatedApp[]>;
    };

    void navigatorWithInstalledApps.getInstalledRelatedApps?.()
      .then((relatedApps) => {
        if (isMounted && relatedApps.length > 0) {
          setIsStandalone(true);
        }
      })
      .catch(() => undefined);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setPromptEvent(null);
    };

    const displayModeQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = () => setIsStandalone(isStandaloneDisplay());

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    displayModeQuery.addEventListener("change", handleDisplayModeChange);

    return () => {
      isMounted = false;
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      displayModeQuery.removeEventListener("change", handleDisplayModeChange);
    };
  }, []);

  const platform = useMemo<InstallPlatform>(() => {
    if (!isMobileContext) return "hidden";
    if (promptEvent) return "prompt";
    if (showIosGuide) return "ios";
    if (showManualGuide) return "manual";
    return "hidden";
  }, [isMobileContext, promptEvent, showIosGuide, showManualGuide]);

  const install = async () => {
    if (!promptEvent) return;

    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;

    if (choice.outcome === "accepted" || choice.outcome === "dismissed") {
      setPromptEvent(null);
    }
  };

  return { install, isReady, isStandalone, platform };
}

export function InstallAppCta() {
  const { install, isReady, isStandalone, platform } = useInstallPrompt();
  const [showGuide, setShowGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (!isReady || isStandalone || dismissed || platform === "hidden") return null;

  const canPrompt = platform === "prompt";
  const isIos = platform === "ios";
  const title = canPrompt ? "Cài Educrystal" : isIos ? "Thêm vào Màn hình chính" : "Dùng như ứng dụng";
  const body = canPrompt
    ? "Cài app để mở nhanh, toàn màn hình và quay lại bài học dễ hơn."
    : isIos
      ? "iPhone/iPad chưa cho web app mở hộp thoại cài tự động. Dùng nút Chia sẻ của Safari để thêm app."
      : "Trình duyệt này chưa có nút cài tự động. Nếu menu trình duyệt có mục Cài đặt ứng dụng, hãy dùng mục đó.";

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-[1.75rem] border-2 border-outline bg-white/95 p-3 shadow-[0_-14px_34px_rgba(62,79,117,0.14)] backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="icon-shell h-12 w-12 shrink-0 bg-surface-soft">
            {isIos ? <Share2 className="h-5 w-5 text-slate-900" /> : <Smartphone className="h-5 w-5 text-slate-900" />}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-slate-900">{title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">{body}</p>

            {showGuide ? (
              <div className="mt-3 rounded-[1.25rem] border border-outline/70 bg-surface-soft px-3 py-2 text-xs leading-5 text-slate-700">
                {isIos ? "Mở bằng Safari, chạm Chia sẻ, rồi chọn “Thêm vào Màn hình chính”." : "Mở menu của trình duyệt và chọn “Cài đặt ứng dụng” hoặc “Add to Home screen” nếu mục này xuất hiện."}
              </div>
            ) : null}
          </div>

          <button type="button" onClick={() => setDismissed(true)} aria-label="Ẩn gợi ý cài đặt" className="rounded-full border-2 border-outline bg-white p-2 text-slate-500 shadow-soft transition-transform hover:-translate-y-0.5">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (canPrompt) {
                void install();
                return;
              }

              setShowGuide((current) => !current);
            }}
            aria-expanded={!canPrompt && showGuide}
            className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
          >
            {canPrompt ? "Cài app" : "Xem cách cài"}
            {canPrompt ? <Download className="ml-2 h-4 w-4" /> : <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", showGuide && "rotate-180")} />}
          </button>

          <a href="#courses" className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-soft transition-transform hover:-translate-y-0.5">
            Xem trước
          </a>
        </div>
      </div>
    </aside>
  );
}
