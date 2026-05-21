export const storageKeys = {
  checks: "guitar-react-checks",
  notes: "guitar-react-notes",
  quiz: "guitar-react-quiz",
  onboardingDone: "guitar-onboarding-done",
};

export const storageKeysExtended = {
  lessonMode: "guitar-react-lesson-mode",
  brandTheme: "guitar-react-brand-theme",
};

export const appBrand = {
  name: "FretBloom",
  tagline: "A guided guitar practice companion for beginners who want to grow from first chords to real music.",
};

export const brandThemes = {
  spruce: {
    label: "Spruce",
    vars: {
      "--bg": "#f3f6f4",
      "--panel": "#ffffff",
      "--panel-strong": "#f8fbf9",
      "--ink": "#0f1c16",
      "--muted": "#516058",
      "--accent": "#059669",
      "--accent-2": "#d05a1e",
      "--accent-subtle": "rgba(5, 150, 105, 0.1)",
      "--line": "#d8e6de",
      "--border": "rgba(15, 28, 22, 0.09)",
      "--border-strong": "rgba(15, 28, 22, 0.15)",
      "--btn-bg": "rgba(15, 28, 22, 0.07)",
      "--header-bar-from": "#0a1f17",
      "--header-bar-to": "#163828",
      "--header-fg": "#e4ede8",
      "--header-fg-muted": "rgba(228, 237, 232, 0.6)",
      "--dock-bg": "rgba(245, 250, 247, 0.94)",
      "--shadow": "0 2px 16px rgba(15, 28, 22, 0.08)",
    },
  },
  ember: {
    label: "Ember",
    vars: {
      "--bg": "#f7f4f1",
      "--panel": "#ffffff",
      "--panel-strong": "#fdf9f6",
      "--ink": "#1c1208",
      "--muted": "#6b5a48",
      "--accent": "#c2410c",
      "--accent-2": "#d97706",
      "--accent-subtle": "rgba(194, 65, 12, 0.1)",
      "--line": "#e8d8cc",
      "--border": "rgba(28, 18, 8, 0.09)",
      "--border-strong": "rgba(28, 18, 8, 0.15)",
      "--btn-bg": "rgba(28, 18, 8, 0.07)",
      "--header-bar-from": "#1f0e05",
      "--header-bar-to": "#3a1a08",
      "--header-fg": "#f0e6dc",
      "--header-fg-muted": "rgba(240, 230, 220, 0.6)",
      "--dock-bg": "rgba(250, 246, 242, 0.95)",
      "--shadow": "0 2px 16px rgba(28, 18, 8, 0.08)",
    },
  },
  tide: {
    label: "Tide",
    vars: {
      "--bg": "#f2f6f8",
      "--panel": "#ffffff",
      "--panel-strong": "#f6fafb",
      "--ink": "#0c1e28",
      "--muted": "#486472",
      "--accent": "#0d9488",
      "--accent-2": "#7c3aed",
      "--accent-subtle": "rgba(13, 148, 136, 0.1)",
      "--line": "#ccd9e2",
      "--border": "rgba(12, 30, 40, 0.09)",
      "--border-strong": "rgba(12, 30, 40, 0.15)",
      "--btn-bg": "rgba(12, 30, 40, 0.07)",
      "--header-bar-from": "#061620",
      "--header-bar-to": "#0e2a38",
      "--header-fg": "#dcedf5",
      "--header-fg-muted": "rgba(220, 237, 245, 0.6)",
      "--dock-bg": "rgba(242, 248, 251, 0.95)",
      "--shadow": "0 2px 16px rgba(12, 30, 40, 0.08)",
    },
  },
};

export const sectionLinks = [
  ["dashboard", "Dashboard"],
  ["lesson-mode", "Lesson Mode"],
  ["start-here", "Start Here"],
  ["visuals", "Visual Lessons"],
  ["chords-tabs", "Chords And TAB"],
  ["audio-lab", "Audio And Fretboard"],
  ["rhythm-lab", "Rhythm Lab"],
  ["practice", "Practice Planner"],
  ["roadmap", "12-Week Plan"],
  ["theory", "Theory Lab"],
  ["songs", "Song Starter Pack"],
  ["resources", "Resources"],
  ["notes", "Notes"],
];

export const navigationGroups = [
  { title: "Start", items: ["dashboard", "lesson-mode", "start-here"] },
  { title: "Learn", items: ["visuals", "chords-tabs", "audio-lab", "theory"] },
  { title: "Practice", items: ["rhythm-lab", "practice", "roadmap", "songs"] },
  { title: "Reflect", items: ["resources", "notes"] },
];

