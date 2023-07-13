import './home.sass'
import { useEffect, useState } from "react";
import BeerCard from "../components/beer-card/Beer-cards";

interface Beer {
    image_url: string,
    name: string,
    description: string
}

const HomeScreen = (): JSX.Element => {

    const [beers, setBeers] = useState([])

    // типи написати для beers і одного beer
    useEffect(() => {
        fetch('https://api.punkapi.com/v2/beers?page=1')
            .then(data => data.json())
            .then(data => setBeers(data))
    }, [])

    const content = beers.map((beer: Beer) => <li><BeerCard img={beer.image_url} name={beer.name} description={beer.description}/></li> )

    return (
        <section className='beer-section'>
            <h1 className='beer-section__title'>Our Beer: </h1>
            <ul className="beer-section__cards">
                {content}
            </ul>
        </section>
    );
};

export default HomeScreen;