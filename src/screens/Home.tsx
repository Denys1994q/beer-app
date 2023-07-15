import "./home.sass";
import { useEffect, useState, MouseEvent, useRef, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import BeerCard from "../components/beer-card/Beer-cards";
import { useBeerStore } from "../store/store";

// типи написати для beers і одного beer
interface Beer {
    id: string;
    image_url: string;
    name: string;
    description: string;
    first_brewed: string;
}

const HomeScreen = (): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const setBeerList = useBeerStore((state: any) => state.setBeerList);
    // список товарів зі стору
    const beerListFromStore = useBeerStore((state: any) => state.beerList);
    // вибрані картки
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    // ф-ія для видалення карточки
    const filterBeerList = useBeerStore((state: any) => state.filterBeerList);
    // номер сторінки для апі
    const [currentPage, setCurrentPage] = useState(1);
    // офсет для скролу
    const [offset, setOffset] = useState(0);
    // реф для скролу
    const loader = useRef(null);

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
        console.log(beerListFromStore);
        // getDataFromApi(`https://api.punkapi.com/v2/beers?page=${currentPage}`);
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

    // спробувати без колбеку
    // useEffect(() => {
    //     console.log('offset змінився')
    //     // filterBeerList(0)
    //     // filterBeerList(1)
    //     // filterBeerList(2)
    // }, [offset])

    // в режимі StrictMode (через подвійний рендер спочатку) показується не 5 карточок, а не 10. Якщо вимкнути або в режимі продакш - працює коректно
    // const handleObserver = useCallback((entries: any) => {
    //     const target = entries[0];
    //     if (target.isIntersecting) {
    //         // додав таймер для того, щоб була штучна затримка і не скролилося надто швидко. Оскільки попередні 5 карточок мають зникнути, то юзеру потрібен час, щоб скрол став на початкову позицію (top: 0) і тоді процес відбувся спочатку
    //         let timer = setTimeout(() => {
    //             // скрол наверх сторінки
    //             window.scrollTo({
    //                 top: 0,
    //                 behavior: "smooth",
    //             });
    //             // просто видаляти всі до певного індексу, тоді автоматично наступні 5 показуються 
    //             // filterBeerList(0)
    //             // filterBeerList(1)
    //             // filterBeerList(2)
    //             // filterBeerList(3)
    //             // filterBeerList(4)
    //             // показуємо наступні 5 карточок
    //             setOffset(prev => prev + 5);
    //         }, 500);

    //         return () => {
    //             clearTimeout(timer);
    //         };
    //     }
    // }, []);

    // useEffect(() => {
    //     let timer = setTimeout(() => {
    //         const option = {
    //             root: null,
    //             rootMargin: "20px",
    //             threshold: 1.0,
    //         };
    //         const observer = new IntersectionObserver(handleObserver, option);
    //         if (loader.current) observer.observe(loader.current);
    //     }, 500);
    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, [handleObserver]);

    // рендеримо 15 перших товарів із 25 загалом, які записані в стор або помилку, якщо вона є
    const content = error ? (
        <h3 className='error-msg'>Sorry, service is an unavailable</h3>
    ) : (
        <ul className='beer-section__cards'>
            {beerListFromStore.slice(0, 15).map((beer: Beer, index: number) => (
                <li
                    style={{ display: index < offset && index + 1 > offset - 5 ? "block" : "none" }}
                    key={beer.id}
                    onContextMenu={e => selectCard(e, beer.id)}>
                    <BeerCard
                        selected={selectedCards.indexOf(beer.id) > -1}
                        filterBeerList={filterBeerList}
                        {...beer}
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
            {/* пустий дів для скролу */}
            <div ref={loader}>{""}</div>
        </section>
    );
};

export default HomeScreen;
