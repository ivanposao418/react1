import { useState } from "react";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { useSearchUsers } from "./hooks/useSearchUsers";

function App2() {
  // ============================
  // STATE — RAW INPUT (OLD, SAME)
  // ============================
  const [query, setQuery] = useState("");

  // ============================
  // DEBOUNCED VALUE (NEW, VIA HOOK)
  // ============================
  const debouncedQuery = useDebouncedValue(query, 500);

  // ============================
  // ASYNC SEARCH (NEW, VIA HOOK)
  // ============================
  const { users, loading, error } = useSearchUsers(debouncedQuery);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Debounced GitHub User Search</h1>

      {/* ============================
          CONTROLLED INPUT (OLD, SAME)
         ============================ */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub users..."
        style={{ fontSize: "18px", padding: "10px" }}
      />

      {/* ============================
          DEBUG VISUALIZATION (OPTIONAL)
         ============================ */}
      <p>Raw query: {query}</p>
      <p>Debounced query: {debouncedQuery}</p>

      {/* ============================
          CONDITIONAL UI STATES (OLD LOGIC, CLEANER)
         ============================ */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ============================
          RESULTS LIST (OLD, SAME)
         ============================ */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
}

export default App2;
