import React, { useEffect } from "react";

// React Router DOM imports 
import { useNavigate } from "react-router-dom";

import { useSessionStorage } from "../hooks/useSessionStorage";

export const KatasPage = () => {

    let loggedIn = useSessionStorage('sessionJWToken');
    // variable to navigate between stack of routes
    let navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login');
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
        {/* TODO: Real Katas */}
        <ul>
            {/* TODO: Export to isoleted component */}
            <li onClick={ () => navigateToKatasDetail(1) }>
                First Kata
            </li>
            <li onClick={ () => navigateToKatasDetail(2) }>
                Second Kata
            </li>
        </ul>
        </div>
    );
};