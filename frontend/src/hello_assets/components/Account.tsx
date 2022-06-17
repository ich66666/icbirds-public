import { useAuth } from "./utils/auth";
import LoginWallet from "./Login-Wallet";
import { useEffect, useState } from "react";
import { useLocalState } from "./utils/state";



export default function Account() {
    const authContext = useAuth();
    const state = useLocalState();


    let hex = authContext.principal?.toString() as string;
    let balance = String(state.balance);

    useEffect(() => {
        state.refreshBalance()
        
    }, [authContext.principal, authContext.token]);
    
    if (authContext.principal)

        return (
            <div style={{ marginRight: "1em", display: "flex", flexDirection: "column" }}>
                <span>Account: {hex?.substring(0, 5)}...{hex?.substring(60)}</span>
                <span>Balance: {balance.substring(0,balance.length-3)}.{balance.substring(balance.length-3)} <img src="/icbirds_coin.png" style={{ width: "1.5em", marginLeft: "1em" }}></img></span>
            </div>
        );
    return (
        <>
            <span style={{ marginTop: "1em", marginRight: "1em" }}>Please Connect</span>
            <LoginWallet />
        </>
    );


}