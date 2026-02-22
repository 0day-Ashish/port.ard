type AudioManager = {
  init: (src: string) => HTMLAudioElement;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  setVolume: (v: number) => void;
  getVolume: () => number;
  isPlaying: () => boolean;
  getAudio: () => HTMLAudioElement | null;
};

let audio: HTMLAudioElement | null = null;
let _isPlaying = false;

export const audioManager: AudioManager = {
  init(src: string) {
    if (!audio) {
      audio = new Audio(src);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.15;
      audio.addEventListener("play", () => (_isPlaying = true));
      audio.addEventListener("pause", () => (_isPlaying = false));
    }
    return audio;
  },
  async play() {
    if (!audio) return;
    try {
      await audio.play();
    } catch (e) {
      // ignore
    }
  },
  pause() {
    if (!audio) return;
    audio.pause();
  },
  async toggle() {
    if (!audio) return;
    if (_isPlaying) audio.pause();
    else {
      try {
        await audio.play();
      } catch (e) {
        // ignore
      }
    }
  },
  setVolume(v: number) {
    if (!audio) return;
    audio.volume = Math.min(1, Math.max(0, v));
  },
  getVolume() {
    return audio ? audio.volume : 0;
  },
  isPlaying() {
    return _isPlaying;
  },
  getAudio() {
    return audio;
  },
};
