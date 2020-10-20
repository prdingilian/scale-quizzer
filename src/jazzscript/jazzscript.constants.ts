export const notes = new Map<string, number>([
  ["C4", 261],
  ["C#4", 277.18],
  ["D4", 293.66],
  ["D#4", 311.13],
  ["E4", 329.63],
  ["F4", 349.23],
  ["F#4", 369.99],
  ["G4", 392],
  ["G#4", 415.3],
  ["A4", 440],
  ["A#4", 466.16],
  ["B4", 493.88],
  ["C5", 523.25],
  ["C#5", 554.37],
  ["D5", 587.33],
  ["D#5", 622.25],
  ["E5", 659.25],
  ["F5", 698.46],
  ["F#5", 739.99],
  ["G5", 783.99],
  ["G#5", 830.61],
  ["A5", 880],
  ["A#5", 932.33],
  ["B5", 987.77],
]);

enum Steps {
  Half = 1,
  Whole = 2,
}

const majorScaleDegrees: Array<Steps> = [
  Steps.Whole,
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
  Steps.Whole,
  Steps.Whole,
  Steps.Half,
];

const naturalMinorScaleDegrees: Array<Steps> = [
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
  Steps.Whole,
];

const melodicMinorScaleDegrees: Array<Steps> = [
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
  Steps.Whole,
  Steps.Whole,
  Steps.Whole,
  Steps.Half,
];

const harmonicMinorScaleDegrees: Array<Steps> = [
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
  Steps.Whole,
  Steps.Half,
  Steps.Whole + Steps.Half,
  Steps.Half,
];

const lydianScaleDegrees: Array<Steps> = [
  Steps.Whole,
  Steps.Whole,
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
  Steps.Whole,
  Steps.Half,
];

const satieScaleDegrees: Array<Steps> = [
  Steps.Whole,
  Steps.Half,
  Steps.Whole + Steps.Half,
  Steps.Half,
  Steps.Whole,
  Steps.Half,
  Steps.Whole
]

const alteredScaleDegrees: Array<Steps> = [
  Steps.Half,
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
  Steps.Whole,
  Steps.Whole,
  Steps.Whole,
];

const dimDomScaleDegrees: Array<Steps> = [
  Steps.Half,
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
  Steps.Half
]

const dorianScaleDegrees: Array<Steps> = [
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
  Steps.Whole,
  Steps.Whole,
  Steps.Half,
  Steps.Whole,
];

export const scales = new Map<string, Array<number>>([
  ["Major", majorScaleDegrees],
  ["Lydian", lydianScaleDegrees],
  ["NaturalMinor", naturalMinorScaleDegrees],
  ["MelodicMinor", melodicMinorScaleDegrees],
  ["HarmonicMinor", harmonicMinorScaleDegrees],
  ["Dorian", dorianScaleDegrees],
  ["Satie", satieScaleDegrees],
  ["Altered", alteredScaleDegrees],
  ["DimDom", dimDomScaleDegrees]
]);
