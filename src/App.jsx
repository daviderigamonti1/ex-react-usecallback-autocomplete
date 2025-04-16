// Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti
// Crea un campo di input (<input type="text">) in cui l’utente può digitare.

// Effettua una chiamata API a: 
// https://boolean-spec-frontend.vercel.app/freetestapi/products?search=[query]

// La query deve essere sostituita con il testo digitato.
// Mostra i risultati API sotto l'input in una tendina di suggerimenti.

// Se l'utente cancella il testo, la tendina scompare.


// Obiettivo: Mostrare suggerimenti dinamici in base alla ricerca dell'utente.

import { useEffect, useState } from 'react'

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
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProducts(query);
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
