// const DFX_NETWORK = process.env.REACT_APP_DFX_NETWORK || "ic";

export function getCanisterIds() {

    return {
        icbirds: "4mupc-myaaa-aaaah-qcz2a-cai",
        score : "lftgj-sqaaa-aaaal-qawwq-cai",
        icbirds_dip20: "j7afm-wiaaa-aaaak-abqka-cai",
        token_img: "https://4mupc-myaaa-aaaah-qcz2a-cai.raw.ic0.app/?cc=423&type=thumbnail&tokenid=",
        // token_img: "http://rwlgt-iiaaa-aaaaa-aaaaa-cai.localhost:8000",
        collect_url: "http://localhost:3050/collect",

        get_img: function(url: string|undefined) { return this.token_img+url; }
    }
}

