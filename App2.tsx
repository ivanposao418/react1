// Feinman with some AI v1.2

// Initial State Setup
// inside App we define five state variables using useState hook: query, debouncedQuery, users, loading and error
// query and debouncedQuery are both strings initialized to empty string
// users is an array initialized to an empty array
// loading is a boolean initialized to false
// error is a string initialized to empty string

// UseEffect 1
// then we have a useEffect hook that implements the debounce logic
// it sets a timeout of 0.5 seconds whenever query changes
// after 0.5 seconds of inactivity, it updates debouncedQuery to be equal to query
// if query changes again before the timeout completes, the previous timeout is cleared

// UseEffect 2
// then we have another useEffect hook that runs whenever debouncedQuery changes
// if debouncedQuery is empty, it clears the users array and returns early
// otherwise, it starts loading and resets any previous error
// it then makes a fetch request to GitHub's user search API with debouncedQuery as the search term
// if the fetch is successful, it updates the users state with the top 10 results
// if there's an error (excluding abort errors), it sets an error message
// finally, it stops loading once the fetch is complete
// we also set up an AbortController to cancel the fetch request if debouncedQuery changes again before the fetch completes

// UI Rendering
// finally we return some JSX to render the UI
// it includes an input box where users can type their search query
// as users type, the query state is updated
// we display a loading message when fetching data
// we display an error message if there's an error
// and we render a list of fetched GitHub users based on the debounced query
// each user is displayed with their avatar and username


import React, { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
