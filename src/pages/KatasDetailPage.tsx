import React, { useEffect } from "react";

// React Router DOM imports 
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";


export const KatasDetailPage = () => {

    let loggedIn = useSessionStorage("sessionJWToken");
    // variable to navigate between stack of routes
    let navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            return navigate("/login");
        }
    }, [loggedIn]);

    // Find the id from the url
    let { id } = useParams();

    return (
        <div>
            <h1>
                Katas Details Page {id}
            </h1>
        </div>
    );
};