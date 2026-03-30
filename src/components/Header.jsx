export default function Header({ lastUpdate, loading, onRefresh, onResetKey }) {
  const formattedDate = lastUpdate
    ? lastUpdate.toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <header className="header">
      <div className="header-left">
        <h1>Veille Emploi Gestion Privée</h1>
        <div className="subtitle">Wealth Management · Banque Privée · Patrimoine</div>
      </div>
      <div className="header-right">
        {formattedDate && <span className="header-date">Mis à jour : {formattedDate}</span>}
        <button className="btn-refresh" onClick={onRefresh} disabled={loading}>
          {loading ? <span className="spinner">⟳</span> : '⟳'} Actualiser les offres
        </button>
        <button className="btn-reset-key" onClick={onResetKey} title="Changer la clé API">
          🔑
        </button>
      </div>
    </header>
  );
}
