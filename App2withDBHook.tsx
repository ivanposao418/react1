// Feinman with some AI v1.2

import React, { useState, useEffect } from "react";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

function App() {
  const [query, setQuery] = useState("");
  //const [debouncedQuery, setDebouncedQuery] = useState("");
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // debounce input change
  const debouncedQuery = useDebouncedValue(query, 500);

  // fetch on debouncedQuery update
  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]);
      return;
    }

    // start loading
    setLoading(true);
    setError("");

    const controller = new AbortController();

    fetch(`https://api.github.com/search/users?q=${debouncedQuery}`, {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setUsers(data.items.slice(0, 10)); // display top 10
        }
      })
      .catch(err => {
        if (err.name !== "AbortError") {
          setError("Failed to fetch");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div style={{ padding: 40 }}>
      <h1>GitHub User Search</h1>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="search github username..."
        style={{ padding: 8, fontSize: 18 }}
      />

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {users.map(u => (
          <li key={u.id}>
            <img
              src={u.avatar_url}
              alt=""
              width={32}
              height={32}
              style={{ borderRadius: "50%", marginRight: 8 }}
            />
            {u.login}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
