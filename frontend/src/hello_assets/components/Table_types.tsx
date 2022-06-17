import data from "./data/attributes.json";

export default function Table_types() {
    return (
        <div className="column center homepage">
            <div className="block">
                <table>
                    <thead>
                        <tr>
                            <td>
                                <h2>
                                    Bird Types
                                </h2>
                            </td>
                        </tr>
                        <tr>
                            <th>Attribute</th>
                            <th>#</th>
                            <th>More Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bird</td>
                            <td>8861</td>
                            <td>
                                <img src="img/bird1.gif" width={48} height={48}></img>
                                <img src="img/bird2.gif" width={48} height={48}></img>
                                <img src="img/bird3.gif" width={48} height={48}></img>
                                <img src="img/bird4.gif" width={48} height={48}></img>

                            </td>
                        </tr>
                        <tr>
                            <td>Special</td>
                            <td>26</td>
                            <img src="img/bird1.gif" width={48} height={48}></img>
                            <img src="img/bird2.gif" width={48} height={48}></img>
                            <img src="img/bird3.gif" width={48} height={48}></img>
                            <img src="img/bird4.gif" width={48} height={48}></img>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="block">
                <table>
                    <thead>
                        <tr>
                            <td>
                                <h2>Attributes</h2>
                            </td>
                        </tr>
                        <tr>
                            <th>Attribute</th>
                            <th>#</th>
                            <th>More Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data) => {
                            return (
                                <tr>
                                    <td>
                                        <a href="https://entrepot.app/marketplace" target="_blank">
                                            {data.name}
                                        </a>
                                    </td>
                                    <td>{data.qte}</td>
                                    <td>
                                        <img src="img/bird1.gif" width={48} height={48}></img>
                                        <img src="img/bird2.gif" width={48} height={48}></img>
                                        <img src="img/bird3.gif" width={48} height={48}></img>
                                        <img src="img/bird4.gif" width={48} height={48}></img>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="block">
                <table>
                    <thead>
                        <tr>
                            <td>
                                <h2>
                                    Attribute Counts
                                </h2>
                            </td>
                        </tr>
                        <tr>
                            <th>Attribute</th>
                            <th>#</th>
                            <th>More Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
                                return (
                                    <tr>
                                        <td>
                                            <a href="https://entrepot.app/marketplace" target="_blank">
                                                {num} Attributes
                                            </a>
                                        </td>
                                        <td>100</td>
                                        <td>
                                            <img src="img/bird1.gif" width={48} height={48}></img>
                                            <img src="img/bird2.gif" width={48} height={48}></img>
                                            <img src="img/bird3.gif" width={48} height={48}></img>
                                            <img src="img/bird4.gif" width={48} height={48}></img>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}