export const sectionDescriptions = {
  "dashboard":    "Progress overview and quick launch",
  "lesson-mode":  "Guided day-by-day learning path",
  "start-here":   "Foundations before you play",
  "visuals":      "Diagrams, anatomy, notation basics",
  "chords-tabs":  "Chord shapes, fingering, and TAB reading",
  "audio-lab":    "Ear training and note recognition",
  "rhythm-lab":   "Metronome and strumming patterns",
  "practice":     "Daily session checklist and timer",
  "roadmap":      "Your full 12-week learning journey",
  "theory":       "Scales, intervals, how music works",
  "songs":        "First real songs to learn and play",
  "resources":    "Curated reference links and tools",
  "notes":        "Journal your practice sessions",
};

export const successChecks = [
  ["goal-tune", "Tune the guitar confidently every day."],
  ["goal-chords", "Switch between Em, Asus2, A, and D in time."],
  ["goal-rhythm", "Count and clap 1 2 3 4 with a metronome."],
  ["goal-melody", "Play one nursery-rhyme melody slowly and cleanly."],
];

export const startChecks = [
  ["start-parts", "I can point to the main parts of the guitar."],
  ["start-strings", "I can say all six string names without looking."],
  ["start-tune", "I tune before every practice session."],
  ["start-rhythm", "I count beats aloud while strumming or clapping."],
];

export const practiceChecks = [
  ["practice-tune", "2 min: Tune the guitar."],
  ["practice-tech", "4 min: Chord drill or left-hand technique."],
  ["practice-rhythm", "4 min: Rhythm with metronome."],
  ["practice-song", "5 min: Song or melody work."],
  ["practice-theory", "3 min: Theory or notation."],
  ["practice-ear", "2 min: Ear training or review."],
];

export const weeklyShape = [
  ["Day 1", "Chords and switching"],
  ["Day 2", "Rhythm and counting"],
  ["Day 3", "Melody and tab"],
  ["Day 4", "Theory and notation"],
  ["Day 5", "Song practice"],
  ["Day 6", "Review and record"],
];

export const roadmap = [
  {
    id: "week-1-2",
    title: "Weeks 1 to 2",
    badge: "Foundation",
    focus: "Hold the guitar correctly, tune every day, memorize string names, learn Em, Asus2, A, D, and play one simple melody.",
    theory: "Musical alphabet, beat, bar, measure, quarter note, half note, basic tab layout.",
    outcome: "Twinkle Twinkle Little Star or Mary Had a Little Lamb as a simple melody.",
    check: "Complete the first two weeks before moving on.",
  },
  {
    id: "week-3-4",
    title: "Weeks 3 to 4",
    badge: "More Chords",
    focus: "Add E, Am, G, C. Start down-up strumming slowly and improve chord pair switching.",
    theory: "Whole steps, half steps, eighth notes, counting 1 & 2 & 3 & 4 &.",
    outcome: "One melody-based rhyme and one two- or three-chord progression in time.",
    check: "I can switch between at least two chord pairs without stopping.",
  },
  {
    id: "week-5-6",
    title: "Weeks 5 to 6",
    badge: "Notation Begins",
    focus: "Cleaner fretting, stronger chord memory, second melody, slow metronome strumming.",
    theory: "Staff, treble clef, note duration review, major scale concept, major and minor mood.",
    outcome: "Happy Birthday melody and one simple open-chord song.",
    check: "I can play one melody without long pauses.",
  },
  {
    id: "week-7-8",
    title: "Weeks 7 to 8",
    badge: "Timing and Scale Logic",
    focus: "Smoother transitions, stronger timing, basic alternate picking.",
    theory: "Major scale formula, intervals, beginner key idea, major versus minor sound.",
    outcome: "Jingle Bells or Row Row Row Your Boat and one chord song in G, C, D, or Em.",
    check: "I can play one complete beginner song slowly in time.",
  },
  {
    id: "week-9-10",
    title: "Weeks 9 to 10",
    badge: "Reading and Function",
    focus: "Alternate picking, first-position melody reading, rhythm consistency.",
    theory: "I IV V, root note, first-position notes on strings 1 and 2.",
    outcome: "Keep one melody, one chord song, and one easy riff or repeated note pattern.",
    check: "I understand that songs are built from both pitch and rhythm.",
  },
  {
    id: "week-11-12",
    title: "Weeks 11 to 12",
    badge: "Consolidation",
    focus: "Combine everything, fix weak transitions, keep time more reliably, and start learning with less hand-holding.",
    theory: "Review all basics, triad idea, tonic or home feeling, simple progression logic.",
    outcome: "At least two simple melodies and one to two simple chord songs or progressions.",
    check: "I can start practice without confusion and know what to work on.",
  },
];

