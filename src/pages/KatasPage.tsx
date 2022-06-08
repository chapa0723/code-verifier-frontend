import { AxiosResponse } from "axios";
import React, { useEffect, useState} from "react";

// React Router DOM imports 
import { useNavigate } from "react-router-dom";

import { useSessionStorage } from "../hooks/useSessionStorage";
import { getAllKatas } from "../services/katasServices";
import { Kata } from "../utils/types/Kata.type";

export const KatasPage = () => {

    let loggedIn = useSessionStorage('sessionJWToken');
    // variable to navigate between stack of routes
    let navigate = useNavigate();
    // State of component

    const [katas, setKatas] = useState ([]); // initial katas is empty
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login');
        }else {
            getAllKatas(loggedIn, 2, 1).then((response: AxiosResponse) =>{
                
                if(response.status === 200 && response.data.katas && response.data.totalPages && response.data.totalPages){
                    console.table (response.data)
                    let { katas, totalPages, currentPage } = response.data;
                    setKatas (katas);
                    setCurrentPage (currentPage);
                    setTotalPages (totalPages);
                }else {
                    throw new Error (`Error obtaining Katas ${response.data}`)
                }
            }).catch((error) => console.error(`Get All Katas Error ${error}`))
        }
    }, [loggedIn])


    /**
     * Method to Navigate to Katas Detail
     * @param id of katas to navigate
     */
    const navigateToKatasDetail = (id: string) => {
        navigate (`/katas/${id}`);
    }

    return (
        <div>
        <h1>Katas Page</h1>
    
        { katas.length > 0 ?
            <div>
                {/* TODO: Export to isoleted component */}
                { katas.map((kata: Kata) => 
                (
                    <div key={kata._id}>
                        <h3 onClick={()=> navigateToKatasDetail (kata._id)} >{kata.name}</h3>
                        <h4>{kata.level}</h4>
                        <h5>Creator: {kata.creator}</h5>
                        <h5>Stars: {kata.stars}/5</h5>
                    </div>
                )
                )}
            </div>
        :
            <div>
                <h3> No Katas found</h3>
            </div>
        }
        </div>
    );
};