import { CONTRACTS } from './constants';

export function formatDate(dtStr) {
  if (!dtStr) return '';
  const d = new Date(dtStr);
  const diff = Math.floor((Date.now() - d) / 86400000);
  if (diff === 0) return "Aujourd'hui";
  if (diff === 1) return 'Hier';
  if (diff < 7) return `Il y a ${diff} jours`;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function mapContract(type) {
  return CONTRACTS[type] || type || '';
}

export function detectSource(publisher = '') {
  const p = publisher.toLowerCase();
  if (p.includes('linkedin')) return 'linkedin';
  if (p.includes('indeed')) return 'indeed';
  if (p.includes('glassdoor')) return 'glassdoor';
  return 'other';
}

export function sanitize(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
