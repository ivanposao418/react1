//Ok so we divide blocks into parts that are easier to remember.

// import { useState } from "react";
// 1. import (useState })
// 2. from 'react'
import { useState, useEffect } from "react";

// 1 const [query, setQuery] 
// 2 = useState("");
const [query, setQuery] = useState("");


// 1. <input
// 2. placeholder="..search"
// 3. value={query}
// 4. onChange=
// 4.1 {(e) => setQuery(e.target.value)}
// />

<input placeholder="..search" value={query} onChange={(e) => setQuery(e.target.value)} />
