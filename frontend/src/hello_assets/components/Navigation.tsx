import Navbar from 'react-bootstrap/Navbar';
import Account from './Account';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navigation() {
    const [width, setWidth] = useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    console.log(width);


    return (

        <div className="navigation">
            <Navbar bg="light" style={{ height: "80px", width: "100%" }} className="justify-content-end">
                <Navbar.Brand href="/">
                    <Link to="/home">
                        <img src="icon/logo.png" width="225px"></img>
                    </Link>
                </Navbar.Brand>
                <div className="connect">
                    <button style={{ border: "none", padding: 0, borderRadius: "50%", marginLeft: "1em" }}>
                        <a href="https://twitter.com/IC_Birds" target="_blank">
                            <img src="icon/twitter-icon.png" alt="" width="40" height="40" />
                        </a>
                    </button>
                </div>
                <div className="connect">
                    <button style={{ border: "none", padding: 0, borderRadius: "50%", marginLeft: "1em" }}>
                        <a href="https://discord.com/invite/Buzfup6hwR" target="_blank">
                            <img src="icon/discord-icon.png" alt="" width="40" height="40" />
                        </a>
                    </button>
                </div>
                <div className="connect">
                    <button style={{ border: "none", padding: 0, borderRadius: "50%", marginLeft: "1em" }}>
                        <a href="https://medium.com/@icbirds" target="_blank">
                            <img src="icon/medium.jpg" alt="" width="40" height="40" />
                        </a>
                    </button>
                </div>

                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Link to="/home" style={{ paddingRight: "1em" }}>Home</Link>
                    <Link to="/game" style={{ paddingRight: "1em" }}>Game</Link>
                    <Link to="/leaderboard" style={{ paddingRight: "1em" }}>LeaderBoard</Link>

                    <Link to="/about" style={{ paddingRight: "1em" }}>About</Link>
                    <Navbar.Text style={{ display: "flex" }}>
                        <Account />
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </div >

    );
}