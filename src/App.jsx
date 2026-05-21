import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  storageKeys, storageKeysExtended, appBrand, brandThemes,
  sectionLinks, navigationGroups, sectionDescriptions,
  successChecks, startChecks, practiceChecks, weeklyShape,
  roadmap, flashcards, quizQuestions, theoryResources,
  chordData, tabSongs, strumPatterns, progressionPresets, progressionChordAudio,
  sectionPhaseRequirements,
} from "./data.js";
import { playFrequencies, buildRandomTrainerTarget, getTrainerMessage } from "./audio.js";
import { usePersistentState } from "./hooks.js";
import { Section, Card, CheckItem, SimpleLessonCard } from "./components/ui.jsx";
import { GuitarDiagram, ChordAnatomyDiagram, OneStringNotesDiagram, NotationVsTabDiagram } from "./components/diagrams.jsx";
import { NavIcon } from "./components/NavIcon.jsx";
import { BrandLogo } from "./components/BrandLogo.jsx";
import { ChordCard } from "./components/ChordCard.jsx";
import { TabSongCard } from "./components/TabSongCard.jsx";
import { FretboardTrainer } from "./components/FretboardTrainer.jsx";
import { SiteIntro } from "./components/SiteIntro.jsx";

function App() {
  const [checks, setChecks] = usePersistentState(storageKeys.checks, {});
  const [notes, setNotes] = usePersistentState(storageKeys.notes, "");
  const [quizState, setQuizState] = usePersistentState(storageKeys.quiz, {});
  const [revealedCards, setRevealedCards] = useState({});
  const [openRoadmap, setOpenRoadmap] = useState({ "week-1-2": true });
  const [remainingSeconds, setRemainingSeconds] = useState(20 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [songSteps, setSongSteps] = useState({ twinkle: 0, mary: 0 });
  const [trainerMode, setTrainerMode] = useState("coordinate");
  const [trainerTarget, setTrainerTarget] = useState(() => buildRandomTrainerTarget("coordinate"));
  const [trainerMessage, setTrainerMessage] = useState(getTrainerMessage("coordinate"));
  const [lastTrainerGuess, setLastTrainerGuess] = useState(null);
  const [selectedPatternId, setSelectedPatternId] = useState(strumPatterns[0].id);
  const [activeStrumStep, setActiveStrumStep] = useState(0);
  const [isStrumming, setIsStrumming] = useState(false);
  const [selectedProgressionId, setSelectedProgressionId] = useState(progressionPresets[0].id);
  const [progressionTempo, setProgressionTempo] = useState(72);
  const [activeProgressionChord, setActiveProgressionChord] = useState(-1);
  const [isProgressionPlaying, setIsProgressionPlaying] = useState(false);
  const [lessonModePhase, setLessonModePhase] = usePersistentState(storageKeysExtended.lessonMode, 0);
  const [brandThemeId, setBrandThemeId] = usePersistentState(storageKeysExtended.brandTheme, "spruce");
  const [onboardingDone, setOnboardingDone] = usePersistentState(storageKeys.onboardingDone, false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("dashboard");
  const strumTimerRef = useRef(null);
  const progressionTimerRef = useRef(null);

  const lessonSections = useMemo(
    () => ["start-here", "visuals", "chords-tabs", "audio-lab", "rhythm-lab", "practice", "roadmap", "theory", "songs"],
    []
  );

  const allCheckIds = useMemo(
    () =>
      [
        ...successChecks,
        ...startChecks,
        ...practiceChecks,
        ...roadmap.map((item) => [item.id, item.check]),
        ["song-twinkle", ""],
        ["song-mary", ""],
        ["song-happy", ""],
        ["song-jingle", ""],
      ].map(([id]) => id),
    []
  );

  useEffect(() => {
    if (!isRunning) return undefined;
    const timer = window.setInterval(() => {
      setRemainingSeconds((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  const selectedPattern = strumPatterns.find((pattern) => pattern.id === selectedPatternId) ?? strumPatterns[0];
  const currentRoadmap = roadmap[lessonModePhase] ?? roadmap[0];
  const taughtChords = useMemo(() => {
    if (lessonModePhase === 0) return new Set(["Em", "Asus2", "A", "D"]);
    if (lessonModePhase === 1) return new Set(["Em", "Asus2", "A", "D", "E", "Am", "G", "C"]);
    return new Set(chordData.map((chord) => chord.name));
  }, [lessonModePhase]);
  const availableProgressions = useMemo(
    () => progressionPresets.filter((preset) => preset.chords.every((chord) => taughtChords.has(chord))),
    [taughtChords]
  );
  const selectedProgression =
    availableProgressions.find((preset) => preset.id === selectedProgressionId) ?? availableProgressions[0] ?? progressionPresets[0];

  useEffect(() => {
    if (!isStrumming) return undefined;
    const stepMs = selectedPattern.counts.length > 4 ? 300 : 520;
    setActiveStrumStep(0);
    strumTimerRef.current = window.setInterval(() => {
      setActiveStrumStep((current) => (current + 1) % selectedPattern.strokes.length);
    }, stepMs);
    return () => {
      if (strumTimerRef.current) window.clearInterval(strumTimerRef.current);
    };
  }, [isStrumming, selectedPattern]);

  useEffect(() => {
    if (!availableProgressions.some((preset) => preset.id === selectedProgressionId) && availableProgressions.length > 0) {
      setSelectedProgressionId(availableProgressions[0].id);
    }
  }, [availableProgressions, selectedProgressionId]);

  useEffect(() => {
    setTrainerTarget(buildRandomTrainerTarget(trainerMode));
    setLastTrainerGuess(null);
    setTrainerMessage(getTrainerMessage(trainerMode));
  }, [trainerMode]);

  useEffect(() => {
    if (!isProgressionPlaying) return undefined;
    const beatMs = 60000 / progressionTempo;
    const chordMs = beatMs * 4;
    let step = 0;
    const sequence = selectedProgression.chords;
    playFrequencies(progressionChordAudio[sequence[0]], { duration: 1.05, volume: 0.09 });
    setActiveProgressionChord(0);
    progressionTimerRef.current = window.setInterval(() => {
      step = (step + 1) % sequence.length;
      setActiveProgressionChord(step);
      playFrequencies(progressionChordAudio[sequence[step]], { duration: 1.05, volume: 0.09 });
    }, chordMs);
    return () => {
      if (progressionTimerRef.current) window.clearInterval(progressionTimerRef.current);
    };
  }, [isProgressionPlaying, progressionTempo, selectedProgression]);

  function navigateTo(id) {
    if (isSectionLocked(id)) {
      setActiveSectionId("lesson-mode");
      setMobileNavOpen(false);
      return;
    }
    setActiveSectionId(id);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  const completedCount = allCheckIds.filter((id) => checks[id]).length;
  const overallPercent = Math.round((completedCount / allCheckIds.length) * 100);
  const quizScore = quizQuestions.reduce(
    (sum, question) => sum + (quizState[question.id] === question.answer ? 1 : 0),
    0
  );

  function toggleCheck(id) {
    setChecks((current) => ({ ...current, [id]: !current[id] }));
  }

  function answerQuiz(questionId, index) {
    setQuizState((current) => ({ ...current, [questionId]: index }));
  }

  function resetQuiz() {
    setQuizState({});
  }

  function resetTimer() {
    setIsRunning(false);
    setRemainingSeconds(20 * 60);
  }

  function playChord(chord) {
    playFrequencies(chord.frequencies, { duration: 1.1, volume: 0.085 });
  }

  function playChordAsArpeggio(chord) {
    playFrequencies(chord.frequencies, { stagger: 0.12, duration: 0.55, volume: 0.085 });
  }

  function playSongNote(songId, step) {
    if (step < 1) return;
    const frequency = tabSongs[songId].events[step - 1].frequency;
    playFrequencies([frequency], { duration: 0.75, volume: 0.11 });
  }

  function stopProgressionPlayback() {
    setIsProgressionPlaying(false);
    setActiveProgressionChord(-1);
  }

  function handleTrainerGuess(cell) {
    setLastTrainerGuess(cell);
    playFrequencies([cell.frequency], { duration: 0.72, volume: 0.11 });
    if (trainerMode === "note") {
      if (cell.note === trainerTarget.note) {
        setTrainerMessage(`Correct: you found ${cell.note}. Try another one.`);
        setTrainerTarget(buildRandomTrainerTarget(trainerMode));
        return;
      }
      setTrainerMessage(`Not quite. You picked ${cell.note}. Find any ${trainerTarget.note} in the visible area.`);
      return;
    }
    if (cell.string === trainerTarget.string && cell.fret === trainerTarget.fret) {
      setTrainerMessage(`Correct: ${cell.note} on string ${cell.string}, fret ${cell.fret}.`);
      setTrainerTarget(buildRandomTrainerTarget(trainerMode));
      return;
    }
    setTrainerMessage(`Not quite. You picked ${cell.note} on string ${cell.string}, fret ${cell.fret}. Target was ${trainerTarget.note} on string ${trainerTarget.string}, fret ${trainerTarget.fret}.`);
  }

  const progressDegrees = (1 - remainingSeconds / (20 * 60)) * 360;
  const timerText = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(
    remainingSeconds % 60
  ).padStart(2, "0")}`;
  const activeSectionLabel = sectionLinks.find(([id]) => id === activeSectionId)?.[1] ?? "Dashboard";

  function isSectionLocked(sectionId) {
    const requiredPhase = sectionPhaseRequirements[sectionId] ?? 0;
    return lessonModePhase < requiredPhase;
  }

  useEffect(() => {
    document.title = `${appBrand.name} | Guitar Lesson App`;
  }, []);

  useEffect(() => {
    const theme = brandThemes[brandThemeId] ?? brandThemes.spruce;
    Object.entries(theme.vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [brandThemeId]);

  function renderNavLink(id, label) {
    return (
      <a
        href={`#${id}`}
        key={id}
        className={`${activeSectionId === id ? "nav-active" : ""} ${isSectionLocked(id) ? "nav-locked" : ""}`}
        aria-current={activeSectionId === id ? "page" : undefined}
        aria-disabled={isSectionLocked(id) ? "true" : undefined}
        onClick={(event) => {
          event.preventDefault();
          navigateTo(id);
        }}
      >
        <span className="nav-icon" aria-hidden="true">
          <NavIcon sectionId={id} />
        </span>
        {label}
      </a>
    );
  }

  function handleViewClick(event) {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute("href").slice(1);
    if (id && sectionLinks.some(([sectionId]) => sectionId === id)) {
      event.preventDefault();
      navigateTo(id);
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <div className="header-bar">
            <div className="brand-inline">
              <BrandLogo />
              <div className="brand-inline-text">
                <h1>{appBrand.name}</h1>
                <span className="eyebrow">Guitar for beginners</span>
              </div>
            </div>
            <span className="header-section-label">{activeSectionLabel}</span>
          </div>

          <div className="site-nav-shell desktop-nav-only">
            <nav className="nav-list">
              {navigationGroups.map((group) => (
                <div key={group.title} className="nav-group">
                  <p className="nav-group-title">{group.title}</p>
                  <div className="nav-group-links">
                    {group.items.map((id) => {
                      const label = sectionLinks.find(([sectionId]) => sectionId === id)?.[1] ?? id;
                      return renderNavLink(id, label);
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Full-page mobile menu overlay */}
      <div
        className={`fullmenu-overlay ${mobileNavOpen ? "open" : ""}`}
        aria-hidden={!mobileNavOpen}
        aria-label="All sections"
        role="dialog"
      >
        <div className="fullmenu-header">
          <span className="fullmenu-title">Sections</span>
          <button className="fullmenu-close" onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="fullmenu-body">
          {navigationGroups.map((group) => (
            <div key={group.title} className="fullmenu-group">
              <p className="fullmenu-group-title">{group.title}</p>
              <div className="fullmenu-cards">
                {group.items.map((id) => {
                  const label = sectionLinks.find(([sId]) => sId === id)?.[1] ?? id;
                  const desc = sectionDescriptions[id] ?? "";
                  const locked = isSectionLocked(id);
                  const active = activeSectionId === id;
                  return (
                    <button
                      key={id}
                      className={`fullmenu-card ${active ? "fullmenu-card-active" : ""} ${locked ? "fullmenu-card-locked" : ""}`}
                      onClick={() => navigateTo(id)}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className="fullmenu-card-icon">
                        <NavIcon sectionId={id} size={22} />
                      </span>
                      <span className="fullmenu-card-text">
                        <span className="fullmenu-card-name">{label}</span>
                        <span className="fullmenu-card-desc">{desc}</span>
                      </span>
                      {locked && (
                        <span className="fullmenu-lock-badge" aria-label="Locked">
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="content app-view" onClick={handleViewClick}>
        <div key={activeSectionId} className="view-frame">

        {activeSectionId === "dashboard" && (
        <Section id="dashboard" hero title="Your Interactive Guitar Lesson App" subtitle="Built for acoustic guitar, short daily sessions, and a gradual path toward independent playing.">
          <div className="hero-tags">
            {["Acoustic", "20 Min / Day", "50-50 Theory + Playing", "Beginner"].map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          {!onboardingDone && (
            <div className="onboarding-card" role="note" aria-label="Getting started tips">
              <div className="onboarding-header">
                <strong className="onboarding-title">Welcome to FretBloom</strong>
                <button className="onboarding-dismiss" onClick={() => setOnboardingDone(true)} aria-label="Dismiss">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="onboarding-tips">
                <div className="onboarding-tip">
                  <span className="onboarding-tip-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
                  </span>
                  <span><strong>Start with Lesson Mode.</strong> It's your guided daily path and unlocks tools as you progress.</span>
                </div>
                <div className="onboarding-tip">
                  <span className="onboarding-tip-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                  </span>
                  <span><strong>Check off milestones.</strong> Each tick counts toward your progress and unlocks the next phase.</span>
                </div>
                <div className="onboarding-tip">
                  <span className="onboarding-tip-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/></svg>
                  </span>
                  <span><strong>Tap More to explore.</strong> All 13 sections are in the menu — locked ones open when you're ready.</span>
                </div>
              </div>
              <button className="onboarding-cta" onClick={() => { setOnboardingDone(true); navigateTo("lesson-mode"); }}>
                Start Lesson Mode
              </button>
            </div>
          )}

          <div className="dashboard-progress-bar-wrap">
            <div className="dashboard-progress-labels">
              <span className="dashboard-progress-phase">{currentRoadmap.title}</span>
              <span className="dashboard-progress-pct">{overallPercent}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${overallPercent}%` }} />
            </div>
            <span className="dashboard-progress-badge">{currentRoadmap.badge}</span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="small muted no-margin">Stay on one phase until the milestone feels steady, not lucky.</p>
              <div className="button-row wrap top-gap">
                <a className="hero-link" href="#lesson-mode">Open Guided Path</a>
                <a className="hero-link hero-link-secondary" href="#practice">Start Practice</a>
              </div>
            </div>
            <Card title="Success This Month">
              {successChecks.map(([id, label]) => (
                <CheckItem key={id} checked={Boolean(checks[id])} onChange={() => toggleCheck(id)} label={label} />
              ))}
            </Card>
          </div>
          <Card title="Home Screen Launch" className="top-gap launch-card">
            <div className="launch-grid">
              <a className="launch-tile" href="#lesson-mode">
                <span className="launch-icon"><NavIcon sectionId="lesson-mode" /></span>
                <strong>Guided Path</strong>
                <span className="small muted">Open the current learning phase and keep the workload narrow.</span>
              </a>
              <a className="launch-tile" href="#practice">
                <span className="launch-icon"><NavIcon sectionId="practice" /></span>
                <strong>Practice Now</strong>
                <span className="small muted">Jump straight to the 20-minute timer and today's routine.</span>
              </a>
              <a className="launch-tile" href="#notes">
                <span className="launch-icon"><NavIcon sectionId="notes" /></span>
                <strong>Reflect</strong>
                <span className="small muted">Capture what improved, what still feels stiff, and what to fix next.</span>
              </a>
            </div>
          </Card>
        </Section>
        )}

        {activeSectionId === "lesson-mode" && (
        <Section id="lesson-mode" title="Lesson Mode" subtitle="Use this as your guided path. Finish one phase, then unlock the next.">
          <div className="lesson-mode-grid">
            {roadmap.map((item, index) => {
              const unlocked = index === 0 || Boolean(checks[roadmap[index - 1].id]);
              const active = lessonModePhase === index;
              return (
                <article key={item.id} className={`lesson-mode-card ${unlocked ? "" : "locked"} ${active ? "current-lesson" : ""}`}>
                  <div className="lesson-mode-top">
                    <strong>{item.title}</strong>
                    <span className="pill">{item.badge}</span>
                  </div>
                  <p className="small muted">{item.focus}</p>
                  <p className="small"><strong>Milestone:</strong> {item.check}</p>
                  <div className="button-row wrap">
                    <button className="primary" disabled={!unlocked} onClick={() => setLessonModePhase(index)}>
                      {active ? "Current" : "Focus"}
                    </button>
                    <button disabled={!unlocked} onClick={() => setOpenRoadmap((current) => ({ ...current, [item.id]: true }))}>
                      Open Week
                    </button>
                  </div>
                  {!unlocked ? <p className="small muted top-gap no-margin">Locked until you complete {roadmap[index - 1].title}.</p> : null}
                </article>
              );
            })}
          </div>
        </Section>
        )}

        {activeSectionId === "start-here" && (
        <Section id="start-here" title="Start Here" subtitle="These are the first ideas that matter most.">
          <div className="grid grid-4">
            <SimpleLessonCard title="1. Know Your Guitar" text="Learn the parts: headstock, tuning pegs, nut, frets, strings, neck, body, bridge." checked={Boolean(checks["start-parts"])} onChange={() => toggleCheck("start-parts")} label={startChecks[0][1]} />
            <SimpleLessonCard title="2. Memorize String Names" text="From thickest to thinnest: E A D G B E." checked={Boolean(checks["start-strings"])} onChange={() => toggleCheck("start-strings")} label={startChecks[1][1]} />
            <SimpleLessonCard title="3. Tune First" text="Always start practice with a tuned guitar. Use a tuner app without guilt." checked={Boolean(checks["start-tune"])} onChange={() => toggleCheck("start-tune")} label={startChecks[2][1]} />
            <SimpleLessonCard title="4. Rhythm Matters Early" text="Playing the right chord at the wrong time still sounds wrong. Count out loud." checked={Boolean(checks["start-rhythm"])} onChange={() => toggleCheck("start-rhythm")} label={startChecks[3][1]} />
          </div>
        </Section>
        )}

        {activeSectionId === "visuals" && (
        <Section id="visuals" title="Visual Lessons" subtitle="Use these diagrams to learn the instrument and the notation basics.">
          <div className="grid grid-2">
            <Card title="Guitar Anatomy">
              <GuitarDiagram />
              <p className="small muted">The headstock holds the tuning pegs. The nut separates the headstock from the fretboard. Frets divide the neck into note positions. The body amplifies the sound of an acoustic guitar.</p>
            </Card>
            <Card title="Anatomy of a Chord Diagram">
              <ChordAnatomyDiagram />
              <p className="small muted">A chord diagram is a snapshot of the fretboard standing upright. Vertical lines are strings, horizontal lines are frets, and the symbols above the nut tell you whether a string rings open or stays silent.</p>
            </Card>
            <Card title="Notes on One String">
              <OneStringNotesDiagram />
              <p className="small muted">Each fret is one half step. If you know the open string name, you can walk note by note along the neck.</p>
            </Card>
            <Card title="Standard Notation vs TAB">
              <NotationVsTabDiagram />
              <p className="small muted">Standard notation shows pitch and rhythm. TAB shows exactly which string and fret to play on the guitar.</p>
            </Card>
          </div>
        </Section>
        )}

        {activeSectionId === "chords-tabs" && (
        <Section id="chords-tabs" title="Chords And TAB" subtitle="Learn the first shapes, then connect them to simple melodies.">
          <div className="grid chord-grid">
            {chordData.map((chord) => (
              <ChordCard key={chord.name} chord={chord} onPlayChord={() => playChord(chord)} onPlayArpeggio={() => playChordAsArpeggio(chord)} />
            ))}
          </div>
          <div className="grid grid-2 top-gap">
            {Object.entries(tabSongs).map(([songId, song]) => (
              <TabSongCard
                key={songId}
                songId={songId}
                song={song}
                step={songSteps[songId]}
                onStepChange={(nextStep) => {
                  setSongSteps((current) => ({ ...current, [songId]: nextStep }));
                  playSongNote(songId, nextStep);
                }}
                onPlayPhrase={() => playFrequencies(song.events.map((event) => event.frequency), { stagger: 0.34, duration: 0.46, volume: 0.095 })}
              />
            ))}
          </div>
        </Section>
        )}

        {activeSectionId === "audio-lab" && (
        <Section
          id="audio-lab"
          title="Audio And Fretboard"
          subtitle="Hear chords, hear single notes, and drill note locations on the neck."
          locked={isSectionLocked("audio-lab")}
          lockedMessage="Unlock Weeks 3 to 4 first. This tool works best after your first chord family and basic counting are in place."
          requiredPhase={sectionPhaseRequirements["audio-lab"]}
          currentPhase={lessonModePhase}
        >
          <div className="grid grid-2">
            <Card title="Listening Workflow">
              <ul className="rule-list">
                <li>Play the chord as a block first to hear its overall color.</li>
                <li>Then play the arpeggio to hear the notes inside it separately.</li>
                <li>Use the melody playback buttons to connect tab reading with pitch.</li>
                <li>Use the fretboard trainer in short bursts, not long exhausting sessions.</li>
              </ul>
            </Card>
            <Card title="Current Trainer Target">
              <div className="button-row wrap">
                <button className={trainerMode === "coordinate" ? "active-step" : ""} onClick={() => setTrainerMode("coordinate")}>
                  Exact String + Fret
                </button>
                <button className={trainerMode === "note" ? "active-step" : ""} onClick={() => setTrainerMode("note")}>
                  Note Name Hunt
                </button>
              </div>
              <p className="count">{trainerTarget.note}</p>
              <p className="small muted">
                {trainerMode === "coordinate"
                  ? `Find ${trainerTarget.note} on string ${trainerTarget.string}, fret ${trainerTarget.fret}. This is a location drill.`
                  : `Find any ${trainerTarget.note} in the visible area. This is a note-name drill, not an exact-location drill.`}
              </p>
              <div className="button-row wrap">
                <button className="primary" onClick={() => { setTrainerTarget(buildRandomTrainerTarget(trainerMode)); setLastTrainerGuess(null); setTrainerMessage(getTrainerMessage(trainerMode)); }}>
                  New Target
                </button>
                <button onClick={() => playFrequencies([trainerTarget.frequency], { duration: 0.75, volume: 0.11 })}>Play Target Note</button>
              </div>
              <p className="small muted top-gap no-margin">{trainerMessage}</p>
            </Card>
          </div>
          <Card title="Clickable Fretboard Trainer" className="top-gap">
            <FretboardTrainer lastGuess={lastTrainerGuess} onGuess={handleTrainerGuess} />
          </Card>
        </Section>
        )}

        {activeSectionId === "rhythm-lab" && (
        <Section
          id="rhythm-lab"
          title="Rhythm Lab"
          subtitle="Train your right hand first, then hear chord changes in time."
          locked={isSectionLocked("rhythm-lab")}
          lockedMessage="Unlock Weeks 3 to 4 first. Rhythm drills help more once your first chord changes are usable."
          requiredPhase={sectionPhaseRequirements["rhythm-lab"]}
          currentPhase={lessonModePhase}
        >
          <div className="grid grid-2">
            <Card title="Animated Strumming Patterns">
              <div className="button-row wrap">
                {strumPatterns.map((pattern) => (
                  <button key={pattern.id} className={selectedPatternId === pattern.id ? "active-step" : ""} onClick={() => { setSelectedPatternId(pattern.id); setIsStrumming(false); setActiveStrumStep(0); }}>
                    {pattern.name}
                  </button>
                ))}
              </div>
              <div className="strum-strip top-gap">
                {selectedPattern.strokes.map((stroke, index) => (
                  <div key={`${stroke}-${index}`} className={`strum-cell ${activeStrumStep === index && isStrumming ? "active-strum" : ""}`}>
                    <div className="strum-count">{selectedPattern.counts[index]}</div>
                    <div className={`strum-arrow ${stroke === "U" ? "up" : stroke === "-" ? "mute" : "down"}`}>{stroke === "-" ? "•" : stroke}</div>
                  </div>
                ))}
              </div>
              <p className="small muted top-gap">{selectedPattern.tip}</p>
              <div className="button-row wrap top-gap">
                <button className="primary" onClick={() => setIsStrumming(true)}>Animate</button>
                <button onClick={() => setIsStrumming(false)}>Pause</button>
                <button onClick={() => { setIsStrumming(false); setActiveStrumStep(0); }}>Reset</button>
              </div>
            </Card>
            <Card title="Chord Progression Playback">
              <div className="button-row wrap">
                {availableProgressions.map((preset) => (
                  <button key={preset.id} className={selectedProgressionId === preset.id ? "active-step" : ""} onClick={() => { stopProgressionPlayback(); setSelectedProgressionId(preset.id); }}>
                    {preset.name}
                  </button>
                ))}
              </div>
              {lessonModePhase < 2 ? <p className="small muted top-gap">More progressions appear as you unlock more chords.</p> : null}
              <label className="slider-label top-gap">
                <span>Tempo: {progressionTempo} BPM</span>
                <input type="range" min="50" max="120" step="1" value={progressionTempo} onChange={(event) => setProgressionTempo(Number(event.target.value))} />
              </label>
              <div className="progression-strip top-gap">
                {selectedProgression.chords.map((chord, index) => (
                  <button key={`${selectedProgression.id}-${chord}-${index}`} className={`progression-chord ${activeProgressionChord === index ? "active-progression" : ""}`} onClick={() => playFrequencies(progressionChordAudio[chord], { duration: 1.05, volume: 0.09 })}>
                    {chord}
                  </button>
                ))}
              </div>
              <p className="small muted top-gap">Each chord lasts one bar of 4/4. Start slow and count out loud: 1 2 3 4 before each change.</p>
              <div className="button-row wrap top-gap">
                <button className="primary" onClick={() => setIsProgressionPlaying(true)}>Play Loop</button>
                <button onClick={stopProgressionPlayback}>Stop</button>
              </div>
            </Card>
          </div>
        </Section>
        )}

        {activeSectionId === "practice" && (
        <Section id="practice" title="Practice Planner" subtitle="Use this simple 20-minute routine.">
          <div className="practice-grid">
            <Card className="timer-card">
              <div className="timer-ring" style={{ background: `conic-gradient(var(--accent) ${progressDegrees}deg, #e8dcc8 0deg)` }}>
                <div className="timer-ring-inner" />
              </div>
              <div className="timer-label">
                <div className="small muted">Session Timer</div>
                <div className="timer-text">{timerText}</div>
              </div>
              <div className="button-row">
                <button className="primary" onClick={() => setIsRunning(true)}>Start</button>
                <button onClick={() => setIsRunning(false)}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
              </div>
            </Card>
            <div className="stack">
              <Card title="20-Minute Session">
                {practiceChecks.map(([id, label]) => (
                  <CheckItem key={id} checked={Boolean(checks[id])} onChange={() => toggleCheck(id)} label={label} />
                ))}
              </Card>
              <Card title="Weekly Shape">
                <div className="mini-grid">
                  {weeklyShape.map(([day, text]) => (
                    <div key={day}>
                      <strong>{day}</strong>
                      <p className="small muted">{text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Section>
        )}

        {activeSectionId === "roadmap" && (
        <Section id="roadmap" title="Personalized 12-Week Plan" subtitle="Each block gives you one technical focus, one theory focus, and one musical outcome.">
          <div className="stack">
            {roadmap.map((item) => (
              <div className={`accordion ${openRoadmap[item.id] ? "open" : ""}`} key={item.id}>
                <button className="accordion-toggle" onClick={() => setOpenRoadmap((current) => ({ ...current, [item.id]: !current[item.id] }))}>
                  <span>{item.title}</span>
                  <span className="muted">{item.badge}</span>
                </button>
                {openRoadmap[item.id] ? (
                  <div className="accordion-body">
                    <p><strong>Focus:</strong> {item.focus}</p>
                    <p><strong>Theory:</strong> {item.theory}</p>
                    <p><strong>Playable outcome:</strong> {item.outcome}</p>
                    <CheckItem checked={Boolean(checks[item.id])} onChange={() => toggleCheck(item.id)} label={item.check} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </Section>
        )}

        {activeSectionId === "theory" && (
        <Section id="theory" title="Theory Lab" subtitle="Flip short cards often instead of cramming theory in long sessions." locked={isSectionLocked("theory")} lockedMessage="Unlock Weeks 3 to 4 first. This section reinforces the practical work after your first chord block." requiredPhase={sectionPhaseRequirements["theory"]} currentPhase={lessonModePhase}>
          <div className="grid grid-3">
            {flashcards.map(([title, prompt, answer]) => (
              <button key={title} className={`flashcard ${revealedCards[title] ? "revealed" : ""}`} onClick={() => setRevealedCards((current) => ({ ...current, [title]: !current[title] }))}>
                <strong>{title}</strong>
                <div className="small muted">{prompt}</div>
                {revealedCards[title] ? <div className="answer">{answer}</div> : null}
              </button>
            ))}
          </div>
          <Card title="Quick Quiz" className="top-gap">
            {quizQuestions.map((question, index) => (
              <div className="quiz-block" key={question.id}>
                <strong>{index + 1}. {question.prompt}</strong>
                <div className="stack small-gap">
                  {question.options.map((option, optionIndex) => {
                    const answered = quizState[question.id] !== undefined;
                    const isCorrect = optionIndex === question.answer;
                    const isChosen = quizState[question.id] === optionIndex;
                    return (
                      <button key={option} className={`quiz-option ${answered && isCorrect ? "correct" : ""} ${answered && isChosen && !isCorrect ? "wrong" : ""}`} onClick={() => answerQuiz(question.id, optionIndex)} disabled={answered}>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="button-row">
              <button className="primary" onClick={resetQuiz}>Reset Quiz</button>
              <span className="small muted">Score: {quizScore}/{quizQuestions.length}</span>
            </div>
          </Card>
        </Section>
        )}

        {activeSectionId === "songs" && (
        <Section id="songs" title="Song Starter Pack" subtitle="These are strong first songs because they are familiar and easy to hear." locked={isSectionLocked("songs")} lockedMessage="Unlock Weeks 3 to 4 first. These songs work better once your first chord group and counting basics are in place." requiredPhase={sectionPhaseRequirements["songs"]} currentPhase={lessonModePhase}>
          <div className="grid grid-4">
            <SimpleLessonCard title="Twinkle Twinkle Little Star" text="Use first as a melody. Later try simple chord support." checked={Boolean(checks["song-twinkle"])} onChange={() => toggleCheck("song-twinkle")} label="I can play at least the first phrase." />
            <SimpleLessonCard title="Mary Had a Little Lamb" text="Excellent for simple note motion and basic tab reading." checked={Boolean(checks["song-mary"])} onChange={() => toggleCheck("song-mary")} label="I can play it slowly without losing the shape." />
            <SimpleLessonCard title="Happy Birthday" text="Good next melody because the rhythm is slightly less uniform." checked={Boolean(checks["song-happy"])} onChange={() => toggleCheck("song-happy")} label="I can play the melody with pauses in the right places." />
            <SimpleLessonCard title="Jingle Bells" text="Useful when you want more repetition and timing control." checked={Boolean(checks["song-jingle"])} onChange={() => toggleCheck("song-jingle")} label="I can keep the repeated-note rhythm under control." />
          </div>
        </Section>
        )}

        {activeSectionId === "resources" && (
        <Section id="resources" title="Reference Stack" subtitle="Keep the resource list small. More sources usually means more noise.">
          <div className="grid grid-2">
            <Card>
              <div className="stack">
                {theoryResources.map((resource) => (
                  <a key={resource.title} className="resource-link" href={resource.href} target="_blank" rel="noreferrer">
                    <strong>{resource.title}</strong>
                    <span className="small muted">{resource.text}</span>
                  </a>
                ))}
              </div>
            </Card>
            <Card title="When You Feel Lost">
              <ul className="rule-list">
                <li>One main guitar course</li>
                <li>One theory site</li>
                <li>One simple song at a time</li>
                <li>One small weekly milestone</li>
              </ul>
              <p className="small muted">Do not solve confusion by collecting more lessons.</p>
            </Card>
          </div>
        </Section>
        )}

        {activeSectionId === "notes" && (
        <Section id="notes" title="Practice Notes" subtitle="Track what improved, what feels weak, and what to fix next.">
          <div className="grid grid-2">
            <Card title="Daily Notes">
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Example: Today Em to Asus2 felt cleaner. A to D is still slow. I lost time when I stopped counting aloud." />
            </Card>
            <Card title="Weekly Reflection">
              <p className="count">{completedCount}</p>
              <p className="small muted">tracked items completed</p>
              <ul className="rule-list">
                <li>What improved this week?</li>
                <li>Which chord pair is still weak?</li>
                <li>Did I practice in time or only press correct notes?</li>
                <li>Can I hear more mistakes before I stop?</li>
              </ul>
            </Card>
          </div>
        </Section>
        )}

        </div>
      </main>

      {/* Mobile bottom dock */}
      <nav className="mobile-bottom-nav" aria-label="Quick navigation">
        {[
          ["dashboard", "Home"],
          ["lesson-mode", "Lessons"],
          ["practice", "Practice"],
          ["roadmap", "Progress"],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`bottom-nav-item ${activeSectionId === id ? "bottom-nav-active" : ""} ${isSectionLocked(id) ? "bottom-nav-locked" : ""}`}
            onClick={(e) => { e.preventDefault(); navigateTo(id); }}
          >
            <span className="bottom-nav-icon"><NavIcon sectionId={id} /></span>
            <span className="bottom-nav-label">{label}</span>
          </a>
        ))}
        <button
          className={`bottom-nav-item bottom-nav-more ${mobileNavOpen ? "bottom-nav-active" : ""}`}
          aria-expanded={mobileNavOpen}
          aria-controls="fullmenu"
          onClick={() => setMobileNavOpen((v) => !v)}
        >
          <span className="bottom-nav-icon">
            {mobileNavOpen
              ? <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              : <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="12" cy="19" r="1.2" /></svg>
            }
          </span>
          <span className="bottom-nav-label">{mobileNavOpen ? "Close" : "More"}</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
