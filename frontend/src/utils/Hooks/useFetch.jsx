import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(url);
        setData(response);
        setIsSuccess(true)
      } catch (error) {
        setError(true)
        console.error(error)
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
    error
  };
};

export default useFetch;