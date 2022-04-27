import React from "react";
import { Header } from "../Home/Header";

export const Videos = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'serpapi.p.rapidapi.com',
            'X-RapidAPI-Key': 'eaf5d95a255e96b5cdbca38f7a34f3214465072285b196ed11e7ebb8926371cf'
        }
    };

    const string = "I am sad"
    
    fetch('https://serpapi.p.rapidapi.com/search?q=I%20am%20sad', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch( err => console.error( err ) );
    
    return (
        <>
          <Header/>
            <div>

                
        </div>
        </>
    );
};