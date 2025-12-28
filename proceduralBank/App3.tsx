// like an object but with semicolon separation of members ...

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


type FormState = {

}

// query: string;
// autoSearch: boolean;


  const [form, setForm] = useState<FormState>({
    query: "",
    minLength: 3,
    autoSearch: true,
  });


const [form, setForm] = useState<FormState>({
    query: "",
    minLength: 3, 
autoSearch: true,
})


  const isValid = form.query.length >= form.minLength;


//half 

const isValid = 
form.query.length 

>= form.minLength



const isValid = form.query.length >= form.minLength


  // fetch on debouncedQuery update
  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]);
      return;
    }

    // start loading
    setLoading(true);
    setError("");



setLoading(true);
setError("");


if (!debouncedQuery) {
    setUsers([]);
    return;
}

if (!debouncedQuery) {
    setLoading(true);
    setError(null);

}




// abort initiate
    const controller = new AbortController();

const controller = 
new AbortController();

const controller = new AbortController();


// fetch async 3 chain

fetch(``)
fetch(``,{})

fetch(``, {
    signal: controller.signal,
})

fetch(`https://api.github.com/search/users?q=${debouncedQuery}`)

fetch(`https://api.github.com/search/users?q=${debouncedQuery}`, {
    signal: controller.signal,
})
.then()
.then()
.catch()
.finally()

.then(res => res.json())
.then(data => {
    if(data.items) {
        setUsers(data.items.slice(0,10));
    }
})
.catch(err => {
    if (err.name !== "AbortError") {
        setError("failed to fetch.."))
    }
})
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