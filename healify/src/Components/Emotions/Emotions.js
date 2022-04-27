import React, { useState } from "react";
import { Header } from "../Home/Header";
import './Emotions.css';

export const Emotions = ({body}) => {
    const [ value, setValue ] = useState();
    const handleChange = event => {
        setValue(event.target.value);
    }

    const handleSubmit = event => {
        alert('You submitted submitted: ' + setValue(event.target.value));
        event.preventDefault();
    }

    var myHeaders = new Headers();
    myHeaders.append("apikey", "YSVR9r2jL28VJV9U6VxXly22Jvrs8RP1");

    const raw = value;

    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders,
        body: raw
    };

    fetch("https://api.apilayer.com/text_to_emotion", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch( error => console.log( 'error', error ) );

    return (
        <>
          <Header/>
          <div className="emotion">
          <form className="emotion__form" onSubmit={handleSubmit}>
            <label className="emotion__form">
                Say anything you'de like to talk about:
                <input type="text" value={value} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
          </div>
        </>
    );
};
