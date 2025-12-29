

import { useEffect, useState } from "react";

const ITEMS = [
  "Apple",
  "Banana",
  "Orange",
  "Grapes",
  "Pineapple",
  "Mango"
];

function App() {

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  // Debounce logic
  useEffect(() => {
    const t = setTimeout(() => {

    setDebouncedQuery(query);
    }, 2500);

    return () => clearTimeout(t);
  }, [query]);      

  useEffect(() => {
    const filtered = ITEMS.filter(item =>
      item.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    setResults(filtered);
  }, [debouncedQuery]);

  return (
    <div style={{padding: "40px"}}>
      <h1>Debounced Search</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search items..."
        style={{fontSize: "20", padding: "10"}}
      />

      <p>Raw query: {query}</p>
      <p>Debounced query: {debouncedQuery}</p>
        
      <ul>
      {
        results.map(item => (
          <li key={item}>{item}</li>
        ))
      }
      </ul>

    </div>
  )
}

export default App;
