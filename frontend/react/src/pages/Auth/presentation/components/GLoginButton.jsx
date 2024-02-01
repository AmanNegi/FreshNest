import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

import appState from "../../../../data/AppState";
import getCart from "../../../Cart/application/cart";
import { gSignUp } from '../../application/auth';

const GLoginButton = () => {
    const navigate = useNavigate();

    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                const data = jwtDecode(credentialResponse.credential);
                console.log(data);

                const { data: user, statusCode } = await gSignUp(data.name, data.email);

                // TODO: Save user to backend as well

                if (statusCode !== 200) {
                    toast.error("Error while logging in");
                    return;
                }
                appState.saveUserData(
                    {
                        _id: user._id,
                        name: data.name,
                        email: data.email,
                        userType: "customer",
                    },
                    true,
                );
                await getCart();
                navigate("/home");
            }}
            onError={() => {
                console.log("Login Failed");
            }}
        />
    );
}

export default GLoginButton;