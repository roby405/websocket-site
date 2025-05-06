import { useCallback, useState } from "react"

const ServerLocation = import.meta.env.VITE_API_BASE_URL;

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const execute = useCallback(async (endpoint="") => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }
        console.log(ServerLocation + url + "/" + endpoint);
        const res = await fetch(ServerLocation + url + "/" + endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!res.ok)
          throw new Error(`Fetch response returned error status ${res.status}`);

        const data = await res.json();
        setData(data);
        return data;

      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    }, [url]);

  return {data, loading, error, execute};
}