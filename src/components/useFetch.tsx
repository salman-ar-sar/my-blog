import { useState, useCallback, useEffect } from "react";

const useFetch = <T extends unknown>(url: string) => {
  const [data, setData] = useState<T>();
  const [isPending, setIsPending] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = useCallback(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error("Couldn't fetch");
        }
        setErrorMsg("");
        return response.json();
      })
      .then((articles) => setData(articles))
      .catch((error) => setErrorMsg(error.message))
      .finally(() => setIsPending(false));
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isPending, errorMsg };
};

export default useFetch;
