import { useState } from 'react';
import './ExamSection.css';

function normalizeGrade(val) {
  const num = parseFloat(val);
  if (isNaN(num)) return num;
  if (num >= 10 && num <= 70) return num / 10;
  return num;
}

export default function ExamSection({ exam, onSetExam, onRemoveExam, noteTotalWeight }) {
  const [grade, setGrade] = useState(exam?.grade?.toString() || '');
  const [weight, setWeight] = useState(exam?.weight?.toString() || '');

  if (exam) {
    return (
      <div className="exam-section exam-active">
        <div className="exam-header">
          <div className="exam-badge">Examen</div>
          <button className="btn btn-danger btn-sm" onClick={onRemoveExam}>
            Quitar Examen
          </button>
        </div>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const gradeNum = normalizeGrade(grade);
    const weightNum = parseFloat(weight);
    if (isNaN(gradeNum) || isNaN(weightNum)) return;
    if (gradeNum < 1.0 || gradeNum > 7.0) return;
    if (weightNum <= 0 || weightNum >= 100) return;
    onSetExam({ grade: gradeNum, weight: weightNum });
    setGrade('');
    setWeight('');
  }

  const gradeNum = normalizeGrade(grade);
  const isValid = grade && weight &&
    !isNaN(gradeNum) && gradeNum >= 1.0 && gradeNum <= 7.0 &&
    !isNaN(parseFloat(weight)) && parseFloat(weight) > 0 && parseFloat(weight) < 100;

  return (
    <div className="exam-section">
      <h2 className="section-title">Examen (Opcional)</h2>
      <p className="exam-hint">
        Si agregas un examen, su ponderación se resta del 100% disponible para las notas.
      </p>
      <form className="exam-form" onSubmit={handleSubmit}>
        <div className="exam-fields-row">
          <div className="form-group">
            <label className="form-label" htmlFor="exam-grade">Nota</label>
            <input
              id="exam-grade"
              className="form-input"
              type="number"
              placeholder="Ej: 40 (4.0)"
              value={grade}
              onChange={e => setGrade(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="exam-weight">Ponderación (%)</label>
            <input
              id="exam-weight"
              className="form-input"
              type="number"
              step="0.1"
              min="0.1"
              max="99.9"
              placeholder="30"
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-primary btn-full" type="submit" disabled={!isValid}>
          Agregar Examen
        </button>
      </form>
    </div>
  );
}
