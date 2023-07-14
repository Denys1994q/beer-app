import "./home.sass";
import { useEffect, useState, MouseEvent } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import BeerCard from "../components/beer-card/Beer-cards";
import { useBeerStore } from "../store/store";

// типи написати для beers і одного beer
interface Beer {
    id: string;
    image_url: string;
    name: string;
    description: string;
}

const HomeScreen = (): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const setBeerList = useBeerStore((state: any) => state.setBeerList);
    // список товарів зі стору
    const beerListFromStore = useBeerStore((state: any) => state.beerList);
    // вибрані картки
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    // номер сторінки для апі
    const [currentPage, setCurrentPage] = useState(1);
    // 
    const [offset, setOffset] = useState(5);

    const getDataFromApi = (url: string): void => {
        setLoading(true);
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error("could not fetch data");
                }
                return res.json();
            })
            .then(data => {
                setBeerList(data);
                setError(false);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        getDataFromApi(`https://api.punkapi.com/v2/beers?page=${currentPage}`);
    }, []);

    useEffect(() => {
        // якщо закінчилися товари в списку, отримуємо нові 25 з АПІ
        if (beerListFromStore.length === 0) {
            setCurrentPage(current => current + 1);
        }
    }, [beerListFromStore]);

    useEffect(() => {
        getDataFromApi(`https://api.punkapi.com/v2/beers?page=${currentPage}`);
    }, [currentPage]);

    // ф-ія для видалення карточки
    const filterBeerList = useBeerStore((state: any) => state.filterBeerList);

    // ф-ія по вибору карточки
    const selectCard = (e: MouseEvent, id: string) => {
        e.preventDefault();
        // якщо немає в масиві - додаємо, якщо є - видаляємо
        if (selectedCards.indexOf(id) === -1) {
            setSelectedCards(old => [...old, id]);
        } else {
            setSelectedCards(selectedCards.filter(card => card !== id));
        }
    };

    // рендеримо 15 перших товарів із 25 загалом, які записані в стор або помилку, якщо вона є
    const content = error ? (
        <h3 className='error-msg'>Sorry, service is an unavailable</h3>
    ) : (
        <ul className='beer-section__cards'>
            {beerListFromStore.slice(0, 15).map((beer: Beer) => (
                // якісь показувати, якісь ні
                // якщо індекс менше параметра з стейту, який треба зробити, то пропс якийсь йде тру і картка показується. А параметр цей спочатку 5, а потім при скролі вниз має стати 10. І тоді треба подумати як перші 5 забрати. 
                <li
                    key={beer.id}
                    onContextMenu={e => selectCard(e, beer.id)}>
                    <BeerCard
                        id={beer.id}
                        isShown={true}
                        selected={selectedCards.indexOf(beer.id) > -1}
                        filterBeerList={filterBeerList}
                        img={beer.image_url}
                        name={beer.name}
                        description={beer.description}
                    />
                </li>
            ))}
        </ul>
    );

    return (
        <section className='beer-section'>
            <h1 className='beer-section__title'>Our Beer: </h1>
            {loading ? (
                <div>
                    <CircularProgress />
                </div>
            ) : (
                content
            )}
        </section>
    );
};

export default HomeScreen;
