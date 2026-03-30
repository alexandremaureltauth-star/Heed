import { SOURCE_META } from '../utils/constants';

export default function StatsBar({ jobs }) {
  const counts = { linkedin: 0, indeed: 0, glassdoor: 0, other: 0 };
  jobs.forEach(j => { counts[j.source] = (counts[j.source] || 0) + 1; });

  return (
    <div className="stats-bar">
      <div className="stat-pill">
        Total : <strong>{jobs.length}</strong> offres
      </div>
      {Object.entries(SOURCE_META).map(([key, meta]) => (
        <div className="stat-pill" key={key}>
          <span className="dot" style={{ background: meta.color }} />
          {key.charAt(0).toUpperCase() + key.slice(1)} : <strong>{counts[key] || 0}</strong>
        </div>
      ))}
    </div>
  );
}
