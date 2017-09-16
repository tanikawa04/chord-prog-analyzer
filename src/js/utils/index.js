const pitchClass = {
  'B#': 0,
  'C': 0,
  'C#': 1,
  'Db': 1,
  'D': 2,
  'D#': 3,
  'Eb': 3,
  'E': 4,
  'Fb': 4,
  'E#': 5,
  'F': 5,
  'F#': 6,
  'Gb': 6,
  'G': 7,
  'G#': 8,
  'Ab': 8,
  'A': 9,
  'A#': 10,
  'Bb': 10,
  'B': 11,
  'Cb': 11
};

// major (+ 5 natural minor), harmonic minor, melodic minor
const keyPosition = {
  M: [[0, 3, 4], [4, 5], [3, 4]],
  sus4: [[0, 4], [4], [4]],
  aug: [[], [2], [2]],
  m: [[1, 2, 5], [0], [0, 1]],
  dim: [[6], [1, 6], [5, 6]],
  M7: [[0, 3], [5], []],
  '7': [[4], [4], [3, 4]],
  '7sus4': [[4], [4], [4]],
  add9: [[0, 3, 4], [], [3, 4]],
  '6': [[0, 3, 4], [5], []],
  aug7: [[], [], []],
  m7: [[1, 2, 5], [3], [1]],
  mM7: [[], [0], [0]],
  madd9: [[1, 5], [3], []],
  m6: [[1], [], [1]],
  'φ': [[6], [1], [5, 6]],
  dim7: [[], [6], []]
};

export function estimateKey(chord) {
  const pc = pitchClass[chord.root];
  const majLocatedKeys = [
    pc,
    (pc + 10) % 12,
    (pc + 8) % 12,
    (pc + 7) % 12,
    (pc + 5) % 12,
    (pc + 3) % 12,
    (pc + 1) % 12
  ];
  const harMinLocatedKeys = [
    (pc + 3) % 12,
    (pc + 1) % 12,
    pc % 12,
    (pc + 10) % 12,
    (pc + 8) % 12,
    (pc + 7) % 12,
    (pc + 4) % 12,
  ];
  const melMinLocatedKeys = [
    (pc + 3) % 12,
    (pc + 1) % 12,
    pc % 12,
    (pc + 10) % 12,
    (pc + 8) % 12,
    (pc + 6) % 12,
    (pc + 4) % 12,
  ];
  const [
    majPositions,
    harMinPositions,
    melMinPositions
  ] = keyPosition[chord.type];

  const major = majPositions.map(p => [majLocatedKeys[p], p + 1]);
  const naturalMinor = major.map(l => [l[0], (l[1] + 1) % 7 + 1]);
  const harmonicMinor = harMinPositions.map(p => [harMinLocatedKeys[p], p + 1]);
  const melodicMinor = melMinPositions.map(p => [melMinLocatedKeys[p], p + 1]);;

  return {
    major,
    naturalMinor,
    harmonicMinor,
    melodicMinor
  };
}
