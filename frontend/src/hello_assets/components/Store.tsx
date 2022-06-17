import { useEffect } from "react";
import { useAuth } from "./utils/auth";
import { useLocalState } from "./utils/state";
import { useState } from "react";

export default function Store() {
    let state = useLocalState();
    let authContext = useAuth();
    const [seconds, setSeconds] = useState(0);
    const [loadingClaim, setloadingClaim] = useState(false);

    var hours = 0;
    var minutes = 0;

    if (state.whenCanClaim) {
        hours = Math.floor(state.whenCanClaim / 60);
        minutes = state.whenCanClaim % 60;
    }



    const fetchData = async () => {
        if (authContext.principal && authContext.token) {
            setloadingClaim(true);
            authContext.token.getTokens()
                .then(
                    () => {
                        state.refreshBalance();
                        state.refreshClaimTime().then(
                            () => {
                                setloadingClaim(false);
                                console.log(state.whenCanClaim);
                                if (state.whenCanClaim) {
                                    hours = Math.floor(state.whenCanClaim / 60);
                                    minutes = state.whenCanClaim % 60;
                                }
                            }
                        );
                    }
                );
        }
    };


    const fetchDataClaimTime = async () => {
        if (authContext.principal && authContext.token) {
            state.refreshBalance();
            state.refreshClaimTime().then(
                () => {
                    console.log(state.whenCanClaim);
                    if (state.whenCanClaim) {
                        hours = Math.floor(state.whenCanClaim / 60);
                        minutes = state.whenCanClaim % 60;
                    }
                }
            );
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchDataClaimTime();
            setSeconds(seconds => seconds + 1);

        }, 10000);
        return () => clearInterval(interval);
    }, []);


    if (!authContext.principal || !state.whenCanClaim) {
        return (
            <>
                <h4>
                    <a href="https://entrepot.app/sale/icbirds" target="_blank">
                        <button>Mint a bird</button>
                    </a>
                </h4>
            </>
        )
    }

    if (state.whenCanClaim)
        return (
            <>
                <h4>
                    <a href="https://entrepot.app/sale/icbirds" target="_blank">
                        <button>Mint a bird</button>
                    </a>
                </h4>
                <p style={{ fontStyle: "italic" }}>
                    This is a beta feature
                </p>

                {state.whenCanClaim >= 0 ?
                    <div>
                        <h4>
                            Next Claim Time:
                        </h4>
                        <div>
                            <h4>
                                {Math.floor(state.whenCanClaim / 60)} hours : {state.whenCanClaim % 60} minutes
                            </h4>
                            <button onClick={fetchDataClaimTime}>
                                <img src="/refresh.png"></img>
                            </button>

                        </div>
                    </div>
                    :
                    <>

                    </>}
                {
                    state.whenCanClaim < 0 && loadingClaim ?
                        <svg viewBox="25 25 50 50">
                            <circle cx="50" cy="50" r="20"></circle>
                        </svg>
                        :
                        <></>
                }
                {
                    state.whenCanClaim < 0 && !loadingClaim ?
                        <button onClick={fetchData}>Claim tokens</button>
                        :
                        <></>
                }
                <h3 style={{ padding: "1em" }}>
                    <a href="https://medium.com/@icbirds/whats-coming-next-for-ic-birds-a5ffdaf9a41a" target="_blank ">
                        Store coming soon
                    </a>
                </h3>
            </>
        )
}