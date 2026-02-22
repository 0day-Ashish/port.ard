"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { audioManager } from "@/lib/audio";

export default function AutoMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const pathname = usePathname();
  const disabledOnThisPage = pathname && pathname.startsWith("/portfolio");

  // Initialize audio and control autoplay based on current pathname
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = audioManager.init("/assets/music.mp3");
    audioRef.current = audio;

    const tryPlay = async () => {
      // if we're on the portfolio page, don't autoplay
      if (pathname && pathname.startsWith("/portfolio")) {
        // ensure audio is paused
        audioManager.pause();
        setPlaying(false);
        setBlocked(false);
        return;
      }

      try {
        await audioManager.play();
        const isPlayingNow = !!(audio && !audio.paused && !audio.ended);
        setPlaying(isPlayingNow);
        setBlocked(false);
      } catch (err) {
        setPlaying(false);
        setBlocked(true);
      }
    };

    tryPlay();

    const unlock = async () => {
      if (!audio) return;
      try {
        // don't unlock (start) audio if on portfolio page
        if (pathname && pathname.startsWith("/portfolio")) return;
        await audio.play();
        const isPlayingNow = !!(audio && !audio.paused && !audio.ended);
        setPlaying(isPlayingNow);
        setBlocked(false);
        window.removeEventListener("click", unlock);
        window.removeEventListener("touchstart", unlock);
      } catch (e) {
        // still blocked
      }
    };

    window.addEventListener("click", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
      // do not pause here — pause is controlled by pathname above
    };
  }, [pathname]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    await audioManager.toggle();
    // reflect actual audio element state immediately
    const isPlayingNow = !!(audio && !audio.paused && !audio.ended);
    setPlaying(isPlayingNow);
  };

  if (disabledOnThisPage) return null;

  return (
    <div>
      <button
        aria-label={playing ? "Pause music" : "Play music"}
        onClick={toggle}
        className="fixed bottom-6 left-6 z-50 bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center"
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="5" width="4" height="14" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" fill="currentColor" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
          </svg>
        )}
      </button>
      {/* If blocked, small hint tooltip */}
      {blocked && (
        <div className="fixed bottom-20 left-4 z-50 bg-white/90 text-black text-xs px-3 py-1 rounded-md">
          Tap anywhere to enable audio
        </div>
      )}
    </div>
  );
}
