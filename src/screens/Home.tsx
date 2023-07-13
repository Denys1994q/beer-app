import { useEffect, useState } from "react";
import BeerCard from "../components/beer-card/Beer-cards";

const HomeScreen = (): JSX.Element => {

    const [beers, setBeers] = useState([])

    // типи написати для beers і одного beer
    useEffect(() => {
        fetch('https://api.punkapi.com/v2/beers?page=1')
            .then(data => data.json())
            .then(data => setBeers(data))
    }, [])

    const content = beers.map(beer => <li><BeerCard /></li> )

    return (
        <>
            <ul>
                {content}
            </ul>
           
        </>
    );
};

export default HomeScreen;