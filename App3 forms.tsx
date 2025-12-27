import React, { useState, useEffect } from "react";

type FormState = {
  query: string;
  minLength: number;
  autoSearch: boolean;
}

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const [form, setForm] = useState<FormState>({
    query: "",
    minLength: 3,
    autoSearch: true,
  })
  
  const debouncedQuery = useDebouncedValue(form.query, 500);

  const isValid = form.query.length >= form.minLength;


  // debounce input change
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

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

    <form>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="search github username..."
        style={{ padding: 8, fontSize: 18 }}
      />

      <input
        type="number"
        value="{form.minLength}"
        onChange={(e) => 
          setForm({ ...form, minLength: Number(e.target.value) })
        }
      />

      <label>
        <input 
          type="checkbox"
          checked={form.autoSearch}
          onChange={(e) => 
            setForm({...form, autoSearch: e.target.checked })}
        />
        Auto search
      </label>
    </form>

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
