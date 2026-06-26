import './FinalResult.css';

export default function FinalResult({ noteAverage, finalAverage, exam, totalWeight, notesCount }) {
  if (notesCount === 0 && !exam) return null;

  if (!exam) {
    return (
      <div className="final-result">
        <div className="final-header">
          <span className="final-badge">Sin Examen</span>
        </div>
        <div className="final-body">
          <p className="final-label">Promedio de Notas</p>
          <p className={`final-grade ${getGradeClass(noteAverage)}`}>
            {noteAverage.toFixed(2)}
          </p>
        </div>
      </div>
    );
  }

  const avgClass = getGradeClass(finalAverage);
  const label = finalAverage >= 5.5 ? '¡Excelente!' : finalAverage >= 4.0 ? 'Aprobado' : 'Reprobado';

  return (
    <div className="final-result final-with-exam">
      <div className="final-header">
        <span className="final-badge">Con Examen</span>
        <span className={`final-status ${avgClass}`}>{label}</span>
      </div>
      <div className="final-breakdown">
        <div className="breakdown-item">
          <span className="breakdown-label">Promedio Notas ({totalWeight.toFixed(1)}%)</span>
          <span className={`breakdown-value ${getGradeClass(noteAverage)}`}>
            {noteAverage.toFixed(2)}
          </span>
        </div>
        <div className="breakdown-plus">+</div>
        <div className="breakdown-item">
          <span className="breakdown-label">Examen ({exam.weight}%)</span>
          <span className={`breakdown-value ${getGradeClass(exam.grade)}`}>
            {exam.grade.toFixed(1)}
          </span>
        </div>
        <div className="breakdown-equals">=</div>
        <div className="breakdown-item breakdown-total">
          <span className="breakdown-label">Promedio Final</span>
          <span className={`breakdown-value final-grade-big ${avgClass}`}>
            {finalAverage.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

function getGradeClass(grade) {
  if (grade >= 5.5) return 'grade-high';
  if (grade >= 4.0) return 'grade-mid';
  return 'grade-low';
}
