export default function About() {
    return (
        <>
            <div className="column center homepage">
                <div className="block">
                    <h2>We're 0rions, Histone and CMBB !</h2>
                    <p>ICBirds is the home for our professional and experimental projects.</p>
                    <p>We are a team of 3 french engineers and ICBirds is our first project on the ICP blockchain. We discovered this blockchain with all the interesting tech propositions that she brings. We all three graduated with our master’s degree from the same university where we met, one of the best French computer science universities.</p>
                    <p>We work in the tech industry in different computer science fields : from computer vision to AI (NLP, ML etc.) and blockchain engineering.</p>
                    <p>We want to bring to the ICP ecosystem games with really simple mechanics that are fun to play.</p>
                    <p>We want to thank the <a href="https://dfinity.org/">Dfinity Foundation</a> for making this adventure possible and giving us the ressources to discover and build on this wonderful project.</p>
                    <p>As we received a grant from the Dfinity foundation our team is fully doxed.</p>
                    <img src="/IC_logo_horizontal.svg" style={{height: "180px", marginBottom:"1em"}}></img>
                </div>
            </div>
            <footer style={{ padding: "70px", backgroundColor: "#f5f5f5", textAlign: "right" }}>
                <a href="https://twitter.com/ic_birds">Twitter</a>
                <img src="/powered.svg" style={{marginLeft:"1em"}}></img>
            </footer>
        </>
    );
}