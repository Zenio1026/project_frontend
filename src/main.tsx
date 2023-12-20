// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as FirebaseAuthService from "./authService/FirebaseAuthService.ts"

FirebaseAuthService.serviceInit();

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <>
        <div className="container">
            <App/>

            <video className="videoTag" autoPlay loop muted>
                <source src="./../public/PS5-theme.mp4" type="video/mp4"/>
            </video>
        </div>

        {/*<>*/}
        {/*    <div className="wave"></div>*/}
        {/*    <div className="wave"></div>*/}
        {/*    <div className="wave"></div>*/}
        {/*</>*/}

    </>
    // </React.StrictMode>,
)
