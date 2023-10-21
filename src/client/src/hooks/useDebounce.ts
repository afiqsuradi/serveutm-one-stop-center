import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState<T>();
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;
