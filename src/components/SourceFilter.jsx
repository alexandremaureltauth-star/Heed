import { SOURCES } from '../utils/constants';

const LABELS = { all: 'Toutes', linkedin: 'LinkedIn', indeed: 'Indeed', glassdoor: 'Glassdoor' };

export default function SourceFilter({ active, onChange }) {
  return (
    <div className="source-filter">
      {SOURCES.map(s => (
        <button
          key={s}
          className={`source-btn${active === s ? ' active' : ''}`}
          onClick={() => onChange(s)}
        >
          {LABELS[s]}
        </button>
      ))}
    </div>
  );
}
