// Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
// Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
// Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
// Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.

// Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay)
  };
};

import { useEffect, useState, useCallback } from 'react';

function App() {

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`);
      const data = await res.json();
      setSuggestions(data);
      console.log('API');
    } catch (err) {
      console.error(err)
    }
  }

  const debouncedFetchProducts = useCallback(
    debounce(fetchProducts, 500)
    , []);

  useEffect(() => {
    debouncedFetchProducts(query);
  }, [query]);

  return (
    <>
      <h1>Autocomplete</h1>
      <input type="text"
        placeholder='Cerca un prodotto...'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className='dropdown'>
          {suggestions.map((product) => (
            <p key={product.id}>{product.name}</p>
          ))}
        </div>
      )}
    </>
  )
}

export default App;
