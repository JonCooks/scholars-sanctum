import { useState, useEffect, useCallback } from "react";

// ─── STYLES ────────────────────────────────────────────────────────────────
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Cinzel:wght@400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:         #0e0c09;
    --bg2:        #161410;
    --bg3:        #1e1b16;
    --bg4:        #252118;
    --border:     #3a3020;
    --border2:    #4a3f28;
    --gold:       #c9a84c;
    --gold2:      #e8c97a;
    --gold3:      #f5e0a0;
    --cream:      #f0e6d0;
    --cream2:     #d4c4a0;
    --text:       #e8dcc8;
    --text2:      #c4b090;
    --text3:      #907860;
    --red:        #8b3a3a;
    --green:      #3a6b3a;
    --blue:       #2a4a6b;
    --accent:     #6b4c2a;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 16px;
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app-wrapper {
    display: flex;
    min-height: 100vh;
    background:
      radial-gradient(ellipse at 20% 0%, rgba(201,168,76,0.04) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 100%, rgba(107,76,42,0.06) 0%, transparent 60%),
      var(--bg);
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 240px;
    min-width: 240px;
    background: var(--bg2);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    z-index: 100;
    overflow-y: auto;
  }

  .sidebar-logo {
    padding: 28px 20px 20px;
    border-bottom: 1px solid var(--border);
    text-align: center;
  }

  .sidebar-logo h1 {
    font-family: 'Cinzel', serif;
    font-size: 15px;
    letter-spacing: 3px;
    color: var(--gold);
    text-transform: uppercase;
    line-height: 1.4;
  }

  .sidebar-logo p {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 11px;
    color: var(--text3);
    margin-top: 4px;
    letter-spacing: 1px;
  }

  .sidebar-ornament {
    text-align: center;
    color: var(--gold);
    font-size: 14px;
    margin: 6px 0 2px;
    opacity: 0.6;
  }

  .nav-section {
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
  }

  .nav-section-title {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 2.5px;
    color: var(--text3);
    text-transform: uppercase;
    padding: 4px 20px 8px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 20px;
    cursor: pointer;
    color: var(--text2);
    font-size: 14px;
    font-family: 'EB Garamond', serif;
    transition: all 0.2s;
    border-left: 2px solid transparent;
  }

  .nav-item:hover { background: var(--bg3); color: var(--text); }
  .nav-item.active {
    background: var(--bg3);
    color: var(--gold2);
    border-left-color: var(--gold);
  }

  .nav-item .icon { font-size: 15px; width: 18px; text-align: center; }

  /* ── MAIN CONTENT ── */
  .main-content {
    margin-left: 240px;
    flex: 1;
    min-height: 100vh;
    padding: 32px 40px;
    max-width: calc(100vw - 240px);
  }

  .page-header {
    margin-bottom: 28px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }

  .page-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: var(--gold2);
    font-weight: 600;
  }

  .page-header p {
    color: var(--text3);
    font-style: italic;
    font-size: 14px;
    margin-top: 4px;
  }

  /* ── CARDS ── */
  .card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 16px;
  }

  .card-title {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── GRID ── */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  /* ── BUTTONS ── */
  .btn {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 1.5px;
    padding: 8px 18px;
    border: 1px solid var(--border2);
    border-radius: 2px;
    cursor: pointer;
    background: transparent;
    color: var(--text2);
    transition: all 0.2s;
    text-transform: uppercase;
  }

  .btn:hover { background: var(--bg3); color: var(--gold2); border-color: var(--gold); }

  .btn-primary {
    background: var(--gold);
    color: var(--bg);
    border-color: var(--gold);
  }

  .btn-primary:hover { background: var(--gold2); border-color: var(--gold2); color: var(--bg); }

  .btn-sm { padding: 5px 12px; font-size: 10px; }
  .btn-danger { border-color: var(--red); color: #c06060; }
  .btn-danger:hover { background: rgba(139,58,58,0.2); color: #e08080; }

  /* ── INPUTS ── */
  input, textarea, select {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 2px;
    color: var(--text);
    font-family: 'EB Garamond', serif;
    font-size: 15px;
    padding: 8px 12px;
    width: 100%;
    outline: none;
    transition: border-color 0.2s;
  }

  input:focus, textarea:focus, select:focus {
    border-color: var(--gold);
  }

  input::placeholder, textarea::placeholder { color: var(--text3); }

  select option { background: var(--bg2); }

  label {
    display: block;
    font-size: 12px;
    font-family: 'Cinzel', serif;
    letter-spacing: 1px;
    color: var(--text3);
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .form-group { margin-bottom: 14px; }

  /* ── TAGS ── */
  .tag {
    display: inline-block;
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 2px;
    border: 1px solid;
  }

  .tag-gold { border-color: var(--gold); color: var(--gold); }
  .tag-green { border-color: #5a8b5a; color: #7ab07a; }
  .tag-red { border-color: #8b4a4a; color: #c07070; }
  .tag-blue { border-color: #3a5a8b; color: #6a90c0; }
  .tag-purple { border-color: #6a3a8b; color: #a070c0; }

  /* ── PROGRESS ── */
  .progress-bar {
    height: 4px;
    background: var(--bg4);
    border-radius: 2px;
    overflow: hidden;
    margin-top: 6px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold), var(--gold2));
    border-radius: 2px;
    transition: width 0.5s ease;
  }

  /* ── DIVIDER ── */
  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 16px 0;
  }

  /* ── TODAY VIEW ── */
  .time-block {
    display: flex;
    gap: 14px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    align-items: flex-start;
    cursor: pointer;
    transition: background 0.15s;
    border-radius: 3px;
    padding-left: 8px;
  }

  .time-block:hover { background: var(--bg3); }

  .time-block.current { background: rgba(201,168,76,0.06); border-left: 2px solid var(--gold); }
  .time-block.done { opacity: 0.5; }

  .time-label {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    color: var(--gold);
    min-width: 52px;
    margin-top: 3px;
    letter-spacing: 0.5px;
  }

  .block-content { flex: 1; }
  .block-title { font-size: 15px; color: var(--text); }
  .block-sub { font-size: 13px; color: var(--text3); font-style: italic; margin-top: 2px; }

  /* ── INSPIRATION ── */
  .quote-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-left: 3px solid var(--gold);
    border-radius: 4px;
    padding: 20px 24px;
    margin-bottom: 14px;
    position: relative;
  }

  .quote-card::before {
    content: '"';
    font-family: 'Playfair Display', serif;
    font-size: 80px;
    color: var(--gold);
    opacity: 0.12;
    position: absolute;
    top: -10px; left: 12px;
    line-height: 1;
  }

  .quote-text {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 17px;
    color: var(--cream2);
    line-height: 1.7;
    margin-bottom: 10px;
  }

  .quote-attr {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--gold);
    text-transform: uppercase;
  }

  /* ── NOTES ── */
  .notebook-list { }

  .notebook-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 3px;
    cursor: pointer;
    margin-bottom: 8px;
    transition: all 0.2s;
  }

  .notebook-item:hover { border-color: var(--gold); color: var(--gold2); }
  .notebook-item.selected { border-color: var(--gold); background: var(--bg3); }

  .page-list { margin-top: 8px; }

  .page-item {
    padding: 8px 12px;
    border-left: 2px solid var(--border);
    cursor: pointer;
    font-size: 14px;
    color: var(--text2);
    transition: all 0.15s;
    margin-bottom: 4px;
  }

  .page-item:hover { border-left-color: var(--gold); color: var(--text); }
  .page-item.selected { border-left-color: var(--gold); color: var(--gold2); }

  /* ── PAST PAPERS ── */
  .subject-tab {
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: 2px;
    cursor: pointer;
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text2);
    background: var(--bg2);
    transition: all 0.2s;
  }

  .subject-tab:hover { border-color: var(--gold); color: var(--gold2); }
  .subject-tab.active { background: var(--bg3); border-color: var(--gold); color: var(--gold); }

  .paper-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
  }

  .paper-row:last-child { border-bottom: none; }

  /* ── RESULTS ── */
  .result-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
  }

  .score-badge {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    font-weight: 600;
    min-width: 50px;
    text-align: center;
  }

  .score-a { color: #7ab07a; }
  .score-b { color: var(--gold2); }
  .score-c { color: #c09040; }
  .score-d { color: #c07070; }

  /* ── SPANISH ── */
  .flashcard {
    perspective: 1000px;
    cursor: pointer;
    height: 200px;
    margin-bottom: 20px;
  }

  .flashcard-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
  }

  .flashcard.flipped .flashcard-inner { transform: rotateY(180deg); }

  .flashcard-front, .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border2);
    border-radius: 6px;
    background: var(--bg2);
    padding: 24px;
  }

  .flashcard-back { transform: rotateY(180deg); background: var(--bg3); border-color: var(--gold); }

  .flashcard-word {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    color: var(--gold2);
    margin-bottom: 8px;
    text-align: center;
  }

  .flashcard-hint {
    font-size: 13px;
    color: var(--text3);
    font-style: italic;
    text-align: center;
  }

  /* ── FORGETTING CURVE ── */
  .topic-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 13px;
    margin: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .topic-pill:hover { border-color: var(--gold); color: var(--gold2); }

  .retention-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── CALENDAR / DATES ── */
  .event-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
  }

  .event-date-box {
    min-width: 50px;
    text-align: center;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 6px;
  }

  .event-date-day {
    font-family: 'Cinzel', serif;
    font-size: 20px;
    color: var(--gold);
    line-height: 1;
  }

  .event-date-month {
    font-size: 10px;
    color: var(--text3);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* AI CHAT */
  .ai-response {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-left: 3px solid var(--gold);
    border-radius: 3px;
    padding: 16px;
    font-size: 14px;
    line-height: 1.8;
    color: var(--text);
    white-space: pre-wrap;
    font-style: italic;
  }

  .loading-dots span {
    animation: blink 1.2s infinite;
    font-size: 20px;
    color: var(--gold);
  }

  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes blink {
    0%,100% { opacity: 0.2; }
    50% { opacity: 1; }
  }

  /* ── SCROLL ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg2); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--gold); }

  /* ── MISC ── */
  .ornament { color: var(--gold); opacity: 0.5; margin: 0 8px; font-size: 13px; }
  .text-gold { color: var(--gold2); }
  .text-muted { color: var(--text3); font-style: italic; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .gap-4 { gap: 16px; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .mb-3 { margin-bottom: 12px; }
  .mb-4 { margin-bottom: 16px; }
  .mt-3 { margin-top: 12px; }
  .mt-4 { margin-top: 16px; }
  .w-full { width: 100%; }

  .decorative-border {
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 3px;
  }

  .decorative-border-inner {
    border: 1px solid var(--border2);
    border-radius: 3px;
    padding: 20px;
  }

  textarea.notes-editor {
    min-height: 300px;
    resize: vertical;
    font-size: 15px;
    line-height: 1.8;
  }

  .image-banner {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 3px;
    border: 1px solid var(--border);
    margin-bottom: 16px;
    opacity: 0.6;
    filter: sepia(0.4) brightness(0.7);
  }

  .unsplash-img {
    width: 100%;
    height: 100px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text3);
    font-size: 12px;
    font-style: italic;
    margin-bottom: 12px;
    overflow: hidden;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal {
    background: var(--bg2);
    border: 1px solid var(--border2);
    border-radius: 6px;
    padding: 28px;
    max-width: 560px;
    width: 100%;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
  }

  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: var(--gold2);
    margin-bottom: 18px;
  }

  .close-btn {
    position: absolute;
    top: 14px; right: 14px;
    background: none;
    border: none;
    color: var(--text3);
    font-size: 18px;
    cursor: pointer;
  }

  .close-btn:hover { color: var(--text); }

  .badge {
    display: inline-block;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--gold);
    color: var(--bg);
    font-size: 11px;
    font-family: 'Cinzel', serif;
    font-weight: 600;
    text-align: center;
    line-height: 20px;
    margin-left: 4px;
  }
`;

// ─── DATA ──────────────────────────────────────────────────────────────────

const INSPIRATIONS = [
  {
    name: "Amy Wang",
    role: "Entrepreneur & Innovator",
    motto: "Excellence is not a destination but a continuous journey that never ends.",
    quotes: [
      "Every setback is a setup for a comeback. Rise with more wisdom.",
      "Excellence is not a destination but a continuous journey that never ends.",
      "The most powerful investment you can make is in yourself."
    ]
  },
  {
    name: "Kobe Bryant",
    role: "The Black Mamba",
    motto: "Rest at the end, not in the middle.",
    quotes: [
      "Rest at the end, not in the middle.",
      "The most important thing is to try and inspire people so that they can be great in whatever they want to do.",
      "If you're afraid to fail, then you're probably going to fail. Everything negative is an opportunity in disguise."
    ]
  },
  {
    name: "Eileen Gu",
    role: "Olympic Champion",
    motto: "I want to inspire people to believe in themselves.",
    quotes: [
      "I don't want to be defined by my sport. I want to define myself by what I create.",
      "The best skill you can have is the ability to learn anything quickly.",
      "Fear is just a signal that you're about to do something brave."
    ]
  },
  {
    name: "Michael Jordan",
    role: "The Greatest",
    motto: "Limits, like fears, are often just an illusion.",
    quotes: [
      "Limits, like fears, are often just an illusion.",
      "I've failed over and over again in my life. And that is why I succeed.",
      "Always turn a negative situation into a positive situation."
    ]
  },
  {
    name: "Cristiano Ronaldo",
    role: "CR7",
    motto: "Your love for what you do and willingness to push yourself where others aren't willing to go is what will make you great.",
    quotes: [
      "Talent without working hard is nothing.",
      "I always want more, whether it's a goal, a title, or personal glory. The day I stop wanting more is the day I retire.",
      "Dreams are not what you see in sleep, dreams are things which do not let you sleep."
    ]
  },
  {
    name: "Neymar Jr.",
    role: "Ney",
    motto: "I am not the best, but I am trying to be the best.",
    quotes: [
      "I am not the best, but I am trying to be the best.",
      "Every sacrifice made today is an investment in tomorrow's glory.",
      "Playing with joy — that is the secret. Never let them steal your joy."
    ]
  }
];

const CIRCADIAN_SCHEDULE = [
  { time: "06:00", label: "Rise & Hydrate", type: "routine", energy: "low", desc: "Gentle wake, water, light stretch" },
  { time: "06:30", label: "Review Today's Plan", type: "planning", energy: "low", desc: "5 min review of schedule" },
  { time: "07:00", label: "Peak Focus — Study", type: "study", energy: "peak", desc: "Cortisol peak: perfect for hard material" },
  { time: "09:30", label: "Active Recall Break", type: "review", energy: "peak", desc: "Spaced repetition review (15 min)" },
  { time: "10:00", label: "Continue Study", type: "study", energy: "peak", desc: "Deep work continues" },
  { time: "12:00", label: "Lunch & Rest", type: "break", energy: "low", desc: "Nourish — avoid cognitive overload" },
  { time: "13:00", label: "Reading", type: "reading", energy: "medium", desc: "Post-lunch dip: lighter cognitive load" },
  { time: "14:00", label: "New Skill Learning", type: "skill", energy: "medium", desc: "Afternoon recovery window" },
  { time: "15:30", label: "Spanish Practice", type: "spanish", energy: "medium", desc: "Language learning — pattern recognition" },
  { time: "16:30", label: "Second Study Block", type: "study", energy: "peak2", desc: "Second peak — consolidation work" },
  { time: "18:30", label: "Physical Activity / Chess", type: "chess", energy: "medium", desc: "Body + strategic mind" },
  { time: "19:30", label: "Dinner & Decompress", type: "break", energy: "low", desc: "Social time, light activity" },
  { time: "20:30", label: "Light Review / Notes", type: "review", energy: "low", desc: "Consolidate today's learning" },
  { time: "21:30", label: "Wind Down", type: "routine", energy: "low", desc: "No screens, prepare for sleep" },
];

const PAST_PAPERS = {
  "AQA A-Level Physics": [
    { year: "2023", paper: "Paper 1", unit: "Measurements & Mechanics", link: "https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408/assessment-resources" },
    { year: "2023", paper: "Paper 2", unit: "Electricity & Fields", link: "https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408/assessment-resources" },
    { year: "2023", paper: "Paper 3", unit: "Practical & Options", link: "https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408/assessment-resources" },
    { year: "2022", paper: "Paper 1", unit: "Measurements & Mechanics", link: "https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408/assessment-resources" },
    { year: "2022", paper: "Paper 2", unit: "Electricity & Fields", link: "https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408/assessment-resources" },
    { year: "2022", paper: "Paper 3", unit: "Practical & Options", link: "https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408/assessment-resources" },
    { year: "2019", paper: "Paper 1", unit: "Measurements & Mechanics", link: "https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408/assessment-resources" },
    { year: "2019", paper: "Paper 2", unit: "Electricity & Fields", link: "https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408/assessment-resources" },
    { year: "2018", paper: "Paper 1", unit: "Measurements & Mechanics", link: "https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408/assessment-resources" },
    { year: "2018", paper: "Paper 2", unit: "Electricity & Fields", link: "https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408/assessment-resources" },
  ],
  "Edexcel A-Level Maths": [
    { year: "2023", paper: "Paper 1 (Pure)", unit: "Pure Mathematics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html#tab2" },
    { year: "2023", paper: "Paper 2 (Pure)", unit: "Pure Mathematics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html#tab2" },
    { year: "2023", paper: "Paper 3 (Stats & Mech)", unit: "Statistics & Mechanics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html#tab2" },
    { year: "2022", paper: "Paper 1 (Pure)", unit: "Pure Mathematics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html#tab2" },
    { year: "2022", paper: "Paper 2 (Pure)", unit: "Pure Mathematics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html#tab2" },
    { year: "2022", paper: "Paper 3 (Stats & Mech)", unit: "Statistics & Mechanics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html#tab2" },
    { year: "2019", paper: "Paper 1 (Pure)", unit: "Pure Mathematics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html#tab2" },
    { year: "2019", paper: "Paper 3 (Stats & Mech)", unit: "Statistics & Mechanics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html#tab2" },
  ],
  "Edexcel A-Level Further Maths": [
    { year: "2023", paper: "Core Pure 1", unit: "Core Pure Mathematics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html#tab2" },
    { year: "2023", paper: "Core Pure 2", unit: "Core Pure Mathematics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html#tab2" },
    { year: "2023", paper: "Further Pure 1", unit: "Further Pure", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html#tab2" },
    { year: "2022", paper: "Core Pure 1", unit: "Core Pure Mathematics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html#tab2" },
    { year: "2022", paper: "Core Pure 2", unit: "Core Pure Mathematics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html#tab2" },
    { year: "2019", paper: "Core Pure 1", unit: "Core Pure Mathematics", link: "https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html#tab2" },
  ],
  "AQA A-Level Philosophy": [
    { year: "2023", paper: "Paper 1", unit: "Epistemology & Moral Phil.", link: "https://www.aqa.org.uk/subjects/philosophy/as-and-a-level/philosophy-7172/assessment-resources" },
    { year: "2023", paper: "Paper 2", unit: "Metaphysics & Phil. of Mind", link: "https://www.aqa.org.uk/subjects/philosophy/as-and-a-level/philosophy-7172/assessment-resources" },
    { year: "2022", paper: "Paper 1", unit: "Epistemology & Moral Phil.", link: "https://www.aqa.org.uk/subjects/philosophy/as-and-a-level/philosophy-7172/assessment-resources" },
    { year: "2022", paper: "Paper 2", unit: "Metaphysics & Phil. of Mind", link: "https://www.aqa.org.uk/subjects/philosophy/as-and-a-level/philosophy-7172/assessment-resources" },
    { year: "2019", paper: "Paper 1", unit: "Epistemology & Moral Phil.", link: "https://www.aqa.org.uk/subjects/philosophy/as-and-a-level/philosophy-7172/assessment-resources" },
    { year: "2019", paper: "Paper 2", unit: "Metaphysics & Phil. of Mind", link: "https://www.aqa.org.uk/subjects/philosophy/as-and-a-level/philosophy-7172/assessment-resources" },
    { year: "2018", paper: "Paper 1", unit: "Epistemology & Moral Phil.", link: "https://www.aqa.org.uk/subjects/philosophy/as-and-a-level/philosophy-7172/assessment-resources" },
  ],
};

const SPANISH_WORDS = [
  { es: "hola", en: "hello", category: "Greetings" },
  { es: "buenos días", en: "good morning", category: "Greetings" },
  { es: "buenas tardes", en: "good afternoon", category: "Greetings" },
  { es: "buenas noches", en: "good night", category: "Greetings" },
  { es: "¿cómo estás?", en: "how are you?", category: "Greetings" },
  { es: "muy bien", en: "very well", category: "Greetings" },
  { es: "gracias", en: "thank you", category: "Greetings" },
  { es: "de nada", en: "you're welcome", category: "Greetings" },
  { es: "por favor", en: "please", category: "Greetings" },
  { es: "lo siento", en: "I'm sorry", category: "Greetings" },
  { es: "agua", en: "water", category: "Food & Drink" },
  { es: "comida", en: "food", category: "Food & Drink" },
  { es: "leche", en: "milk", category: "Food & Drink" },
  { es: "pan", en: "bread", category: "Food & Drink" },
  { es: "carne", en: "meat", category: "Food & Drink" },
  { es: "pollo", en: "chicken", category: "Food & Drink" },
  { es: "arroz", en: "rice", category: "Food & Drink" },
  { es: "fruta", en: "fruit", category: "Food & Drink" },
  { es: "estudiar", en: "to study", category: "Verbs" },
  { es: "aprender", en: "to learn", category: "Verbs" },
  { es: "trabajar", en: "to work", category: "Verbs" },
  { es: "hablar", en: "to speak/talk", category: "Verbs" },
  { es: "escuchar", en: "to listen", category: "Verbs" },
  { es: "leer", en: "to read", category: "Verbs" },
  { es: "escribir", en: "to write", category: "Verbs" },
  { es: "pensar", en: "to think", category: "Verbs" },
  { es: "querer", en: "to want/love", category: "Verbs" },
  { es: "poder", en: "to be able to / can", category: "Verbs" },
  { es: "hacer", en: "to do/make", category: "Verbs" },
  { es: "ir", en: "to go", category: "Verbs" },
  { es: "venir", en: "to come", category: "Verbs" },
  { es: "saber", en: "to know (fact)", category: "Verbs" },
  { es: "conocer", en: "to know (person)", category: "Verbs" },
  { es: "ser", en: "to be (permanent)", category: "Verbs" },
  { es: "estar", en: "to be (temporary)", category: "Verbs" },
  { es: "tener", en: "to have", category: "Verbs" },
  { es: "casa", en: "house/home", category: "Places" },
  { es: "escuela", en: "school", category: "Places" },
  { es: "universidad", en: "university", category: "Places" },
  { es: "biblioteca", en: "library", category: "Places" },
  { es: "tienda", en: "shop/store", category: "Places" },
  { es: "ciudad", en: "city", category: "Places" },
  { es: "país", en: "country", category: "Places" },
  { es: "calle", en: "street", category: "Places" },
  { es: "uno", en: "one", category: "Numbers" },
  { es: "dos", en: "two", category: "Numbers" },
  { es: "tres", en: "three", category: "Numbers" },
  { es: "cuatro", en: "four", category: "Numbers" },
  { es: "cinco", en: "five", category: "Numbers" },
  { es: "diez", en: "ten", category: "Numbers" },
  { es: "veinte", en: "twenty", category: "Numbers" },
  { es: "cien", en: "one hundred", category: "Numbers" },
  { es: "¿cuánto cuesta?", en: "how much does it cost?", category: "Phrases" },
  { es: "no entiendo", en: "I don't understand", category: "Phrases" },
  { es: "¿puedes repetir?", en: "can you repeat?", category: "Phrases" },
  { es: "¿dónde está...?", en: "where is...?", category: "Phrases" },
  { es: "me llamo...", en: "my name is...", category: "Phrases" },
  { es: "tengo hambre", en: "I'm hungry", category: "Phrases" },
  { es: "tengo sed", en: "I'm thirsty", category: "Phrases" },
  { es: "estoy cansado/a", en: "I'm tired", category: "Phrases" },
  { es: "¡qué guay!", en: "how cool!", category: "Phrases" },
  { es: "ahora mismo", en: "right now", category: "Phrases" },
  { es: "mañana", en: "tomorrow / morning", category: "Time" },
  { es: "ayer", en: "yesterday", category: "Time" },
  { es: "hoy", en: "today", category: "Time" },
  { es: "semana", en: "week", category: "Time" },
  { es: "mes", en: "month", category: "Time" },
  { es: "año", en: "year", category: "Time" },
  { es: "hora", en: "hour", category: "Time" },
  { es: "tiempo", en: "time/weather", category: "Time" },
  { es: "rojo", en: "red", category: "Colours" },
  { es: "azul", en: "blue", category: "Colours" },
  { es: "verde", en: "green", category: "Colours" },
  { es: "negro", en: "black", category: "Colours" },
  { es: "blanco", en: "white", category: "Colours" },
  { es: "amarillo", en: "yellow", category: "Colours" },
  { es: "feliz", en: "happy", category: "Adjectives" },
  { es: "triste", en: "sad", category: "Adjectives" },
  { es: "grande", en: "big/large", category: "Adjectives" },
  { es: "pequeño", en: "small/little", category: "Adjectives" },
  { es: "rápido", en: "fast/quick", category: "Adjectives" },
  { es: "lento", en: "slow", category: "Adjectives" },
  { es: "difícil", en: "difficult", category: "Adjectives" },
  { es: "fácil", en: "easy", category: "Adjectives" },
  { es: "bonito", en: "pretty/beautiful", category: "Adjectives" },
  { es: "importante", en: "important", category: "Adjectives" },
];

const TOPICS_BY_SUBJECT = {
  "Physics": ["Measurements & Errors", "Particles & Radiation", "Waves", "Mechanics & Materials", "Electricity", "Further Mechanics", "Thermal Physics", "Fields & Effects", "Nuclear Physics", "Astrophysics", "Medical Physics"],
  "Maths": ["Algebra & Functions", "Coordinate Geometry", "Sequences & Series", "Trigonometry", "Exponentials & Logs", "Differentiation", "Integration", "Numerical Methods", "Vectors", "Probability", "Statistics", "Mechanics"],
  "Further Maths": ["Complex Numbers", "Matrices", "Further Algebra", "Series & Limits", "Polar Coordinates", "Hyperbolic Functions", "Differential Equations", "Further Vectors", "Further Statistics", "Decision Maths"],
  "Philosophy": ["Epistemology", "Empiricism", "Rationalism", "Knowledge & Justification", "Moral Philosophy", "Utilitarianism", "Kantian Ethics", "Metaphysics of God", "Philosophy of Mind", "Free Will & Determinism"],
};

// ─── STORAGE ────────────────────────────────────────────────────────────────
const useStorage = (key, initial) => {
  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : initial;
    } catch { return initial; }
  });

  const set = useCallback((v) => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);

  return [val, set];
};

// ─── CLAUDE API ─────────────────────────────────────────────────────────────
const callClaude = async (prompt, system = "") => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: system || "You are a scholarly academic assistant with expertise in A-Level Physics, Maths, Further Maths, and Philosophy. You are concise, precise, and encouraging. Use elegant but clear language.",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "No response received.";
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

// ── Dashboard ──
const Dashboard = ({ tasks, events }) => {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const [quote] = useState(() => {
    const all = INSPIRATIONS.flatMap(i => i.quotes.map(q => ({ text: q, name: i.name })));
    return all[Math.floor(Math.random() * all.length)];
  });

  const todayEvents = events.filter(e => {
    const d = new Date(e.date);
    return d.toDateString() === now.toDateString();
  });

  const pendingTasks = tasks.filter(t => !t.done);
  const completedToday = tasks.filter(t => t.done).length;

  const current = CIRCADIAN_SCHEDULE.find((s, i) => {
    const [h, m] = s.time.split(":").map(Number);
    const next = CIRCADIAN_SCHEDULE[i + 1];
    const [nh, nm] = next ? next.time.split(":").map(Number) : [23, 59];
    return hour * 60 + now.getMinutes() >= h * 60 + m && hour * 60 + now.getMinutes() < nh * 60 + nm;
  });

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 3, color: "var(--text3)", textTransform: "uppercase", marginBottom: 6 }}>
          {now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "var(--gold2)", fontWeight: 400 }}>
          {greeting} <span style={{ fontStyle: "italic" }}>— Scholar</span>
        </h2>
        <p style={{ color: "var(--text3)", fontStyle: "italic", marginTop: 6, fontSize: 15 }}>"{quote.text}" — {quote.name}</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontFamily: "'Cinzel', serif", color: "var(--gold)" }}>{pendingTasks.length}</div>
          <div className="text-muted" style={{ fontSize: 13 }}>Tasks Remaining</div>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontFamily: "'Cinzel', serif", color: "var(--gold)" }}>{completedToday}</div>
          <div className="text-muted" style={{ fontSize: 13 }}>Completed Today</div>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontFamily: "'Cinzel', serif", color: "var(--gold)" }}>{events.length}</div>
          <div className="text-muted" style={{ fontSize: 13 }}>Upcoming Events</div>
        </div>
      </div>

      {current && (
        <div className="card" style={{ borderColor: "var(--gold)", marginBottom: 20 }}>
          <div className="card-title">⏱ Now — {current.time}</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--gold2)" }}>{current.label}</div>
          <div className="text-muted" style={{ marginTop: 4 }}>{current.desc}</div>
          <div className="tag tag-gold" style={{ marginTop: 10 }}>{current.type}</div>
        </div>
      )}

      <div className="grid-2">
        <div className="card">
          <div className="card-title">📋 Today's Priorities</div>
          {pendingTasks.length === 0 && <p className="text-muted">No tasks — add some in the planner.</p>}
          {pendingTasks.slice(0, 5).map((t, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
              <span style={{ color: "var(--gold)", marginRight: 8, fontFamily: "'Cinzel', serif", fontSize: 11 }}>{t.priority || "—"}</span>
              {t.title}
              {t.subject && <span className="tag tag-blue" style={{ marginLeft: 8, fontSize: 9 }}>{t.subject}</span>}
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">📅 Today's Events</div>
          {todayEvents.length === 0 && <p className="text-muted">No events today.</p>}
          {todayEvents.map((e, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
              <span style={{ color: "var(--gold)", marginRight: 8 }}>●</span>{e.title}
              {e.time && <span className="text-muted" style={{ marginLeft: 6 }}>{e.time}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Planner ──
const Planner = ({ tasks, setTasks }) => {
  const [form, setForm] = useState({ title: "", subject: "", priority: "Medium", time: "", notes: "" });
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!form.title.trim()) return;
    const scheduled = autoSchedule(form);
    setTasks([...tasks, { ...form, id: Date.now(), done: false, scheduledTime: scheduled, createdAt: new Date().toISOString() }]);
    setForm({ title: "", subject: "", priority: "Medium", time: "", notes: "" });
  };

  const autoSchedule = (task) => {
    const subjectMap = { "Physics": "07:00", "Maths": "07:00", "Further Maths": "07:00", "Philosophy": "07:00", "Reading": "13:00", "Spanish": "15:30", "Chess": "18:30" };
    return subjectMap[task.subject] || "10:00";
  };

  const toggleDone = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const filtered = tasks.filter(t => filter === "all" ? true : filter === "done" ? t.done : !t.done);
  const backlog = tasks.filter(t => !t.done && t.overdue);

  return (
    <div>
      <div className="page-header">
        <h2>Daily Planner</h2>
        <p>Scientifically scheduled according to your circadian rhythm</p>
      </div>

      <div className="grid-2">
        <div>
          <div className="card">
            <div className="card-title">✦ Add Task</div>
            <div className="form-group">
              <label>Task Title</label>
              <input placeholder="What needs to be done?" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Subject</label>
                <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                  <option value="">— Select —</option>
                  <option>Physics</option><option>Maths</option><option>Further Maths</option>
                  <option>Philosophy</option><option>Reading</option><option>Spanish</option>
                  <option>Chess</option><option>New Skill</option><option>General</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                  <option>High</option><option>Medium</option><option>Low</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea placeholder="Additional notes..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ minHeight: 60 }} />
            </div>
            <button className="btn btn-primary w-full" onClick={addTask}>Add Task — Auto-Schedule</button>
          </div>

          <div className="card">
            <div className="card-title">⚠ Backlog</div>
            {tasks.filter(t => !t.done).length === 0
              ? <p className="text-muted">No backlog — well done.</p>
              : tasks.filter(t => !t.done).map(t => (
                <div key={t.id} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                  <span style={{ color: "var(--gold)", marginRight: 6 }}>↩</span>
                  {t.title}
                  {t.subject && <span className="tag tag-blue" style={{ marginLeft: 6, fontSize: 9 }}>{t.subject}</span>}
                </div>
              ))
            }
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-title">◆ Circadian Schedule</div>
            {CIRCADIAN_SCHEDULE.map((slot, i) => {
              const slotTasks = tasks.filter(t => t.scheduledTime === slot.time && !t.done);
              return (
                <div key={i} className="time-block">
                  <div className="time-label">{slot.time}</div>
                  <div className="block-content">
                    <div className="block-title">{slot.label}</div>
                    <div className="block-sub">{slot.desc}</div>
                    {slotTasks.map(t => (
                      <div key={t.id} style={{ marginTop: 4, fontSize: 12, color: "var(--gold2)", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>→</span> {t.title}
                        <button onClick={() => toggleDone(t.id)} className="btn btn-sm" style={{ padding: "2px 6px", fontSize: 9 }}>✓</button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 0 }}>
        <div className="card-title">All Tasks</div>
        <div className="flex gap-2 mb-3">
          {["all", "pending", "done"].map(f => (
            <button key={f} className={`btn btn-sm ${filter === f ? "btn-primary" : ""}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-muted">No tasks here.</p>}
        {filtered.map(t => (
          <div key={t.id} className="result-row" style={{ opacity: t.done ? 0.5 : 1 }}>
            <input type="checkbox" checked={t.done} onChange={() => toggleDone(t.id)} style={{ width: "auto", accentColor: "var(--gold)", cursor: "pointer" }} />
            <div style={{ flex: 1 }}>
              <span style={{ textDecoration: t.done ? "line-through" : "none", fontSize: 15 }}>{t.title}</span>
              {t.notes && <div className="text-muted" style={{ fontSize: 12 }}>{t.notes}</div>}
            </div>
            {t.subject && <span className="tag tag-blue">{t.subject}</span>}
            <span className={`tag ${t.priority === "High" ? "tag-red" : t.priority === "Low" ? "tag-green" : "tag-gold"}`}>{t.priority}</span>
            <span style={{ color: "var(--gold)", fontSize: 12, fontFamily: "'Cinzel', serif" }}>{t.scheduledTime}</span>
            <button className="btn btn-sm btn-danger" onClick={() => deleteTask(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Inspiration ──
const Inspiration = () => {
  const [selected, setSelected] = useState(0);
  const person = INSPIRATIONS[selected];

  return (
    <div>
      <div className="page-header">
        <h2>Inspirations</h2>
        <p>Draw from the greats — let their ethos drive your excellence</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {INSPIRATIONS.map((p, i) => (
          <button key={i} className={`subject-tab ${selected === i ? "active" : ""}`} onClick={() => setSelected(i)}>{p.name}</button>
        ))}
      </div>

      <div className="grid-2">
        <div>
          <div className="card" style={{ borderColor: "var(--gold)", marginBottom: 16 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 2, color: "var(--text3)", textTransform: "uppercase", marginBottom: 4 }}>{person.role}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "var(--gold2)", marginBottom: 8 }}>{person.name}</div>
            <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: 16, color: "var(--cream2)", lineHeight: 1.7, borderLeft: "2px solid var(--gold)", paddingLeft: 14 }}>
              "{person.motto}"
            </div>
          </div>

          <div className="card">
            <div className="card-title">Daily Reminder</div>
            <p style={{ fontSize: 15, fontStyle: "italic", color: "var(--text2)", lineHeight: 1.8 }}>
              When you feel like stopping, remember: {person.name.split(" ")[0]} didn't get where they are by doing the comfortable thing. They chose to be relentless when others rested.
            </p>
            <p style={{ fontSize: 14, color: "var(--text3)", marginTop: 10, fontStyle: "italic" }}>
              Today's study is tomorrow's mastery.
            </p>
          </div>
        </div>

        <div>
          <div className="card-title">Collected Wisdom</div>
          {person.quotes.map((q, i) => (
            <div key={i} className="quote-card">
              <div className="quote-text">{q}</div>
              <div className="quote-attr">— {person.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 8 }}>
        <div className="card-title">All Mottos</div>
        <div className="grid-2">
          {INSPIRATIONS.map((p, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 1.5, color: "var(--gold)", textTransform: "uppercase", marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontStyle: "italic", fontSize: 14, color: "var(--cream2)" }}>"{p.motto}"</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Notes ──
const Notes = () => {
  const [notebooks, setNotebooks] = useStorage("notebooks", [
    { id: 1, name: "Physics Notes", icon: "⚛", pages: [{ id: 1, title: "Mechanics Overview", content: "Begin your notes here...", created: new Date().toISOString() }] },
    { id: 2, name: "Maths Notes", icon: "∑", pages: [] },
    { id: 3, name: "Philosophy Notes", icon: "φ", pages: [] },
  ]);
  const [selectedNB, setSelectedNB] = useState(0);
  const [selectedPage, setSelectedPage] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [newNBName, setNewNBName] = useState("");
  const [newPageTitle, setNewPageTitle] = useState("");
  const [showNBForm, setShowNBForm] = useState(false);
  const [showPageForm, setShowPageForm] = useState(false);

  const nb = notebooks[selectedNB];
  const page = nb?.pages?.find(p => p.id === selectedPage);

  useEffect(() => {
    if (page) setEditContent(page.content || "");
  }, [selectedPage, selectedNB]);

  const savePage = () => {
    if (!page) return;
    setNotebooks(notebooks.map((n, i) => i === selectedNB ? {
      ...n, pages: n.pages.map(p => p.id === selectedPage ? { ...p, content: editContent } : p)
    } : n));
  };

  const addNotebook = () => {
    if (!newNBName.trim()) return;
    setNotebooks([...notebooks, { id: Date.now(), name: newNBName, icon: "📒", pages: [] }]);
    setNewNBName(""); setShowNBForm(false);
  };

  const addPage = () => {
    if (!newPageTitle.trim()) return;
    const newPage = { id: Date.now(), title: newPageTitle, content: "", created: new Date().toISOString() };
    setNotebooks(notebooks.map((n, i) => i === selectedNB ? { ...n, pages: [...n.pages, newPage] } : n));
    setSelectedPage(newPage.id);
    setNewPageTitle(""); setShowPageForm(false);
  };

  return (
    <div>
      <div className="page-header"><h2>Notebooks</h2><p>Capture, organise, and review your scholarly notes</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "220px 180px 1fr", gap: 16, height: "calc(100vh - 200px)" }}>
        {/* Notebooks list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2, color: "var(--text3)", textTransform: "uppercase" }}>Notebooks</div>
            <button className="btn btn-sm" onClick={() => setShowNBForm(!showNBForm)}>+ New</button>
          </div>
          {showNBForm && (
            <div className="mb-3">
              <input placeholder="Notebook name..." value={newNBName} onChange={e => setNewNBName(e.target.value)} style={{ marginBottom: 6 }} />
              <button className="btn btn-primary btn-sm w-full" onClick={addNotebook}>Create</button>
            </div>
          )}
          {notebooks.map((nb, i) => (
            <div key={nb.id} className={`notebook-item ${selectedNB === i ? "selected" : ""}`} onClick={() => { setSelectedNB(i); setSelectedPage(null); }}>
              <span>{nb.icon}</span>
              <span style={{ fontSize: 14, flex: 1 }}>{nb.name}</span>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: "var(--text3)" }}>{nb.pages?.length || 0}</span>
            </div>
          ))}
        </div>

        {/* Pages list */}
        <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 16 }}>
          <div className="flex items-center justify-between mb-3">
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2, color: "var(--text3)", textTransform: "uppercase" }}>Pages</div>
            <button className="btn btn-sm" onClick={() => setShowPageForm(!showPageForm)}>+ New</button>
          </div>
          {showPageForm && (
            <div className="mb-3">
              <input placeholder="Page title..." value={newPageTitle} onChange={e => setNewPageTitle(e.target.value)} style={{ marginBottom: 6 }} />
              <button className="btn btn-primary btn-sm w-full" onClick={addPage}>Create</button>
            </div>
          )}
          {(nb?.pages || []).map(p => (
            <div key={p.id} className={`page-item ${selectedPage === p.id ? "selected" : ""}`} onClick={() => setSelectedPage(p.id)}>
              📄 {p.title}
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{new Date(p.created).toLocaleDateString()}</div>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 16, display: "flex", flexDirection: "column" }}>
          {page ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "var(--gold2)" }}>{page.title}</div>
                <button className="btn btn-primary btn-sm" onClick={savePage}>Save</button>
              </div>
              <textarea className="notes-editor w-full" style={{ flex: 1, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 3 }} value={editContent} onChange={e => setEditContent(e.target.value)} placeholder="Write your notes here..." />
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text3)", fontStyle: "italic" }}>
              Select a page or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Past Papers ──
const PastPapers = () => {
  const [subject, setSubject] = useState("AQA A-Level Physics");
  const [working, setWorking] = useState(null);
  const [notes, setNotes] = useStorage("paper_notes", {});
  const [aiQ, setAiQ] = useState("");
  const [aiA, setAiA] = useState("");
  const [loading, setLoading] = useState(false);

  const papers = PAST_PAPERS[subject] || [];

  const askAI = async () => {
    if (!aiQ.trim()) return;
    setLoading(true);
    setAiA("");
    try {
      const ans = await callClaude(`Subject: ${subject}. Student question: ${aiQ}`);
      setAiA(ans);
    } catch { setAiA("Could not reach AI. Check connection."); }
    setLoading(false);
  };

  return (
    <div>
      <div className="page-header"><h2>Past Papers</h2><p>AQA & Edexcel A-Level examination papers</p></div>
      <div className="flex gap-2 flex-wrap mb-4">
        {Object.keys(PAST_PAPERS).map(s => (
          <button key={s} className={`subject-tab ${subject === s ? "active" : ""}`} onClick={() => setSubject(s)}>{s}</button>
        ))}
      </div>

      {working ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--gold2)" }}>{working.year} — {working.paper}</div>
            <button className="btn" onClick={() => setWorking(null)}>← Back</button>
          </div>
          <div className="grid-2">
            <div>
              <div className="card">
                <div className="card-title">📄 Paper Access</div>
                <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 12, lineHeight: 1.7 }}>
                  This paper is available on the official exam board website. Click below to access the paper, mark scheme, and examiner reports.
                </p>
                <a href={working.link} target="_blank" rel="noreferrer" style={{ display: "block", textDecoration: "none" }}>
                  <button className="btn btn-primary w-full">Open Official Paper →</button>
                </a>
                <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 8, fontStyle: "italic" }}>Opens the official AQA/Edexcel assessment resources page</p>
              </div>
              <div className="card">
                <div className="card-title">📝 Working Notes</div>
                <textarea className="w-full" style={{ minHeight: 200 }} placeholder="Write your workings, answers, and notes here..."
                  value={notes[`${subject}-${working.year}-${working.paper}`] || ""}
                  onChange={e => setNotes({ ...notes, [`${subject}-${working.year}-${working.paper}`]: e.target.value })} />
              </div>
            </div>
            <div className="card">
              <div className="card-title">🤖 AI Tutor</div>
              <p className="text-muted mb-3" style={{ fontSize: 13 }}>Ask questions about this topic and get expert guidance.</p>
              <textarea placeholder={`Ask about ${working.unit}...`} value={aiQ} onChange={e => setAiQ(e.target.value)} style={{ minHeight: 80, marginBottom: 8 }} />
              <button className="btn btn-primary w-full mb-3" onClick={askAI} disabled={loading}>
                {loading ? "Thinking..." : "Ask AI Tutor"}
              </button>
              {loading && <div className="loading-dots"><span>•</span><span>•</span><span>•</span></div>}
              {aiA && <div className="ai-response">{aiA}</div>}
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-title">{subject}</div>
          {papers.map((p, i) => (
            <div key={i} className="paper-row">
              <div>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: "var(--gold)" }}>{p.year}</span>
                <span style={{ margin: "0 10px", color: "var(--text3)" }}>·</span>
                <span style={{ fontSize: 15 }}>{p.paper}</span>
                <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{p.unit}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-sm" onClick={() => setWorking(p)}>Work on This</button>
                <a href={p.link} target="_blank" rel="noreferrer"><button className="btn btn-sm">Official Site ↗</button></a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Results Tracker ──
const Results = () => {
  const [results, setResults] = useStorage("results", []);
  const [form, setForm] = useState({ subject: "", paper: "", score: "", maxScore: "", grade: "", date: "" });
  const [feedback, setFeedback] = useStorage("feedback", []);
  const [fbForm, setFbForm] = useState({ subject: "", paper: "", feedback: "", improvements: "" });
  const [tab, setTab] = useState("results");

  const addResult = () => {
    if (!form.subject || !form.score) return;
    setResults([...results, { ...form, id: Date.now(), pct: Math.round((+form.score / +form.maxScore) * 100) || 0 }]);
    setForm({ subject: "", paper: "", score: "", maxScore: "", grade: "", date: "" });
  };

  const addFeedback = () => {
    if (!fbForm.subject) return;
    setFeedback([...feedback, { ...fbForm, id: Date.now() }]);
    setFbForm({ subject: "", paper: "", feedback: "", improvements: "" });
  };

  const gradeColor = (g) => {
    if (!g) return "";
    const upper = g.toUpperCase();
    if (upper.startsWith("A")) return "score-a";
    if (upper.startsWith("B")) return "score-b";
    if (upper.startsWith("C")) return "score-c";
    return "score-d";
  };

  const subjectAvg = {};
  results.forEach(r => {
    if (!subjectAvg[r.subject]) subjectAvg[r.subject] = [];
    subjectAvg[r.subject].push(r.pct);
  });

  return (
    <div>
      <div className="page-header"><h2>Assessment Tracker</h2><p>Monitor your progress and understand your feedback</p></div>
      <div className="flex gap-2 mb-4">
        {["results", "feedback", "analytics"].map(t => (
          <button key={t} className={`subject-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "results" && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title">✦ Log Result</div>
            <div className="form-group"><label>Subject</label>
              <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                <option value="">— Select —</option>
                <option>Physics</option><option>Maths</option><option>Further Maths</option><option>Philosophy</option>
              </select>
            </div>
            <div className="form-group"><label>Paper / Assessment</label>
              <input placeholder="e.g. Paper 1, Mock 2" value={form.paper} onChange={e => setForm({ ...form, paper: e.target.value })} />
            </div>
            <div className="grid-2">
              <div className="form-group"><label>Score</label><input type="number" value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} /></div>
              <div className="form-group"><label>Out of</label><input type="number" value={form.maxScore} onChange={e => setForm({ ...form, maxScore: e.target.value })} /></div>
            </div>
            <div className="grid-2">
              <div className="form-group"><label>Grade</label>
                <input placeholder="A*, A, B..." value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} />
              </div>
              <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
            </div>
            <button className="btn btn-primary w-full" onClick={addResult}>Log Result</button>
          </div>

          <div className="card">
            <div className="card-title">📊 Results</div>
            {results.length === 0 && <p className="text-muted">No results logged yet.</p>}
            {results.map(r => (
              <div key={r.id} className="result-row">
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 15 }}>{r.subject}</span>
                  <span className="text-muted" style={{ marginLeft: 8, fontSize: 13 }}>{r.paper}</span>
                </div>
                <div className={`score-badge ${gradeColor(r.grade)}`}>{r.grade || `${r.pct}%`}</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{r.score}/{r.maxScore}</div>
                {r.date && <div style={{ fontSize: 11, color: "var(--text3)" }}>{r.date}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "feedback" && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title">✦ Add Feedback</div>
            <div className="form-group"><label>Subject</label>
              <select value={fbForm.subject} onChange={e => setFbForm({ ...fbForm, subject: e.target.value })}>
                <option value="">— Select —</option>
                <option>Physics</option><option>Maths</option><option>Further Maths</option><option>Philosophy</option>
              </select>
            </div>
            <div className="form-group"><label>Paper</label><input placeholder="Which assessment?" value={fbForm.paper} onChange={e => setFbForm({ ...fbForm, paper: e.target.value })} /></div>
            <div className="form-group"><label>Feedback Received</label><textarea placeholder="What did your teacher say?" value={fbForm.feedback} onChange={e => setFbForm({ ...fbForm, feedback: e.target.value })} style={{ minHeight: 80 }} /></div>
            <div className="form-group"><label>Areas to Improve</label><textarea placeholder="What topics need more work?" value={fbForm.improvements} onChange={e => setFbForm({ ...fbForm, improvements: e.target.value })} style={{ minHeight: 60 }} /></div>
            <button className="btn btn-primary w-full" onClick={addFeedback}>Save Feedback</button>
          </div>
          <div className="card">
            <div className="card-title">📋 Feedback Log</div>
            {feedback.length === 0 && <p className="text-muted">No feedback logged yet.</p>}
            {feedback.map(f => (
              <div key={f.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 1.5, color: "var(--gold)", marginBottom: 4, textTransform: "uppercase" }}>{f.subject} — {f.paper}</div>
                <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 6 }}>{f.feedback}</div>
                {f.improvements && <div style={{ fontSize: 13, color: "var(--gold2)", fontStyle: "italic" }}>→ {f.improvements}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "analytics" && (
        <div>
          <div className="grid-3">
            {Object.entries(subjectAvg).map(([sub, scores]) => {
              const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
              return (
                <div key={sub} className="card" style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2, color: "var(--text3)", textTransform: "uppercase", marginBottom: 8 }}>{sub}</div>
                  <div style={{ fontSize: 36, fontFamily: "'Playfair Display', serif", color: avg >= 70 ? "#7ab07a" : avg >= 50 ? "var(--gold)" : "#c07070" }}>{avg}%</div>
                  <div className="text-muted" style={{ fontSize: 12 }}>{scores.length} assessment{scores.length > 1 ? "s" : ""}</div>
                  <div className="progress-bar" style={{ marginTop: 10 }}>
                    <div className="progress-fill" style={{ width: `${avg}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          {Object.keys(subjectAvg).length === 0 && <p className="text-muted">Log some results to see analytics.</p>}
        </div>
      )}
    </div>
  );
};

// ── Revision Planner ──
const RevisionPlanner = () => {
  const [studiedTopics, setStudiedTopics] = useStorage("studied_topics", {});
  const [aiPlan, setAiPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("Physics");

  const topics = TOPICS_BY_SUBJECT[subject] || [];

  const toggleTopic = (topic) => {
    const key = `${subject}-${topic}`;
    const current = studiedTopics[key];
    const now = Date.now();
    setStudiedTopics({
      ...studiedTopics,
      [key]: current ? { ...current, times: [...current.times, now] } : { firstStudied: now, times: [now] }
    });
  };

  const getRetention = (topic) => {
    const key = `${subject}-${topic}`;
    const data = studiedTopics[key];
    if (!data) return 0;
    const lastStudied = Math.max(...data.times);
    const daysSince = (Date.now() - lastStudied) / (1000 * 60 * 60 * 24);
    const repetitions = data.times.length;
    const retention = Math.max(0, 100 - (daysSince / (repetitions * 2.5)) * 100);
    return Math.round(Math.min(100, retention));
  };

  const getColor = (r) => r > 70 ? "#5a8b5a" : r > 40 ? "#b07820" : "#8b3a3a";

  const generatePlan = async () => {
    setLoading(true);
    const weak = Object.keys(TOPICS_BY_SUBJECT).flatMap(sub =>
      TOPICS_BY_SUBJECT[sub].map(t => ({ sub, t, r: getRetention(t) }))
    ).filter(x => x.r < 60).slice(0, 6);

    const prompt = `Based on the forgetting curve, this student needs to review these topics (retention % shown): ${weak.map(w => `${w.sub}: ${w.t} (${w.r}%)`).join(", ")}. Create a focused 3-hour revision plan for today with specific time allocations and study techniques. Be concise and actionable.`;
    try {
      const ans = await callClaude(prompt);
      setAiPlan(ans);
    } catch { setAiPlan("Could not generate plan. Please check your connection."); }
    setLoading(false);
  };

  return (
    <div>
      <div className="page-header"><h2>Revision & Forgetting Curve</h2><p>Science-backed spaced repetition scheduling</p></div>
      <div className="grid-2">
        <div>
          <div className="card">
            <div className="card-title">📚 Topic Tracker</div>
            <div className="flex gap-2 flex-wrap mb-3">
              {Object.keys(TOPICS_BY_SUBJECT).map(s => (
                <button key={s} className={`subject-tab ${subject === s ? "active" : ""}`} onClick={() => setSubject(s)}>{s}</button>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              {topics.map(t => {
                const r = getRetention(t);
                const key = `${subject}-${t}`;
                const studied = studiedTopics[key];
                return (
                  <div key={t} className="topic-pill" onClick={() => toggleTopic(t)}>
                    <div className="retention-dot" style={{ background: getColor(r) }} />
                    <span>{t}</span>
                    {studied && <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: getColor(r) }}>{r}%</span>}
                  </div>
                );
              })}
            </div>
            <p className="text-muted mt-3" style={{ fontSize: 12 }}>Click a topic to mark it as studied. Colour shows retention level (green = strong, red = review needed).</p>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-title">🤖 AI Study Plan</div>
            <p className="text-muted mb-3" style={{ fontSize: 13 }}>
              Uses the Ebbinghaus forgetting curve to identify which topics you should review today for maximum retention.
            </p>
            <button className="btn btn-primary w-full mb-3" onClick={generatePlan} disabled={loading}>
              {loading ? "Analysing..." : "Generate Today's Revision Plan"}
            </button>
            {loading && <div className="loading-dots"><span>•</span><span>•</span><span>•</span></div>}
            {aiPlan && <div className="ai-response">{aiPlan}</div>}
          </div>

          <div className="card">
            <div className="card-title">📉 Forgetting Curve Guide</div>
            <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 8 }}><span style={{ color: "var(--gold)" }}>Day 1:</span> Review within 24 hours — retain ~60%</p>
              <p style={{ marginBottom: 8 }}><span style={{ color: "var(--gold)" }}>Day 7:</span> Second review — retain ~80%</p>
              <p style={{ marginBottom: 8 }}><span style={{ color: "var(--gold)" }}>Day 21:</span> Third review — retain ~90%</p>
              <p><span style={{ color: "var(--gold)" }}>Day 30+:</span> Long-term memory consolidation — ~95%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Long Term Plans ──
const LongTermPlans = () => {
  const [plans, setPlans] = useStorage("lt_plans", []);
  const [form, setForm] = useState({ title: "", category: "", deadline: "", milestone: "", notes: "", progress: 0 });

  const addPlan = () => {
    if (!form.title.trim()) return;
    setPlans([...plans, { ...form, id: Date.now(), created: new Date().toISOString() }]);
    setForm({ title: "", category: "", deadline: "", milestone: "", notes: "", progress: 0 });
  };

  const updateProgress = (id, v) => setPlans(plans.map(p => p.id === id ? { ...p, progress: v } : p));
  const deletePlan = (id) => setPlans(plans.filter(p => p.id !== id));

  return (
    <div>
      <div className="page-header"><h2>Long-Term Plans</h2><p>Define your ambitions and chart the path forward</p></div>
      <div className="grid-2">
        <div className="card">
          <div className="card-title">✦ New Goal</div>
          <div className="form-group"><label>Goal Title</label><input placeholder="What do you want to achieve?" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div className="grid-2">
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="">— Select —</option>
                <option>Academic</option><option>University</option><option>Career</option>
                <option>Language</option><option>Skills</option><option>Personal</option>
              </select>
            </div>
            <div className="form-group"><label>Target Date</label><input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} /></div>
          </div>
          <div className="form-group"><label>Key Milestone</label><input placeholder="First major checkpoint..." value={form.milestone} onChange={e => setForm({ ...form, milestone: e.target.value })} /></div>
          <div className="form-group"><label>Notes & Strategy</label><textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ minHeight: 60 }} /></div>
          <button className="btn btn-primary w-full" onClick={addPlan}>Add Long-Term Goal</button>
        </div>

        <div>
          {plans.length === 0 && <div className="card"><p className="text-muted">No long-term plans yet. Add one to begin charting your future.</p></div>}
          {plans.map(p => (
            <div key={p.id} className="card" style={{ marginBottom: 14 }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  {p.category && <span className="tag tag-gold" style={{ marginRight: 8 }}>{p.category}</span>}
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "var(--gold2)" }}>{p.title}</span>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => deletePlan(p.id)}>✕</button>
              </div>
              {p.milestone && <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 6 }}>⟶ {p.milestone}</div>}
              {p.notes && <div className="text-muted" style={{ fontSize: 13, marginBottom: 8 }}>{p.notes}</div>}
              <div className="flex items-center gap-3">
                <input type="range" min="0" max="100" value={p.progress} onChange={e => updateProgress(p.id, +e.target.value)} style={{ flex: 1, accentColor: "var(--gold)", background: "transparent", width: "auto" }} />
                <span style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: 13, minWidth: 40 }}>{p.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${p.progress}%` }} />
              </div>
              {p.deadline && <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6 }}>Deadline: {p.deadline}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Important Dates ──
const ImportantDates = ({ events, setEvents }) => {
  const [form, setForm] = useState({ title: "", date: "", time: "", type: "Exam", notes: "" });

  const addEvent = () => {
    if (!form.title || !form.date) return;
    setEvents([...events, { ...form, id: Date.now() }]);
    setForm({ title: "", date: "", time: "", type: "Exam", notes: "" });
  };

  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  const now = new Date();

  const typeColor = { Exam: "tag-red", Mock: "tag-gold", Deadline: "tag-blue", Other: "tag-purple" };

  return (
    <div>
      <div className="page-header"><h2>Important Dates</h2><p>Track your exams, deadlines, and key milestones</p></div>
      <div className="grid-2">
        <div className="card">
          <div className="card-title">✦ Add Date</div>
          <div className="form-group"><label>Event Title</label><input placeholder="e.g. AQA Physics Paper 1" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div className="grid-2">
            <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
            <div className="form-group"><label>Time</label><input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} /></div>
          </div>
          <div className="form-group"><label>Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option>Exam</option><option>Mock</option><option>Deadline</option><option>Other</option>
            </select>
          </div>
          <div className="form-group"><label>Notes</label><input placeholder="Additional details..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
          <button className="btn btn-primary w-full" onClick={addEvent}>Add to Calendar</button>
        </div>

        <div>
          {sorted.length === 0 && <div className="card"><p className="text-muted">No dates added yet.</p></div>}
          {sorted.map(e => {
            const d = new Date(e.date);
            const daysUntil = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
            return (
              <div key={e.id} className="event-row">
                <div className="event-date-box">
                  <div className="event-date-day">{d.getDate()}</div>
                  <div className="event-date-month">{d.toLocaleString("default", { month: "short" })}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "var(--text)" }}>{e.title}</div>
                  {e.time && <div className="text-muted" style={{ fontSize: 12 }}>{e.time}</div>}
                  {e.notes && <div className="text-muted" style={{ fontSize: 12, marginTop: 2 }}>{e.notes}</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={`tag ${typeColor[e.type] || "tag-gold"}`}>{e.type}</span>
                  <div style={{ fontSize: 11, color: daysUntil <= 7 ? "#c07070" : daysUntil <= 30 ? "var(--gold)" : "var(--text3)", marginTop: 4, fontFamily: "'Cinzel', serif" }}>
                    {daysUntil > 0 ? `${daysUntil}d` : daysUntil === 0 ? "Today!" : "Passed"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── Spanish ──
const Spanish = () => {
  const [tab, setTab] = useState("flashcards");
  const [category, setCategory] = useState("All");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [search, setSearch] = useState("");
  const [direction, setDirection] = useState("es-en");

  const categories = ["All", ...new Set(SPANISH_WORDS.map(w => w.category))];
  const filtered = SPANISH_WORDS.filter(w =>
    (category === "All" || w.category === category) &&
    (search === "" || w.es.includes(search.toLowerCase()) || w.en.includes(search.toLowerCase()))
  );

  const card = filtered[cardIndex];
  const front = direction === "es-en" ? { text: card?.es, hint: "Spanish" } : { text: card?.en, hint: "English" };
  const back = direction === "es-en" ? { text: card?.en, hint: "English" } : { text: card?.es, hint: "Spanish" };

  const next = (k) => {
    if (k) setKnown(prev => new Set([...prev, card?.es]));
    setFlipped(false);
    setTimeout(() => setCardIndex((cardIndex + 1) % filtered.length), 200);
  };

  return (
    <div>
      <div className="page-header"><h2>Spanish</h2><p>Vocabulary, phrases & fluency — the scholarly path to bilingualism</p></div>
      <div className="flex gap-2 mb-4">
        {["flashcards", "wordlist", "quiz"].map(t => (
          <button key={t} className={`subject-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {categories.map(c => (
          <button key={c} className={`btn btn-sm ${category === c ? "btn-primary" : ""}`} onClick={() => { setCategory(c); setCardIndex(0); setFlipped(false); }}>{c}</button>
        ))}
      </div>

      {tab === "flashcards" && card && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div style={{ fontSize: 13, color: "var(--text3)" }}>Card {cardIndex + 1} of {filtered.length} · <span style={{ color: "var(--gold)" }}>{known.size} known</span></div>
            <button className="btn btn-sm" onClick={() => setDirection(d => d === "es-en" ? "en-es" : "es-en")}>
              Flip Direction: {direction === "es-en" ? "ES → EN" : "EN → ES"}
            </button>
          </div>

          <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)} style={{ maxWidth: 500, margin: "0 auto" }}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div className="flashcard-hint">{front.hint}</div>
                <div className="flashcard-word">{front.text}</div>
                <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 8 }}>Click to reveal</div>
              </div>
              <div className="flashcard-back">
                <div className="flashcard-hint">{back.hint}</div>
                <div className="flashcard-word">{back.text}</div>
                <div style={{ fontSize: 13, color: "var(--gold)", marginTop: 8 }}>Category: {card.category}</div>
              </div>
            </div>
          </div>

          {flipped && (
            <div className="flex gap-3 justify-between mt-4" style={{ maxWidth: 500, margin: "16px auto 0" }}>
              <button className="btn w-full" style={{ borderColor: "#8b4a4a", color: "#c07070" }} onClick={() => next(false)}>✗ Again</button>
              <button className="btn w-full" style={{ borderColor: "#4a6b4a", color: "#70a070" }} onClick={() => next(true)}>✓ Known</button>
            </div>
          )}
        </div>
      )}

      {tab === "wordlist" && (
        <div>
          <div className="form-group mb-3" style={{ maxWidth: 300 }}>
            <input placeholder="Search words..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="card">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "0 16px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2, color: "var(--text3)", textTransform: "uppercase", paddingBottom: 8, borderBottom: "1px solid var(--border)" }}>Spanish</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2, color: "var(--text3)", textTransform: "uppercase", paddingBottom: 8, borderBottom: "1px solid var(--border)" }}>English</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2, color: "var(--text3)", textTransform: "uppercase", paddingBottom: 8, borderBottom: "1px solid var(--border)" }}>Category</div>
              {filtered.map((w, i) => (
                <>
                  <div key={`es-${i}`} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", color: "var(--gold2)", fontSize: 15 }}>{w.es}</div>
                  <div key={`en-${i}`} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>{w.en}</div>
                  <div key={`cat-${i}`} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)" }}><span className="tag tag-blue" style={{ fontSize: 9 }}>{w.category}</span></div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "quiz" && <SpanishQuiz words={filtered} />}
    </div>
  );
};

