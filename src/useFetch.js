import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setdata] = useState(null);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(null);
    const abortCont = new AbortController();
    useEffect(() => {
        setTimeout(() => {
        fetch(url, {signal: abortCont.signal})
        .then(res => {
          if(!res.ok){
            throw Error("Could not fetch the data");
          }
            return res.json();
        })
        .then(data => {
            setdata(data);
            setPending(false);
            setError(null);
        }).catch(err =>{
            if (err.name === "AbortError"){
                console.log("fetch aborted");
            }else{
                setPending(false);
                setError(err.message);
            }
          
        })
    }, 1000)
        return () => abortCont.abort();

      }, [url]);
    return {data, error, isPending};
}
 
export default useFetch;