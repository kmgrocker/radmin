import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const fetchData = async () => {
      setLoading(true);
      setError("");
      setData([]);
      try {
        const res = await axios.get(url, { cancelToken: token });
        setData(res.data);
      } catch (err) {
        setError(err);
        setData([]);
      }
      setLoading(false);
      setError("");
    };
    fetchData();

    return () => {
      cancel();
    };
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    setError("");
    setData([]);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
      setData([]);
    }
    setLoading(false);
    setError("");
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
