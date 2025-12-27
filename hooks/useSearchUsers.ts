import { useEffect, useState } from "react";

type User = {
  id: number;
  login: string;
};

export function useSearchUsers(query: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }

    const controller = new AbortController();

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.github.com/search/users?q=${query}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        setUsers(data.items ?? []);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    run();

    return () => controller.abort();
  }, [query]);

  return { users, loading, error };
}