const SpanishQuiz = ({ words }) => {
  const [qi, setQi] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [shuffled] = useState(() => [...words].sort(() => Math.random() - 0.5));

  const q = shuffled[qi % shuffled.length];

  const check = () => {
    const correct = input.trim().toLowerCase() === q.en.toLowerCase();
    setResult(correct);
    setTotal(t => t + 1);
    if (correct) setScore(s => s + 1);
  };

  const next = () => {
    setQi(qi + 1);
    setInput("");
    setResult(null);
  };

  if (!q) return null;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <div className="flex items-center justify-between mb-4">
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: "var(--text3)" }}>Score: <span style={{ color: "var(--gold)" }}>{score}/{total}</span></div>
      </div>
      <div className="card" style={{ textAlign: "center", padding: "32px 24px" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2, color: "var(--text3)", marginBottom: 12, textTransform: "uppercase" }}>Translate to English</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "var(--gold2)", marginBottom: 24 }}>{q.es}</div>
        <input placeholder="Type the English translation..." value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (result === null ? check() : next())}
          style={{ textAlign: "center", fontSize: 18, marginBottom: 12 }} />
        {result === null
          ? <button className="btn btn-primary w-full" onClick={check}>Check</button>
          : (
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: result ? "#7ab07a" : "#c07070", marginBottom: 8 }}>
                {result ? "✓ Correct!" : `✗ The answer is: "${q.en}"`}
              </div>
              <button className="btn btn-primary w-full" onClick={next}>Next →</button>
            </div>
          )
        }
      </div>
    </div>
  );
};

