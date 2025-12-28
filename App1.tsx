// Feinman with some AI v1.1

// i ll explain like richard feynman method here what happens in this code, 

// first we import useEffect and useState from react
// then we define a constant array ITEMS which contains a list of fruit names as strings

// then we define our main component function App

// inside App we define three state variables using useState hook: query, debouncedQuery and results
// query and debouncedQuery are both strings initialized to empty string
// results is an array of strings initialized to an empty array
// then we have a useEffect hook that implements the debounce logic
// it sets a timeout of 2.5 seconds whenever query changes
// after 2.5 seconds of inactivity, it updates debouncedQuery to be equal to query
// if query changes again before the timeout completes, the previous timeout is cleared

// then we have another useEffect hook that runs whenever debouncedQuery changes
// it filters the ITEMS array to find items that include the debouncedQuery string (case insensitive)
// the filtered results are then stored in the results state variable
// functon at bottom uf useEffect clears the timeout when query changes if useEffect is triggered again before timeout 
// completes

// finally we return some JSX to render the UI
// it includes an input box where users can type their search query
// as users type, the query state is updated
// we also display the raw query and debounced query below the input box
// and we render a list of filtered results based on the debounced query
// the results are displayed as a list of items that match the debouncedQuery

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
