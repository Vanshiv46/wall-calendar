import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Calendar.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const HOLIDAYS = {
  "1-1": "🎊 New Year's Day",
  "1-26": "🇮🇳 Republic Day",
  "2-14": "💕 Valentine's Day",
  "3-8": "👩 Women's Day",
  "3-21": "🌸 Holi",
  "4-14": "🕉️ Baisakhi",
  "8-15": "🇮🇳 Independence Day",
  "10-2": "🕊️ Gandhi Jayanti",
  "10-24": "🪔 Diwali",
  "12-25": "🎄 Christmas",
  "12-31": "🥂 New Year's Eve",
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

function isInRange(date, start, end) {
  if (!start || !end || !date) return false;
  const s = start < end ? start : end;
  const e = start < end ? end : start;
  return date >= s && date <= e;
}

export default function Calendar({ monthImages }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cal_notes") || "{}"); }
    catch { return {}; }
  });
  const [activeNote, setActiveNote] = useState("");
  const [noteKey, setNoteKey] = useState(null);
  const [animDir, setAnimDir] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNotePanel, setShowNotePanel] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const notesRef = useRef(null);

  const monthData = monthImages[currentMonth];
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("cal_notes", JSON.stringify(notes));
  }, [notes]);

  // Load note for context
  useEffect(() => {
    if (selectedDay) {
      const key = `${currentYear}-${currentMonth}-${selectedDay}`;
      setNoteKey(key);
      setActiveNote(notes[key] || "");
    } else if (rangeStart && rangeEnd) {
      const key = `range-${rangeStart.toDateString()}-${rangeEnd.toDateString()}`;
      setNoteKey(key);
      setActiveNote(notes[key] || "");
    } else {
      const key = `month-${currentYear}-${currentMonth}`;
      setNoteKey(key);
      setActiveNote(notes[key] || "");
    }
  }, [selectedDay, rangeStart, rangeEnd, currentMonth, currentYear, notes]);

  const goToMonth = useCallback((dir) => {
    if (isAnimating) return;
    setAnimDir(dir);
    setFlipping(true);
    setIsAnimating(true);
    setTimeout(() => {
      if (dir === "next") {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
      } else {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
      }
      setRangeStart(null); setRangeEnd(null); setSelectedDay(null);
      setSelectingEnd(false); setShowNotePanel(false);
      setFlipping(false);
      setTimeout(() => { setIsAnimating(false); setAnimDir(null); }, 300);
    }, 350);
  }, [isAnimating, currentMonth]);

  const handleDayClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    if (!selectingEnd) {
      setRangeStart(date);
      setRangeEnd(null);
      setSelectingEnd(true);
      setSelectedDay(day);
      setShowNotePanel(true);
    } else {
      if (isSameDay(date, rangeStart)) {
        setSelectingEnd(false);
        setRangeEnd(null);
      } else {
        setRangeEnd(date);
        setSelectingEnd(false);
        setSelectedDay(null);
        setShowNotePanel(true);
      }
    }
  };

  const handleNoteChange = (val) => {
    setActiveNote(val);
    if (noteKey) setNotes(n => ({ ...n, [noteKey]: val }));
  };

  const clearSelection = () => {
    setRangeStart(null); setRangeEnd(null);
    setSelectingEnd(false); setSelectedDay(null);
    setShowNotePanel(false);
  };

  const getRangeDays = () => {
    if (!rangeStart || !rangeEnd) return 0;
    return Math.abs(Math.round((rangeEnd - rangeStart) / 86400000)) + 1;
  };

  // Build calendar grid
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const holiday = (day) => HOLIDAYS[`${currentMonth + 1}-${day}`];

  const getDayClass = (day) => {
    if (!day) return "cell empty";
    const date = new Date(currentYear, currentMonth, day);
    const isToday = isSameDay(date, today);
    const isStart = isSameDay(date, rangeStart);
    const isEnd = isSameDay(date, rangeEnd);
    const inRange = rangeStart && (rangeEnd || hoverDate)
      ? isInRange(date, rangeStart, rangeEnd || hoverDate)
      : false;
    const isSun = date.getDay() === 0;
    const isSat = date.getDay() === 6;
    const isHol = !!holiday(day);
    let cls = "cell day";
    if (isToday) cls += " today";
    if (isStart) cls += " range-start";
    if (isEnd) cls += " range-end";
    if (inRange && !isStart && !isEnd) cls += " in-range";
    if (isSun || isHol) cls += " sunday";
    if (isSat) cls += " saturday";
    return cls;
  };

  const noteLabel = selectedDay
    ? `📅 ${MONTHS[currentMonth]} ${selectedDay}, ${currentYear}`
    : rangeStart && rangeEnd
    ? `📆 ${rangeStart.toLocaleDateString()} – ${rangeEnd.toLocaleDateString()} (${getRangeDays()} days)`
    : `📓 ${MONTHS[currentMonth]} ${currentYear} — General Notes`;

  return (
    <div className="calendar-wrapper" style={{ "--accent": monthData.accent }}>
      {/* Spiral binding */}
      <div className="spiral-bar">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="spiral-ring" />
        ))}
      </div>

      <div className={`calendar-page ${flipping ? `flip-${animDir}` : ""}`}>
        {/* Hero Image Panel */}
        <div className="hero-panel" style={{ background: monthData.gradient }}>
          <div className="hero-scene">
            <div className="scene-emoji">{monthData.scene}</div>
            <div className="scene-particles">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="particle" style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  opacity: 0.3 + Math.random() * 0.5,
                }} />
              ))}
            </div>
          </div>
          <div className="hero-bottom">
            <div className="hero-label">{monthData.label}</div>
            <div className="hero-month-name">{MONTHS[currentMonth]}</div>
            <div className="hero-year">{currentYear}</div>
          </div>
          {/* Nav arrows */}
          <button className="nav-btn nav-prev" onClick={() => goToMonth("prev")} aria-label="Previous month">‹</button>
          <button className="nav-btn nav-next" onClick={() => goToMonth("next")} aria-label="Next month">›</button>
        </div>

        {/* Calendar Grid Panel */}
        <div className="grid-panel">
          {/* Day headers */}
          <div className="day-headers">
            {DAYS.map(d => (
              <div key={d} className={`day-header ${d === "Sun" ? "sun-header" : d === "Sat" ? "sat-header" : ""}`}>{d}</div>
            ))}
          </div>

          {/* Date grid */}
          <div
            className="date-grid"
            onMouseLeave={() => setHoverDate(null)}
          >
            {cells.map((day, idx) => {
              const hol = day ? holiday(day) : null;
              return (
                <div
                  key={idx}
                  className={getDayClass(day)}
                  onClick={() => day && handleDayClick(day)}
                  onMouseEnter={() => {
                    if (day && selectingEnd) {
                      setHoverDate(new Date(currentYear, currentMonth, day));
                    }
                  }}
                  title={hol || ""}
                >
                  {day && (
                    <>
                      <span className="day-num">{day}</span>
                      {hol && <span className="hol-dot" title={hol}>●</span>}
                      {notes[`${currentYear}-${currentMonth}-${day}`] && (
                        <span className="note-dot" title="Has note">✦</span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Range info bar */}
          {(rangeStart || rangeEnd) && (
            <div className="range-info">
              <span>
                {rangeStart && !rangeEnd && selectingEnd
                  ? `📍 From ${rangeStart.toLocaleDateString()} — click end date`
                  : rangeStart && rangeEnd
                  ? `✅ ${getRangeDays()} day${getRangeDays() > 1 ? "s" : ""} selected`
                  : ""}
              </span>
              <button className="clear-btn" onClick={clearSelection}>✕ Clear</button>
            </div>
          )}

          {/* Notes section */}
          <div className={`notes-section ${showNotePanel || true ? "notes-visible" : ""}`}>
            <div className="notes-label">{noteLabel}</div>
            <textarea
              ref={notesRef}
              className="notes-area"
              placeholder="Write your notes, reminders, plans... ✍️"
              value={activeNote}
              onChange={e => handleNoteChange(e.target.value)}
              rows={4}
            />
            {activeNote && (
              <div className="notes-actions">
                <button className="note-clear" onClick={() => handleNoteChange("")}>🗑 Clear note</button>
                <span className="note-saved">✓ Auto-saved</span>
              </div>
            )}
          </div>

          {/* Month quick nav */}
          <div className="month-nav-strip">
            {MONTHS.map((m, i) => (
              <button
                key={m}
                className={`month-chip ${i === currentMonth ? "active-chip" : ""}`}
                onClick={() => { setCurrentMonth(i); setRangeStart(null); setRangeEnd(null); setSelectedDay(null); }}
              >
                {m.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selecting hint */}
      {selectingEnd && (
        <div className="selection-hint">
          <span>👆 Now click the end date to complete your range</span>
          <button onClick={clearSelection}>Cancel</button>
        </div>
      )}
    </div>
  );
}
