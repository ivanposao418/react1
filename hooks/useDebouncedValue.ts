import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(t);
  }, [value, delay]);

  return debouncedValue;
}

/* 
ok dakle ovaj hook izvrsava jedan dio zove druge hookove, a drugi vraca jer je potreban komponenti koja ga zove.

🔒 Final confirmation (important)
What a custom hook is

a plain function

that calls other hooks

runs on every render

can keep its own state

returns values to the component */