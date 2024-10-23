// de prueba
import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

function LoginGoogle() {

    const clientLoginGoogleId = '280023233018-dlrh46gjnq2pfa4o5hu43b4u7k7enm6d.apps.googleusercontent.com';
    const [user, setUser] = useState({});
    //no se ha registrado
    const [loggeIn, setLoggetInfo] = useState(false);

    const onSuccess = () => {
        setUser(response.profileObj);
        document.getElementsByClassName("btn").hidden = true;
      }

      const onFailure = () => {
        console.log("Something went wrong");
      }

      const handleLogout  = () => {
        setUser({}); 
      }

      useEffect(() => {
        const start = () => {
          gapi.client.auth2({
            clientId: clientLoginGoogleId,
          });
        }
        gapi.load("client:auth2", start);
      });

  return (
    <div className="center">
        <h1>Login</h1>

        <div className="btn">
            <GoogleLogin
            clientId={clientLoginGoogleId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText="Continue with Google"
            cookiePolicy={"single_host_origin"}
            />
        </div>

        <div class={user ? "profile" : "hidden"}>
            <img src={user.imageUrl} alt="Imagen Usuario" />
            <h3>{user.name}</h3>
        </div>
        
    </div>
  )
}

export default LoginGoogle