export const flashcards = [
  ["String Names", "Thickest to thinnest?", "E A D G B E"],
  ["Half Step", "What is a half step on guitar?", "Moving by one fret."],
  ["Major vs Minor", "Beginner-level difference?", "Major often sounds brighter. Minor often sounds darker or sadder."],
  ["4/4 Time", "How do you count it?", "1 2 3 4, repeated across each bar."],
  ["TAB", "What does a number on tab mean?", "Play that fret on that string."],
  ["I IV V", "What are these?", "Common chord functions built from scale degrees 1, 4, and 5."],
];

export const quizQuestions = [
  {
    id: "q1",
    prompt: "Which order is correct from thickest to thinnest string?",
    options: ["E A D G B E", "E B G D A E", "A D G B E E"],
    answer: 0,
  },
  {
    id: "q2",
    prompt: "What is a half step on guitar?",
    options: ["Two frets", "One fret", "One string"],
    answer: 1,
  },
  {
    id: "q3",
    prompt: "In 4/4, how many beats are in a bar?",
    options: ["Three", "Four", "Six"],
    answer: 1,
  },
  {
    id: "q4",
    prompt: "What does a number on tablature usually tell you?",
    options: ["Which lyric to sing", "Which fret to play on a string", "How hard to strum"],
    answer: 1,
  },
  {
    id: "q5",
    prompt: "What should happen before almost every practice session?",
    options: ["Learn a new song", "Speed up the metronome", "Tune the guitar"],
    answer: 2,
  },
];

export const theoryResources = [
  {
    title: "JustinGuitar: Guitar Anatomy",
    text: "Pair this with the anatomy diagram to connect the words to a real instrument.",
    href: "https://www.justinguitar.com/guitar-lessons/guitar-anatomy-b0-010",
  },
  {
    title: "JustinGuitar: How To Read Guitar TAB",
    text: "Good first reference for strings, fret numbers, and common tab symbols.",
    href: "https://www.justinguitar.com/guitar-lessons/how-to-read-guitar-tab-mt-202",
  },
  {
    title: "Marty Music: First Acoustic Lessons",
    text: "Useful for chord setup, strumming basics, and a second teaching style.",
    href: "https://www.martymusic.com/free-beginner-acoustic-guitar-lessons",
  },
  {
    title: "musictheory.net Lessons",
    text: "Best lightweight theory source for staff, notes, durations, and scales.",
    href: "https://www.musictheory.net/lessons",
  },
];

export const tabStringOrder = ["e", "B", "G", "D", "A", "E"];

export const chordData = [
  { name: "Em", top: ["0", "2", "2", "0", "0", "0"], dots: [[2, 2], [3, 2]], fingers: [2, 3], hints: ["2nd fret A string", "2nd fret D string", "All other strings open"], frequencies: [82.41, 123.47, 164.81, 196.0, 246.94, 329.63] },
  { name: "Asus2", top: ["X", "0", "2", "2", "0", "0"], dots: [[3, 2], [4, 2]], fingers: [1, 2], hints: ["Mute low E", "2nd fret D", "2nd fret G"], frequencies: [110.0, 146.83, 164.81, 246.94, 329.63] },
  { name: "A", top: ["X", "0", "2", "2", "2", "0"], dots: [[3, 2], [4, 2], [5, 2]], fingers: [1, 2, 3], hints: ["Mute low E", "Three fingers on 2nd fret"], frequencies: [110.0, 164.81, 220.0, 277.18, 329.63] },
  { name: "D", top: ["X", "X", "0", "2", "3", "2"], dots: [[4, 2], [5, 3], [6, 2]], fingers: [1, 3, 2], hints: ["Play top 4 strings", "Triangle shape"], frequencies: [146.83, 220.0, 293.66, 369.99] },
  { name: "E", top: ["0", "2", "2", "1", "0", "0"], dots: [[2, 2], [3, 2], [4, 1]], fingers: [2, 3, 1], hints: ["All strings ring", "1st fret G string"], frequencies: [82.41, 123.47, 164.81, 207.65, 246.94, 329.63] },
  { name: "Am", top: ["X", "0", "2", "2", "1", "0"], dots: [[2, 2], [3, 2], [4, 1]], fingers: [2, 3, 1], hints: ["Like E shape shifted down", "Warm minor sound"], frequencies: [110.0, 164.81, 220.0, 261.63, 329.63] },
  { name: "G", top: ["3", "2", "0", "0", "0", "3"], dots: [[1, 3], [2, 2], [6, 3]], fingers: [2, 1, 3], hints: ["3rd fret low E", "3rd fret high E"], frequencies: [98.0, 123.47, 196.0, 246.94, 293.66, 392.0] },
  { name: "C", top: ["X", "3", "2", "0", "1", "0"], dots: [[2, 3], [3, 2], [5, 1]], fingers: [3, 2, 1], hints: ["3rd fret A string", "1st fret B string"], frequencies: [130.81, 164.81, 196.0, 261.63, 329.63] },
];

