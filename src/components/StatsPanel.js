import './StatsPanel.css';

export default function StatsPanel({ noteAverage, totalWeight, notesCount, examActive, availableWeight }) {
  if (notesCount === 0) {
    return (
      <div className="stats-panel stats-empty">
        <p className="stats-empty-text">Agrega notas para ver tu promedio</p>
      </div>
    );
  }

  const avgClass = noteAverage >= 5.5 ? 'avg-high' : noteAverage >= 4.0 ? 'avg-mid' : 'avg-low';
  const avgLabel = noteAverage >= 5.5 ? 'Excelente' : noteAverage >= 4.0 ? 'Aceptable' : 'Reprobado';

  return (
    <div className="stats-panel">
      <div className="stats-avg-section">
        <p className="stats-label">Promedio Actual</p>
        <p className={`stats-average ${avgClass}`}>{noteAverage.toFixed(2)}</p>
        <p className="stats-label-status">{avgLabel}</p>
      </div>
      <div className="stats-details">
        <div className="stat-item">
          <span className="stat-value">{totalWeight.toFixed(1)}%</span>
          <span className="stat-label">Suma Ponderaciones</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{notesCount}</span>
          <span className="stat-label">Notas Ingresadas</span>
        </div>
        {examActive && (
          <div className="stat-item">
            <span className="stat-value">{availableWeight.toFixed(1)}%</span>
            <span className="stat-label">Disponible para Notas</span>
          </div>
        )}
      </div>
    </div>
  );
}
