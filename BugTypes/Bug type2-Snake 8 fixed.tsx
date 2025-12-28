import React from "react";

export default function FixedSnake() {
  const [count, setCount] = React.useState(0);

  // ✅ CAUSE: user action changes state
  const increment = () => {
    setCount(prev => prev + 1);
  };

  // ✅ EFFECT: reacts to state change, does NOT change it
  React.useEffect(() => {
    console.log("count changed to:", count);
  }, [count]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
    </div>
  );
}
