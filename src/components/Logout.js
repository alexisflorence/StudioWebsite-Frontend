import React from 'react';
//import { GoogleLogout } from 'react-google-login';
import { googleLogout } from '@react-oauth/google';
import { Button } from "react-bootstrap";

export default function Logout({setUser}){
    const handleLogout = () => {
        googleLogout()
        setUser(null);
        console.log("Logged out successfully.")
    }

    return (
        <div>
            <Button variant="secondary" size="lg"onClick={handleLogout}>Logout</Button>
        </div>
    )
}