export const tabSongs = {
  twinkle: {
    title: "Play The Melody: Twinkle Twinkle",
    intro: "This version stays in first position on the top two strings so it feels natural for a beginner hand.",
    events: [
      { string: "B", fret: "1", frequency: 261.63 },
      { string: "B", fret: "1", frequency: 261.63 },
      { string: "G", fret: "0", frequency: 196.0 },
      { string: "G", fret: "0", frequency: 196.0 },
      { string: "G", fret: "2", frequency: 220.0 },
      { string: "G", fret: "2", frequency: 220.0 },
      { string: "G", fret: "0", frequency: 196.0 },
    ],
    explainer: {
      0: "Read left to right and keep a slow pulse. This phrase uses only open notes plus frets 1 and 2.",
      1: "Play the B string, 1st fret. This is the note C.",
      2: "Repeat the same B string, 1st fret note once more.",
      3: "Move to the open G string.",
      4: "Repeat the open G string.",
      5: "Play the G string, 2nd fret.",
      6: "Repeat the G string, 2nd fret.",
      7: "Return to the open G string to finish the phrase.",
    },
  },
  mary: {
    title: "Play The Melody: Mary Had a Little Lamb",
    intro: "This one moves mostly by step. Use it to train note direction and early tab fluency.",
    events: [
      { string: "e", fret: "3", frequency: 392.0 },
      { string: "e", fret: "2", frequency: 369.99 },
      { string: "e", fret: "0", frequency: 329.63 },
      { string: "e", fret: "2", frequency: 369.99 },
      { string: "e", fret: "3", frequency: 392.0 },
      { string: "e", fret: "3", frequency: 392.0 },
      { string: "e", fret: "3", frequency: 392.0 },
    ],
    explainer: {
      0: "Start on the 1st string 3rd fret, then walk down. Listen for the melody shape going lower, then returning.",
      1: "Play the 3rd fret on the 1st string.",
      2: "Move down to the 2nd fret.",
      3: "Move down again to the open string.",
      4: "Come back up to the 2nd fret.",
      5: "Return to the 3rd fret.",
      6: "Repeat the 3rd fret note.",
      7: "Repeat it once more to close the phrase.",
    },
  },
};

export const strumPatterns = [
  {
    id: "downquarters",
    name: "Quarter Note Downstrokes",
    counts: ["1", "2", "3", "4"],
    strokes: ["D", "D", "D", "D"],
    tip: "Keep the hand moving evenly and let the pick travel through only as much string as needed.",
  },
  {
    id: "eighthflow",
    name: "Basic Down-Up Flow",
    counts: ["1", "&", "2", "&", "3", "&", "4", "&"],
    strokes: ["D", "U", "D", "U", "D", "U", "D", "U"],
    tip: "Do not freeze your hand on the upstroke. Think pendulum, not separate attacks.",
  },
  {
    id: "folkpulse",
    name: "Beginner Folk Pulse",
    counts: ["1", "&", "2", "&", "3", "&", "4", "&"],
    strokes: ["D", "-", "D", "U", "-", "U", "D", "U"],
    tip: "The silent beats still use hand motion. The dash means skip the strings, not stop the arm.",
  },
];

export const progressionPresets = [
  { id: "axis", name: "Pop Foundation: G - D - Em - C", chords: ["G", "D", "Em", "C"] },
  { id: "cadence", name: "Singer-Songwriter Flow: C - G - Am - Em", chords: ["C", "G", "Am", "Em"] },
  { id: "folkcycle", name: "Open-Chord Cycle: Em - C - G - D", chords: ["Em", "C", "G", "D"] },
];

export const progressionChordAudio = {
  C: [130.81, 164.81, 196.0, 261.63, 329.63],
  D: [146.83, 220.0, 293.66, 369.99],
  Em: [82.41, 123.47, 164.81, 196.0, 246.94, 329.63],
  G: [98.0, 123.47, 196.0, 246.94, 293.66, 392.0],
  Am: [110.0, 164.81, 220.0, 261.63, 329.63],
};

export const sectionPhaseRequirements = {
  "start-here": 0,
  visuals: 0,
  "chords-tabs": 0,
  practice: 0,
  roadmap: 0,
  "audio-lab": 1,
  "rhythm-lab": 1,
  theory: 1,
  songs: 1,
  resources: 0,
  notes: 0,
};

export const fretboardStrings = [
  { name: "e", openMidi: 64 },
  { name: "B", openMidi: 59 },
  { name: "G", openMidi: 55 },
  { name: "D", openMidi: 50 },
  { name: "A", openMidi: 45 },
  { name: "E", openMidi: 40 },
];
