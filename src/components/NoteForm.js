import { useState } from 'react';
import './NoteForm.css';

function normalizeGrade(val) {
  const num = parseFloat(val);
  if (isNaN(num)) return num;
  if (num >= 10 && num <= 70) return num / 10;
  return num;
}

export default function NoteForm({ onAddNote }) {
  const [grade, setGrade] = useState('');
  const [weight, setWeight] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const gradeNum = normalizeGrade(grade);
    const weightNum = parseFloat(weight);
    if (isNaN(gradeNum) || isNaN(weightNum)) return;
    if (gradeNum < 1.0 || gradeNum > 7.0) return;
    if (weightNum <= 0) return;
    onAddNote({ grade: gradeNum, weight: weightNum });
    setGrade('');
    setWeight('');
  }

  const gradeNum = normalizeGrade(grade);
  const isValid = grade && weight &&
    !isNaN(gradeNum) && gradeNum >= 1.0 && gradeNum <= 7.0 &&
    !isNaN(parseFloat(weight)) && parseFloat(weight) > 0;

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2 className="section-title">Agregar Nota</h2>
      <div className="note-form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="note-grade">Nota</label>
            <input
              id="note-grade"
              className="form-input"
              type="number"
              placeholder="Ej: 65 (6.5)"
              value={grade}
              onChange={e => setGrade(e.target.value)}
            />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="note-weight">Ponderación (%)</label>
          <input
            id="note-weight"
            className="form-input"
            type="number"
            step="0.1"
            min="0.1"
            placeholder="30"
            value={weight}
            onChange={e => setWeight(e.target.value)}
          />
        </div>
        <div className="form-group form-group-btn">
          <button className="btn btn-primary" type="submit" disabled={!isValid}>
            + Agregar Nota
          </button>
        </div>
      </div>
    </form>
  );
}
