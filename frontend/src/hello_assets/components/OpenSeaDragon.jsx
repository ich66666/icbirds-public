import { render } from "react-dom"
import { useEffect, useState } from "react";
import { useLocalState } from "./utils/state";
import { Link } from "react-router-dom";


export default function OpenSeaDragon() {
    let state = useLocalState();
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "/openseadragon.js";
        script.defer = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);
    return (
        <>
            <div id="app" ></div>
            <div className="column center homepage">
                <div className="block">
                    <h3>What is ICBirds ?</h3>
                    <p className="block-content">8,888 unique characters with proof of ownership stored on the Internet Computer blockchain. The ICBirds are one of the earliest examples of a "Non-Fungible Token" used to play Games on the ICP blockchain. The idea is to develop games using the ICBirds as playable characters. This project has been selected by the <a href="https://dfinity.org/foundation">Dfinity Foundation</a> to receive a grant. We would like to introduce a game with a token as the DEXs are released on ICP.</p>
                    <p className="block-content">See the <a href="#instruction">marketplace instructions</a> below to acquire your very own Bird. You should also join the <a href="https://discord.gg/Buzfup6hwR">Discord Chat</a>, to meet the team and the community.</p>
                </div>
                <div id="openseadragon" style={{ overflow: "hidden", width: "100%", height: "300px", zIndex: 0 }} ></div>
                <div className="block" style={{ paddingTop: "1em" }}>
                    <p className="block-content">The ICBirds are 8,888 uniquely generated characters. They are among the first animated NFTs to come on the ICP. No two are exactly alike, and each one of them can be officially owned by a single person on the ICP blockchain. The launch phase will operate on the <a href="https://entrepot.app/">entrepot platform</a>. Then they must be purchased from someone via the <a href="https://entrepot.app/marketplace">entrepot marketplace</a>.</p>
                </div>
                <div className="block">
                    <h3>Stats</h3>
                    <button disabled style={{paddingLeft:"1em", paddingRight:"1em"}}>
                        <a disabled>Top Owners</a>
                    </button>
                    <button disabled style={{marginLeft:"1em", paddingLeft:"1em", paddingRight:"1em"}}>
                        <Link to="/attributes">All types and attributes</Link>
                    </button>
                </div>
                <div className="block" id="instruction" style={{paddingTop:"1em"}}>
                    <h2>How do I get a Bird?</h2>
                    <ol>
                        <li>Download and install a Chrome browser plugin called <a href="https://plugwallet.ooo/">Plug Wallet</a>. This will allow websites (that you authorize) access to your ICP account.</li>
                        <li>If you made a new account, buy some ICP. You can buy ICP on centralized exchange such as <a href="https://www.binance.com/en">Binance</a> or <a href="https://www.coinbase.com/">Coinbase</a> and then transfer it to your Plug Wallet address.</li>
                        <li>Once you have your wallet set up go on <a href="https://entrepot.app/">entrepot</a> and you will be able to bid on, buy and sell punks</li>
                    </ol>
                </div>

                <div className="block">
                    <h2>Details and FAQ</h2>
                    <h3>What is a ICBirds?</h3>
                    <p className="block-content">The ICBirds are 32x32 pixel art images, generated algorithmically. Most are Birds, but there are a few rarer types mixed in.</p>
                </div>
                <div className="block">
                    <h3>Where are the GIFs for the Birds stored ?</h3>
                    <p className="block-content">The images of the Birds are stored on-chain. Indeed, the ICP blockchain is a really special blockchain. For example, on the ethereum blockchain, usually the nfts are stored on IPFS and only the file location hash is stored in the <a href="https://eips.ethereum.org/EIPS/eip-721">erc-721 token</a>. Except for the CryptoPunks, one of the pioneers of the NFT ecosystem on ethereum, they managed to put the entire image and attribute data fully on chain.</p>
                </div>
                <div className="block">
                    <h3>Do you charge any fees for transactions?</h3>
                    <p className="block-content">No. We charge no fees for ICBirds transacted through the <a href="https://entrepot.app/">entrepot market</a> beyond the ones charged by ICP (gas) and entrepot. The contract source and more technical details will be available on Github.</p>
                </div>
            </div>
            <footer style={{ padding: "70px", backgroundColor: "#f5f5f5" , textAlign: "right"}}>
                <a href="https://twitter.com/ic_birds">Twitter</a>
                <img src="/powered.svg" style={{marginLeft:"1em"}}></img>

            </footer>
        </>
    );
}