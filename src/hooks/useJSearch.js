import { useState, useCallback } from 'react';
import axios from 'axios';
import { RAPIDAPI_HOST, RAPIDAPI_BASE, CONTRACTS } from '../utils/constants';

function detectSource(publisher = '') {
  const p = publisher.toLowerCase();
  if (p.includes('linkedin')) return 'linkedin';
  if (p.includes('indeed')) return 'indeed';
  if (p.includes('glassdoor')) return 'glassdoor';
  return 'other';
}

function formatDate(dtStr) {
  if (!dtStr) return '';
  const d = new Date(dtStr);
  const diff = Math.floor((Date.now() - d) / 86400000);
  if (diff === 0) return "Aujourd'hui";
  if (diff === 1) return 'Hier';
  if (diff < 7) return `Il y a ${diff} jours`;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function mapJob(j) {
  return {
    id: j.job_id,
    title: j.job_title || 'Poste non renseigné',
    company: j.employer_name || '—',
    location: [j.job_city, j.job_country].filter(Boolean).join(', ') || 'France',
    contract: CONTRACTS[j.job_employment_type] || j.job_employment_type || '',
    description: j.job_description ? j.job_description.slice(0, 280) + '…' : '',
    date: formatDate(j.job_posted_at_datetime_utc),
    rawDate: j.job_posted_at_datetime_utc,
    url: j.job_apply_link || j.job_google_link || '#',
    source: detectSource(j.job_publisher || ''),
    publisher: j.job_publisher || '',
    isNew: (Date.now() - new Date(j.job_posted_at_datetime_utc)) < 48 * 3600000,
    salary: j.job_min_salary
      ? `${Math.round(j.job_min_salary / 1000)}–${Math.round(j.job_max_salary / 1000)}k ${j.job_salary_currency}`
      : null,
  };
}

export function useJSearch() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetch = useCallback(async (query, apiKey) => {
    if (!apiKey || !query) return;
    setLoading(true);
    setError(null);

    try {
      const pages = await Promise.all(
        [1, 2, 3].map(page =>
          axios.get(`${RAPIDAPI_BASE}/search`, {
            params: { query, page, num_pages: 1, country: 'fr', date_posted: 'week' },
            headers: { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': RAPIDAPI_HOST },
          })
        )
      );

      const raw = pages.flatMap(r => r.data?.data ?? []);
      if (!raw.length) throw new Error('Aucune offre trouvée pour cette recherche.');

      const seen = new Set();
      const deduped = raw.filter(j => {
        if (seen.has(j.job_id)) return false;
        seen.add(j.job_id);
        return true;
      });

      setJobs(deduped.map(mapJob));
      setLastUpdate(new Date());
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        setError('Clé API invalide ou quota dépassé. Vérifiez votre abonnement JSearch sur RapidAPI.');
      } else {
        setError(err.message || 'Erreur inconnue.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { jobs, loading, error, lastUpdate, fetch };
}
