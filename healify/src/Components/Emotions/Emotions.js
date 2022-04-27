import React from "react";
import { Header } from "../Home/Header";

export const Emotions = () => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "YSVR9r2jL28VJV9U6VxXly22Jvrs8RP1");

    var raw = "{body}";

    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders,
        body: raw
    };

    fetch("https://api.apilayer.com/text_to_emotion", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    return (
        <>
          <Header/>
          <div>
            
          </div>
        </>
    );
};
