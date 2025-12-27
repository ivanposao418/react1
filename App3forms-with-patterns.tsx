import React, { useEffect, useMemo, useState } from "react";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

type User = {
  id: number;
  login: string;
  html_url: string;
};

type FormState = {
  query: string;
  minLength: number;
  autoSearch: boolean;
};

export default function App3() {
  const [form, setForm] = useState<FormState>({
    query: "",
    minLength: 3,
    autoSearch: true,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [submittedQuery, setSubmittedQuery] = useState("");

  const trimmedQuery = useMemo(
    () => form.query.trim(),
    [form.query]
  );

  const isValid = trimmedQuery.length >= form.minLength;

  const debouncedQuery = useDebouncedValue(trimmedQuery, 500);

  const activeQuery = form.autoSearch
    ? debouncedQuery
    : submittedQuery;

  useEffect(() => {
    if (!activeQuery || !isValid) {
      setUsers([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(activeQuery)}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setUsers(data.items ?? []);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError(err?.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    run();
    return () => controller.abort();
  }, [activeQuery, isValid]);

  function update<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmittedQuery(trimmedQuery);
  }

  function handleClear() {
    setForm({ query: "", minLength: 3, autoSearch: true });
    setSubmittedQuery("");
    setUsers([]);
    setError(null);
    setLoading(false);
  }

  const showValidation =
    trimmedQuery.length > 0 && !isValid;

  return (
    <div style={{ padding: "40px", maxWidth: 800 }}>
      <h1>App3 — Form-driven Search</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={form.query}
          onChange={(e) => update("query", e.target.value)}
        />

        <input
          type="number"
          value={form.minLength}
          onChange={(e) =>
            update("minLength", Number(e.target.value))
          }
        />

        <label>
          <input
            type="checkbox"
            checked={form.autoSearch}
            onChange={(e) =>
              update("autoSearch", e.target.checked)
            }
          />
          Auto search
        </label>

        <button
          type="submit"
          disabled={form.autoSearch || !isValid}
        >
          Submit
        </button>

        {showValidation && (
          <p style={{ color: "orange" }}>
            Query must be at least {form.minLength} characters
          </p>
        )}
      </form>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && activeQuery && users.length === 0 && (
          <p>No results</p>
        )}

        <ul>
          {users.map(u => (
            <li key={u.id}>{u.login}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
