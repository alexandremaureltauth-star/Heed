import JobCard from './JobCard';
import SkeletonCard from './SkeletonCard';
import Pagination from './Pagination';

export default function JobGrid({ jobs, loading, page, perPage, onPageChange }) {
  if (loading) {
    return (
      <div className="job-grid">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return <div className="empty-state">Aucune offre à afficher. Lancez une recherche ou changez de filtre.</div>;
  }

  const start = (page - 1) * perPage;
  const paged = jobs.slice(start, start + perPage);

  return (
    <>
      <div className="job-grid">
        {paged.map((job, i) => (
          <JobCard key={job.id} job={job} index={i} />
        ))}
      </div>
      <Pagination page={page} total={jobs.length} perPage={perPage} onChange={onPageChange} />
    </>
  );
}
