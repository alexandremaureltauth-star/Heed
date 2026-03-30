import { useState, useEffect } from 'react';
import SetupScreen   from './components/SetupScreen';
import Header        from './components/Header';
import StatsBar      from './components/StatsBar';
import KeywordFilter from './components/KeywordFilter';
import SourceFilter  from './components/SourceFilter';
import JobGrid       from './components/JobGrid';
import ErrorBanner   from './components/ErrorBanner';
import { useJSearch } from './hooks/useJSearch';
import { KEYWORDS }  from './utils/constants';

const PER_PAGE = 12;

export default function App() {
  const [apiKey, setApiKey]   = useState(() => localStorage.getItem('jsearch_key') || '');
  const [keyword, setKeyword] = useState(KEYWORDS[0]);
  const [source, setSource]   = useState('all');
  const [page, setPage]       = useState(1);

  const { jobs, loading, error, lastUpdate, fetch } = useJSearch();

  useEffect(() => {
    if (apiKey) fetch(keyword.query, apiKey);
  }, []);

  function handleSaveKey(key) {
    localStorage.setItem('jsearch_key', key);
    setApiKey(key);
    fetch(keyword.query, key);
  }

  function handleKeyword(kw) {
    setKeyword(kw);
    setPage(1);
    fetch(kw.query, apiKey);
  }

  function handleRefresh() {
    setPage(1);
    fetch(keyword.query, apiKey);
  }

  function handleResetKey() {
    localStorage.removeItem('jsearch_key');
    setApiKey('');
  }

  const filtered = source === 'all' ? jobs : jobs.filter(j => j.source === source);

  if (!apiKey) {
    return <SetupScreen onSave={handleSaveKey} />;
  }

  return (
    <div className="app">
      <Header
        lastUpdate={lastUpdate}
        loading={loading}
        onRefresh={handleRefresh}
        onResetKey={handleResetKey}
      />
      <main className="main">
        <StatsBar jobs={jobs} />
        <KeywordFilter keywords={KEYWORDS} active={keyword} onChange={handleKeyword} />
        <SourceFilter active={source} onChange={(s) => { setSource(s); setPage(1); }} />
        <ErrorBanner message={error} />
        <JobGrid
          jobs={filtered}
          loading={loading}
          page={page}
          perPage={PER_PAGE}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}
