import { useState } from 'react';

export default function SetupScreen({ onSave }) {
  const [key, setKey] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (key.trim().length < 20) {
      setError('Clé invalide — elle doit comporter au moins 20 caractères.');
      return;
    }
    setError('');
    onSave(key.trim());
  }

  return (
    <div className="setup-overlay">
      <form className="setup-card" onSubmit={handleSubmit}>
        <h1>Configuration API</h1>
        <p>Pour accéder aux offres d'emploi, vous avez besoin d'une clé API JSearch (RapidAPI).</p>
        <ol>
          <li>Créez un compte sur <a href="https://rapidapi.com" target="_blank" rel="noopener noreferrer">rapidapi.com</a></li>
          <li>Abonnez-vous à l'API <a href="https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch" target="_blank" rel="noopener noreferrer">JSearch</a> (plan gratuit disponible)</li>
          <li>Copiez votre clé API depuis le dashboard</li>
          <li>Collez-la ci-dessous</li>
        </ol>
        <div className="setup-input-wrap">
          <input
            type={show ? 'text' : 'password'}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Votre clé API RapidAPI…"
            autoFocus
          />
          <button type="button" className="setup-toggle" onClick={() => setShow(!show)}>
            {show ? '🙈' : '👁'}
          </button>
        </div>
        {error && <div className="setup-error">{error}</div>}
        <button type="submit" className="setup-btn">Enregistrer et démarrer</button>
      </form>
    </div>
  );
}
