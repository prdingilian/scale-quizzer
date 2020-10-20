import { notes, scales } from "./jazzscript.constants";

type scaleAndPlayScale = {
  scale: Array<number>;
  playScale: Function;
};

const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
oscillator.type = "sawtooth";
oscillator.start();
const gain = audioContext.createGain();
gain.gain.value = 0;
oscillator.connect(gain);
const filter = audioContext.createBiquadFilter();
filter.frequency.value = 1000;
gain.connect(filter);
filter.connect(audioContext.destination);

export function getAudioContext(): AudioContext {
  return audioContext;
}

export function getAvailableNotes(): Array<string> {
  const noteNames: Array<string> = [];
  notes.forEach((value: number, key: string) => noteNames.push(key));
  return noteNames;
}

export function getAvailableFrequencies(): Array<number> {
  const noteFrequencies: Array<number> = [];
  notes.forEach((value: number, key: string) => noteFrequencies.push(value));
  return noteFrequencies;
}

export function getAvailableScales(): Array<string> {
  const scaleNames: Array<string> = [];
  scales.forEach((value, key) => scaleNames.push(key));
  return scaleNames;
}

export function playSequence(
  frequencies: Array<number>,
  timePerNote: number
): Function {
  return () => {
    frequencies.forEach((frequency, i) => {
      oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime + timePerNote * i
      );
      gain.gain.linearRampToValueAtTime(
        0.2,
        audioContext.currentTime + timePerNote * i
      );
      filter.frequency.linearRampToValueAtTime(
        1500,
        audioContext.currentTime + timePerNote * i
      );
      gain.gain.linearRampToValueAtTime(
        0,
        audioContext.currentTime + timePerNote * (i + 1)
      );
      filter.frequency.linearRampToValueAtTime(
        1000,
        audioContext.currentTime + timePerNote * (i + 1)
      );
    });
  };
}

function getNoteIndexesForScale(key: string, scale: string): Array<number> {
  const noteIndexes: Array<number> = [];
  const scaleSteps = scales.get(scale);
  if (!scaleSteps) {
    return [];
  }
  const allNotes = getAvailableNotes();
  let currentIndex = allNotes.findIndex((note) => note.startsWith(key));
  noteIndexes.push(currentIndex);
  scaleSteps.forEach((step) => {
    currentIndex += step;
    noteIndexes.push(currentIndex);
  });
  return noteIndexes;
}

export function getScaleTones(key: string, scale: string): Array<number> {
  const allNotes = getAvailableNotes();
  const noteIndexesForScale = getNoteIndexesForScale(key, scale);
  let scaleTones = noteIndexesForScale.map(
    (index) => notes.get(allNotes[index])!
  );
  return scaleTones;
}

export function playScale(key: string, scale: string): Function {
  const scaleTones = getScaleTones(key, scale);
  return playSequence(scaleTones, 2.5 / scaleTones.length);
}
