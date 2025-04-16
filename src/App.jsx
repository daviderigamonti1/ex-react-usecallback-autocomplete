// Bonus: Caricare i Dettagli del Prodotto Selezionato
// Quando l’utente clicca su un prodotto nella tendina, nascondi la tendina e carica i dettagli completi del prodotto sotto il campo di ricerca.

// Effettua una richiesta API per ottenere i dettagli completi:
// https://boolean-spec-frontend.vercel.app/freetestapi/products/{id}

// Mostra i dettagli del prodotto selezionato (es. image, name, description, price).


// Obiettivo: Aggiungere interattività permettendo di visualizzare le informazioni complete di un prodotto.

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
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const fetchProductsDetails = async (id) => {
    try {
      const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products/${id}`);
      const data = await res.json();
      setSelectedProduct(data);
      setQuery("");
      setSuggestions([]);
    } catch (err) {
      console.error(err);
    }
  }

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
            <p key={product.id} onClick={() => fetchProductsDetails(product.id)}>{product.name}</p>
          ))}
        </div>
      )}
      {selectedProduct && (
        <div className="card">
          <h2>{selectedProduct.name}</h2>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <p>{selectedProduct.description}</p>
          <p><strong>Prezzo:</strong> {selectedProduct.price}€</p>
        </div>
      )}
    </>
  )
}

export default App;
