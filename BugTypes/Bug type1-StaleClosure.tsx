import React from "react";

export default function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      console.log("interval sees:", count);
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}
