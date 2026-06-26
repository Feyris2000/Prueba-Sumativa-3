import './NoteList.css';

export default function NoteList({ notes, onDeleteNote }) {
  if (notes.length === 0) {
    return (
      <div className="note-list-empty">
        <div className="empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
          </svg>
        </div>
        <p className="empty-text">No hay notas aún</p>
        <p className="empty-hint">Agrega tu primera nota usando el formulario de arriba</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      <h2 className="section-title">
        Mis Notas
        <span className="note-count">{notes.length}</span>
      </h2>
      <div className="note-list-scroll">
        <table className="note-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nota</th>
              <th>Ponderación</th>
              <th>Aporte</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, i) => (
              <tr key={note.id}>
                <td className="note-index">{i + 1}</td>
                <td className={`grade-cell ${getGradeClass(note.grade)}`}>
                  {note.grade.toFixed(1)}
                </td>
                <td>{note.weight}%</td>
                <td className="contribution-cell">
                  {(note.grade * note.weight / 100).toFixed(2)}
                </td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => onDeleteNote(note.id)}
                    title="Eliminar nota"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getGradeClass(grade) {
  if (grade >= 5.5) return 'grade-high';
  if (grade >= 4.0) return 'grade-mid';
  return 'grade-low';
}
