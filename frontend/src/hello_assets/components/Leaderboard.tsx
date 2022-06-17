import { useLocalState } from "./utils/state";
import { useAuth } from "./utils/auth";
import React, { useState, useEffect } from 'react';
import { Principal } from "@dfinity/principal";
import { getAccountId } from "../components/utils/converter";

export default function LeaderBoard() {
    const auth = useAuth();

    const [scores, setScores] = useState<[Principal, bigint][] | null>(null);


    function compare(a, b) {
        if (a[1] < b[1]) {
            return -1;
        }
        if (a[1] > b[1]) {
            return 1;
        }
        return 0;
    }

    var sc;

    useEffect(() => {
        // Update the document title using the browser API
        if (auth.score) auth.score.get_all_score().then((r) => {
            console.log(r);
            sc = r;
            sc.sort(compare);
            sc.reverse();
            setScores(sc)
        });
    }, [auth.score]);

    const getUrl = (p) => {
        let url = "https://t5t44-naaaa-aaaah-qcutq-cai.raw.ic0.app/holder/"

        return url + getAccountId(p) + "/summary"
    }
    console.log(sc)

    return (
        <>
            <div className="column center" style={{ margin: "10%", textAlign: "center", flexDirection: "column" }}>
                <table className="table">
                    <thead style={{ textAlignLast: "center" }}>
                        <tr>
                            <th>Rank</th>
                            <th>Principal</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores ? scores.map((e, index) =>
                            <tr>
                                <td>{index + 1}.</td>
                                <td>
                                    <a href={getUrl(e[0])} target="_blank">
                                        {e[0].toText().substring(0, 5)}...{e[0].toText().substring(60)}
                                    </a>
                                </td>
                                <td>{e[1].toString() as String}</td>
                            </tr>
                        ) : <></>}
                    </tbody>
                </table>
                {scores ? <></> : <p>Please connect to view the leaderboard.</p>}
            </div>

        </>
    )
}