// ─── NAV CONFIG ─────────────────────────────────────────────────────────────
const NAV = [
  { section: "Overview", items: [
    { id: "dashboard", label: "Dashboard", icon: "◈" },
    { id: "planner", label: "Daily Planner", icon: "◷" },
  ]},
  { section: "Study", items: [
    { id: "revision", label: "Revision Planner", icon: "↺" },
    { id: "papers", label: "Past Papers", icon: "◻" },
    { id: "results", label: "Results & Feedback", icon: "◎" },
  ]},
  { section: "Knowledge", items: [
    { id: "notes", label: "Notebooks", icon: "✎" },
    { id: "spanish", label: "Spanish", icon: "◈" },
  ]},
  { section: "Life", items: [
    { id: "dates", label: "Important Dates", icon: "◇" },
    { id: "longterm", label: "Long-Term Plans", icon: "◆" },
    { id: "inspiration", label: "Inspiration", icon: "✦" },
  ]},
];

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [tasks, setTasks] = useStorage("tasks", []);
  const [events, setEvents] = useStorage("events", []);

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard tasks={tasks} events={events} />;
      case "planner": return <Planner tasks={tasks} setTasks={setTasks} />;
      case "inspiration": return <Inspiration />;
      case "notes": return <Notes />;
      case "papers": return <PastPapers />;
      case "results": return <Results />;
      case "revision": return <RevisionPlanner />;
      case "longterm": return <LongTermPlans />;
      case "dates": return <ImportantDates events={events} setEvents={setEvents} />;
      case "spanish": return <Spanish />;
      default: return <Dashboard tasks={tasks} events={events} />;
    }
  };

  return (
    <>
      <style>{GLOBAL_STYLE}</style>
      <div className="app-wrapper">
        <nav className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-ornament">❧</div>
            <h1>Scholar's<br />Sanctum</h1>
            <p>aequam servare mentem</p>
          </div>
          {NAV.map(section => (
            <div key={section.section} className="nav-section">
              <div className="nav-section-title">{section.section}</div>
              {section.items.map(item => (
                <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
                  <span className="icon">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          ))}
          <div style={{ padding: "16px 20px", marginTop: "auto", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: 12, color: "var(--text3)", textAlign: "center", lineHeight: 1.6 }}>
              "The roots of education are bitter, but the fruit is sweet."
              <div style={{ color: "var(--gold)", marginTop: 4, fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 1 }}>— Aristotle</div>
            </div>
          </div>
        </nav>

        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </>
  );
}
