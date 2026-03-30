export default function Pagination({ page, total, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  function handleChange(newPage) {
    onChange(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => handleChange(page - 1)}>
        ← Précédent
      </button>
      <span className="page-info">Page {page} / {totalPages}</span>
      <button disabled={page >= totalPages} onClick={() => handleChange(page + 1)}>
        Suivant →
      </button>
    </div>
  );
}
