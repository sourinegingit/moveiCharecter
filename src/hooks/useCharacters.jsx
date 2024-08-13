import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
 function useCharacters(query) {
  const [characters, SetCharecters] = useState([]);
const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        const Controller = new AbortController();
        const signal = Controller.signal;
        async function FetchData() {
          try {
            const res = await axios.get(
              `https://rickandmortyapi.com/api/character?name=${query}`,
              { signal }
            );
            // console.log(res.data);
            SetCharecters(res.data.results.slice(0, 5));
          } catch (err) {
            if (!axios.isCancel()) SetCharecters([]);
            toast.error(err.response.data.error);
          } finally {
            setIsLoading(false);
          }
        }
        FetchData();
        return () => {
          Controller.abort();
        };
      }, [query]);

      return {isLoading,characters}
}

export default useCharacters
