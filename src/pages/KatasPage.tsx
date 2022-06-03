import { AxiosResponse } from "axios";
import React, { useEffect, useState} from "react";

// React Router DOM imports 
import { useNavigate } from "react-router-dom";

import { useSessionStorage } from "../hooks/useSessionStorage";
import { getAllKatas } from "../services/katasServices";

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
    const navigateToKatasDetail = (id: number) => {
        navigate (`/katas/${id}`);
    }

    return (
        <div>
        <h1>Katas Page</h1>
    
        { katas.length > 0 ?
            <div>
                <ul>
                {/* TODO: Export to isoleted component */}
                { katas.map((kata:any) => 
                (
                    <li key={kata._id}>
                        {kata.name}
                    </li>
                )
                )}
                </ul>
            </div>
        :
            <div>
                <h3> No Katas found</h3>
            </div>
        }
        </div>
    );
};