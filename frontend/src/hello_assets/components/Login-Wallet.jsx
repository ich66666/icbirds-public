import { useAuth } from "./utils/auth";
import { useLocalState } from "./utils/state";
import { useEffect, useState } from "react";




export default function LoginWallet() {
    const auth = useAuth();
    const state = useLocalState();

    const [width, setWidth] = useState(window.innerWidth);


    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const loginPlug = () => {
        console.log("Logging in with plug wallet.");
        state.setLoadingWalletChanged(true);
        auth.usePlug();
    }

    const loginStoic = () => {
        console.log("Logging in with stoic wallet.");
        state.setLoadingWalletChanged(true);
        auth.useStoic();
    }

    useEffect(() => {
        if (auth.wallet !== undefined)
            auth.wallet.logIn();

    }, [auth.wallet]);
    return (
        <>
            <div className="connect" style={{ marginRight: "1em" }}>
                <button style={{ border: "none", padding: 0, borderRadius: "50%", marginLeft: "1em" }}>
                    <div onClick={loginPlug} >
                        <img src="/icon/plug.svg" width="50" height="50" style={{ borderStyle: "solid", borderRadius: "50%" }} />
                    </div>
                </button>
            </div>


            <div className="connect" style={{ marginRight: "1em" }}>
                <button style={{ border: "none", padding: 0, borderRadius: "50%", marginLeft: "1em" }}>
                    <div onClick={loginStoic} >
                        <img src="/icon/stoic_logo.jpg" width="50" height="50" style={{ borderStyle: "solid", borderRadius: "50%" }} />
                    </div>
                </button>
            </div>
        </>

    )
}