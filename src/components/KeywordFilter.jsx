export default function KeywordFilter({ keywords, active, onChange }) {
  return (
    <div className="keyword-filter">
      {keywords.map(kw => (
        <button
          key={kw.label}
          className={`keyword-chip${active.label === kw.label ? ' active' : ''}`}
          onClick={() => onChange(kw)}
        >
          {kw.label}
        </button>
      ))}
    </div>
  );
}
