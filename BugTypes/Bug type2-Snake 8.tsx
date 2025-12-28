import React from "react";

export default function Snake() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("effect runs, count =", count);
    setCount(count + 1);
  }, [count]);

  return <h1>{count}</h1>;
}
