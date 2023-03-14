import React from 'react'
import { useSearchParams } from "react-router-dom";
import axios from 'axios'

const Verification = ()=> {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const uniqueString = searchParams.get("uniqueString")
    const fetchdata = async () =>{
        const {data} = await axios.get("/verify/"+id+"/"+uniqueString)
    }
    return ( <>
    bonjour verify
    </> );
}

export default Verification;