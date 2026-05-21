import { fretboardStrings } from "./data.js";

export function midiToFreq(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

export function midiToNoteName(midi) {
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return names[midi % 12];
}

let audioContext;

export function getAudioContext() {
  if (!audioContext) {
    audioContext = new window.AudioContext();
  }
  return audioContext;
}

export function playFrequencies(frequencies, { stagger = 0, duration = 0.85, volume = 0.12 } = {}) {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  const start = ctx.currentTime + 0.02;
  frequencies.forEach((frequency, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const noteStart = start + index * stagger;
    const noteEnd = noteStart + duration;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(frequency, noteStart);
    gain.gain.setValueAtTime(0.0001, noteStart);
    gain.gain.exponentialRampToValueAtTime(volume, noteStart + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(noteStart);
    osc.stop(noteEnd + 0.03);
  });
}

export function buildVisibleFretCells() {
  return fretboardStrings.flatMap((string) =>
    [0, 1, 2, 3, 4, 5].map((fret) => {
      const midi = string.openMidi + fret;
      return {
        string: string.name,
        fret,
        midi,
        note: midiToNoteName(midi),
        frequency: midiToFreq(midi),
      };
    })
  );
}

export function getTrainerMessage(mode) {
  return mode === "coordinate"
    ? "New target loaded. Find the exact string and fret before you click."
    : "New note target loaded. Find any matching note name in the visible area.";
}

export function buildRandomTrainerTarget(mode = "coordinate") {
  const cells = buildVisibleFretCells();
  const picked = cells[Math.floor(Math.random() * cells.length)];
  if (mode === "note") {
    return {
      mode,
      note: picked.note,
      frequency: picked.frequency,
    };
  }
  return {
    mode,
    string: picked.string,
    fret: picked.fret,
    midi: picked.midi,
    note: picked.note,
    frequency: picked.frequency,
  };
}
