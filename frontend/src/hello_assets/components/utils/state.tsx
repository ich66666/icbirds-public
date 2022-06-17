import React, { createContext, useContext, useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import { auth, useAuth } from "./auth";
import { getAccountId } from "./converter";
import { getCanisterIds } from "../canister/principals";
import jsonData from "./Angels.json";
import laserData from "./Lasereyes.json";
import hmacSHA256 from "crypto-js/hmac-sha256";

const angelSet = new Set(jsonData);
const laserSet = new Set(laserData);
const s = "";


export function tokenIdentifier(principal, index) {
    const padding = Buffer.from("\x0Atid");
    const array = new Uint8Array([
        ...padding,
        ...Principal.fromText(principal).toUint8Array(),
        ...to32bits(index),
    ]);
    return Principal.fromUint8Array(array).toText();
};

const to32bits = num => {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return Array.from(new Uint8Array(b));
}

export interface StateContext {
    userTokens: BigInt[] | null;

    displaylocalToken: string | null;
    isLaser: boolean | null;
    isAngel: boolean | null;
    displayLocalPipe: string | null;
    displayLocalBackground: string | null;
    flagChangeBird: boolean;
    displaySketch: boolean;
    isWl: boolean,
    isAirdrop: boolean,
    whenCanClaim: number | null;
    balance: number;

    // leaderBoard: [Principal, bigint][] | void;

    maxScore: BigInt | null,

    displayToken: BigInt | null;
    loadingWallet: boolean;
    showSendModal: boolean;
    showListModal: boolean;
    showPurchaseModal: boolean;
    showTransferModal: boolean;
    loadUserTokens: () => Promise<void>;
    setDisplayedToken: (BigInt) => void;
    setIsWlExt: (boolean) => void;
    setIsAirdropExt: (boolean) => void;
    resizeCanvas: () => void;
    refreshClaimTime: () => Promise<boolean>;


    setdisplayedlocalToken: (string) => void;
    setdisplayedLocalBackground: (string) => void;
    setflagChangeBird: (boolean) => void;
    setdisplayedLocalPipe: (string) => void;
    setLoadingWalletChanged: (boolean) => void;
    refreshBalance: () => void;

    getHighScore: () => Promise<BigInt | void>;
    setHighScore: (BigInt) => void;
    getAllScore: () => Promise<[Principal, bigint][] | void>;


    getdisplaylocalToken: () => string;
}

export function useProvideState(): StateContext {
    const authContext = useAuth();

    const [userTokens, setUserTokens] = useState<BigInt[] | null>(null);
    const [displaySketch, setdisplaySketch] = useState(false);

    const [loadingWallet, setLoadingWallet] = useState(false);
    const [flagChangeBird, changeflagChangeBird] = useState(false);

    const [isLaser, setLaser] = useState(false);
    const [isAngel, setAngel] = useState(false);
    const [balance, setbalance] = useState(0);
    const [leaderBoard, setLeaderBoard] = useState(null);

    const [maxScore, setMaxScore] = useState<BigInt | null>(null);

    const [displayLocalPipe, setdisplayLocalPipe] = useState("");
    const [displaylocalToken, setdisplaylocalToken] = useState(" ");
    const [displayLocalBackground, setdisplayLocalBackground] = useState("");

    const [displayToken, setDisplayToken] = useState<BigInt | null>(null);

    const [sortingOrder, setSortingOrder2] = useState(true);

    const [isLoading, setLoading] = useState(false);
    const [isWl, setIsWl] = useState(false);
    const [isAirdrop, setIsAirdrop] = useState(false);
    const [listed_page, setListedPage] = useState<number | null>(null);
    const [whenCanClaim, setwhenCanClaim] = useState<number | null>(null);
    const [listed_count, setListedCount] = useState<BigInt | null>(null);

    const [showSendModal, setShowSendModal] = useState(false);
    const [showListModal, setShowListModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);


    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState({ account: null, tx: null, confirmation: null });


    const setPage = function (page: number): void {
        return setListedPage(page);
    }

    const setShowSend = function (show: boolean): void {
        if (show && displayToken === null) return;

        setShowSendModal(show);
    }

    const setShowList = function (show: boolean): void {
        if (show && displayToken === null) return;

        setShowListModal(show);
    }

    const setShowPurchase = function (show: boolean): void {
        if (show && displayToken === null) return;
        setShowPurchaseModal(show);
    }

    const setShowTransfer = function (show: boolean): void {
        if (show && authContext.wallet === undefined) return;
        setShowTransferModal(show);
    }

    const setdisplayedlocalToken = async function (name) {
        console.log("Displaying Token nb : " + name);
        // Check Laer Eyes and angel head
        if (angelSet.has(parseInt(name))) {
            setAngel(true);
        }
        else {
            setAngel(false);
        }
        if (laserSet.has(parseInt(name))) {
            setLaser(true);
        }
        else {
            setLaser(false);
        }
        let can = getCanisterIds().icbirds;
        let r = tokenIdentifier(can, name);
        setdisplaylocalToken(r);
    }

    const setIsAirdropExt = function (newval) {
        setIsAirdrop(newval);
    }

    const setIsWlExt = function (newval) {
        setIsWl(newval);
    }

    const getdisplaylocalToken = function () {
        return displaylocalToken;
    }

    const setflagChangeBird = async function (state) {
        changeflagChangeBird(true);
    }

    const setdisplayedLocalPipe = async function (name) {
        setdisplayLocalPipe(name)
    }

    const setdisplayedLocalBackground = async function (name) {
        setdisplayLocalBackground(name)
    }


    const setLoadingWalletChanged = async function (bool) {
        setLoadingWallet(bool);
    }

    const setDisplayedToken = async function (id: bigint): Promise<void> {
        if (authContext.icbirds === undefined) return;

        setDisplayToken(id);
    }

    // getHighScore: () => BigInt;
    // setHighScore: (BigInt) => void;
    // getAllScore:

    const getHighScore = async function (): Promise<BigInt | void> {
        if (authContext.score === undefined) return;
        if (authContext.principal == undefined) return;

        console.log("Getting high score.");


        try {
            var s = await authContext.score.get_max_score(authContext.principal);
            console.log(s);
            setMaxScore(s);
            return s;
        }
        catch (e) {
            console.log(e);
        }
    };

    const setHighScore = async function (newBest): Promise<void> {
        if (authContext.principal == undefined) return;

        // const sha256Hasher = hmacSHA256("sha256", s);
        const str = authContext.principal.toText() + newBest.toString();
        // const h = sha256Hasher.update(str).digest("hex");
        const h = hmacSHA256(str, s).toString()

        console.log("Set score.");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "principal": authContext.principal.toText(), "score": newBest, "hash": h })
        };

        let url = "https://api-icbirds.herokuapp.com/score";

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));


        // let result = await authContext.score.set_new_score(authContext.principal, newBest);

        // console.log(result);
    }

    const getAllScore = async (): Promise<[Principal, bigint][] | void> => {
        if (authContext.score === undefined) return;

        console.log("Getting all scores.");

        return await authContext.score.get_all_score();
    }

    const resizeCanvas = async () => {
        let s = document.getElementById("defaultCanvas0");
        console.log(s);
        if (s) {
            s.style.width = "";
            s.style.height = "";

        }
    }

    const refreshBalance = async function (): Promise<void> {
        if (authContext.token && authContext.principal) {
            authContext.token.balanceOf(authContext.principal)
                .then(
                    b => {
                        setbalance(Number(b));
                    }
                );
        }
    }

    const refreshClaimTime = async function (): Promise<boolean> {
        if (userTokens && authContext.token)
            authContext.token?.getNextClaimTime(userTokens[0])
                .then(
                    claimTime => {
                        if (claimTime) {
                            console.log(claimTime);
                            setwhenCanClaim(Number(claimTime));
                        }
                        return true;
                    }
                )

        return false;
    }

    const loadUserTokens = async function (): Promise<void> {
        if (isLoading) return;
        if (authContext.icbirds === undefined) return;
        if (authContext.principal == undefined) return;
        setLoading(true);

        try {
            let accoundId = getAccountId(authContext.principal);
            console.log(authContext.principal.toText()); ``

            var tokens = await authContext.icbirds.tokens(accoundId);
            if (tokens['ok']) {
                setUserTokens(tokens['ok']);
                console.log(tokens['ok'] != [])
                if (tokens['ok'] != []) {
                    setdisplaySketch(true);
                } else {
                    setdisplaySketch(false);
                }

            }
            else if (tokens['other']) {
                setLoading(false);
                console.log(tokens['err']);
            }
            console.log("Loading user tokens");
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
        console.log(userTokens)
        setLoading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            loadUserTokens();
            console.log("loading");
        }
        fetchData();
    }, [authContext.icbirds]);

    useEffect(() => {
        const fetchData = async () => {
            refreshClaimTime();
            console.log("refreshing claim time");
        }
        fetchData();

    }, [userTokens, authContext.token, authContext.balance])

    useEffect(() => {
        if (authContext.principal) {
            let url = "https://api-icbirds.herokuapp.com/?pid=" + authContext.principal;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setIsAirdrop(data.airdrop);
                    setIsWl(data.whitelist);
                    console.log(isWl, isAirdrop);
                })
        }
    }, [authContext.principal])



    return {
        userTokens,
        displayToken,

        flagChangeBird,
        displaylocalToken,
        displayLocalPipe,
        displayLocalBackground,
        loadingWallet,
        displaySketch,
        whenCanClaim,
        balance,
        // leaderBoard,

        isWl,
        isAirdrop,
        isLaser,
        isAngel,
        maxScore,
        resizeCanvas,

        showSendModal,
        showListModal,
        showPurchaseModal,
        showTransferModal,

        loadUserTokens,
        setIsAirdropExt,
        setIsWlExt,
        refreshBalance,
        refreshClaimTime,

        setdisplayedlocalToken,
        getdisplaylocalToken,
        setflagChangeBird,
        setdisplayedLocalPipe,
        setLoadingWalletChanged,
        setdisplayedLocalBackground,
        setDisplayedToken,

        getHighScore,
        setHighScore,
        getAllScore,
    };
}

const stateContext = createContext<StateContext>(null!);

export function ProvideState({ children }) {
    const state = useProvideState();
    return <stateContext.Provider value={state}>{children}</stateContext.Provider>;
}

export const useLocalState = () => {
    return useContext(stateContext);
};
