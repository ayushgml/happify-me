import React from "react";
import { Header } from "../Home/Header";

export const Chatbot = () => {
    var chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute("page_id", "116051521084170");
    chatbox.setAttribute( "attribution", "biz_inbox" );
    
    window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v13.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    return (
        <>
          <Header/>
        <div className="fb-root">
                
          </div>

            <div className="fb-customer-chat">
                
        </div>
        </>
    );
};