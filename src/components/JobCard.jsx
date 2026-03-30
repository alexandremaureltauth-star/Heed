import { SOURCE_META } from '../utils/constants';

export default function JobCard({ job, index }) {
  const meta = SOURCE_META[job.source] || SOURCE_META.other;

  return (
    <div className="job-card" style={{ animationDelay: `${index * 40}ms` }}>
      <div className="job-card-header">
        <span className="source-badge" style={{ background: meta.color }}>
          {meta.label}
        </span>
        <h3>{job.title}</h3>
      </div>
      <div className="job-company">{job.company}</div>
      <div className="job-tags">
        <span className="job-tag">{job.location}</span>
        {job.contract && <span className="job-tag">{job.contract}</span>}
        {job.salary && <span className="job-tag salary">{job.salary}</span>}
        {job.isNew && <span className="job-tag new">Récent</span>}
      </div>
      <div className="job-desc">{job.description}</div>
      <div className="job-footer">
        <div className="job-footer-meta">
          <span>{job.publisher || job.source}</span>
          <span>·</span>
          <span>{job.date}</span>
        </div>
        <a className="job-link" href={job.url} target="_blank" rel="noopener noreferrer">
          Voir l'offre ↗
        </a>
      </div>
    </div>
  );
}
