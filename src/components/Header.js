import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
          </svg>
        </div>
        <div>
          <h1 className="header-title">Gestión de Notas</h1>
          <p className="header-subtitle">Calcula tu promedio ponderado al instante</p>
        </div>
      </div>
    </header>
  );
}
