import "./home.sass";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import BeerCard from "../components/beer-card/Beer-cards";

// типи написати для beers і одного beer
interface Beer {
    image_url: string;
    name: string;
    description: string;
}

const HomeScreen = (): JSX.Element => {
    const { data: beers, loading, error } = useFetch("https://api.punkapi.com/v2/beers?page=1");

    const beerCardsContent = beers && beers.length > 0 ? beers.map((beer: Beer) => (
        <li>
            <BeerCard
                img={beer.image_url}
                name={beer.name}
                description={beer.description}
            />
        </li>
    )) : 'No beer found';

    const content = error ? "Sorry" : <ul className="beer-section__cards">{beerCardsContent}</ul>;

    return (
        <section className='beer-section'>
            <h1 className='beer-section__title'>Our Beer: </h1>
            {loading ? "Spinner" : content}
        </section>
    );
};

export default HomeScreen;
