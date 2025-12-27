# useEffect clean up after every render

at the end of useEffect 

  // Debounce logic
  useEffect(() => {
    const t = setTimeout(() => {

    setDebouncedQuery(query);
    }, 2500);

    ######## 
    return () => clearTimeout(t);
    ########
  }, [query]);     

runs if that useEffect is triggered more then once 
