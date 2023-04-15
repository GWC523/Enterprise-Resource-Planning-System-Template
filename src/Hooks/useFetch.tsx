import { useEffect, useState } from "react"
import axios from "axios";

export type ApiResponse = {
    status: Number;
    statusText: String;
    data: any;
    error: any;
    loading: Boolean;
}

export const useFetch = (url: string): ApiResponse =>  {
    
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>("");
    const [data,setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        setLoading(true);
        axios
          .get(url, {
            headers: {
              "api-key": "daccfc89-ff47-4ce1-99bf-5ad2d8f57282",
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setData(response.data);
            setStatus(response.status);
            setStatusText(response.data.status.message);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
    },[url]);

    return {status, statusText, data, loading, error};
}

export default useFetch;