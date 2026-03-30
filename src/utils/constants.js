export const RAPIDAPI_HOST = 'jsearch.p.rapidapi.com';
export const RAPIDAPI_BASE = 'https://jsearch.p.rapidapi.com';

export const KEYWORDS = [
  { label: 'Wealth Management',  query: 'wealth management France' },
  { label: 'Banque Privée',      query: 'banque privée France' },
  { label: 'Gestion Patrimoine', query: 'gestion de patrimoine France' },
  { label: 'CGP',                query: 'conseiller gestion patrimoine CGP France' },
  { label: 'Family Office',      query: 'family office France' },
  { label: 'Private Banker',     query: 'private banker France' },
];

export const SOURCES = ['all', 'linkedin', 'indeed', 'glassdoor'];

export const CONTRACTS = {
  FULLTIME:   'CDI',
  PARTTIME:   'Temps partiel',
  INTERN:     'Stage',
  CONTRACTOR: 'Freelance',
  TEMPORARY:  'CDD',
};

export const SOURCE_META = {
  linkedin:  { label: 'Li', color: '#0a66c2' },
  indeed:    { label: 'In', color: '#2164f3' },
  glassdoor: { label: 'Gd', color: '#0caa41' },
  other:     { label: '◆',  color: '#6e7e96' },
};
