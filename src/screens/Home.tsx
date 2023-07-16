import "./home.sass";
import { useEffect, useState, MouseEvent, useRef, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import BeerCard from "../components/beer-card/Beer-cards";
import { useBeerStore } from "../store/store";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
    const beerListAll = useBeerStore((state: any) => state.beerListAll);
    const beerListRendered = useBeerStore((state: any) => state.beerListRendered);
    const setBeerListRendered = useBeerStore((state: any) => state.setBeerListRendered);
    const addToBeerListRendered = useBeerStore((state: any) => state.addToBeerListRendered);
    // вибрані картки
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    // ф-ія для видалення карточки
    const filterBeerList = useBeerStore((state: any) => state.filterBeerList);
    // номер сторінки для апі
    const [currentPage, setCurrentPage] = useState(1);
    // офсет для скролу
    const [offset, setOffset] = useState(0);
    // реф для скролу
    const bottom = useRef(null);

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
                setBeerListRendered();
                setError(false);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    // useEffect(() => {
    //     getDataFromApi(`https://api.punkapi.com/v2/beers?page=1`);
    // }, []);

    // useEffect(() => {
    //     if (beerListRendered.length !== 15) {
    //         console.log('changes')
    //     }
    //     console.log('changes2')

    // }, [beerListRendered])

    // useEffect(() => {
    //     getDataFromApi(`https://api.punkapi.com/v2/beers?page=${currentPage}`);
    // }, []);

    // 25 айтемів з сторінки 1
    // з них 15 перших показуємо, якщо менше 15 стає, додаємо з 10, які залишилися
    // якщо закінчилися 10, робимо запит на сторінку №2

    // 25 айтемів зі сторінки 2
    // з них показуємо не 15, а додаємо скільки видалено

    // const [diff, setDiff] = useState(0);
    const [start, setStart] = useState(15);
    useEffect(() => {
        // якщо стало менше 15 товарів (юзер видалив якусь кількість )
        if (beerListRendered.length > 0 && beerListRendered.length < 15) {
            // скільки товарів потрібно додати, щоб знову було 15. Наприклад, видалив 3. 15-12=3
            const difference = 15 - beerListRendered.length;
            setStart(old => old + difference)

            // setDiff(diff => diff + selectedCards.length);

            // масив товарів із поки невідрендерених, які потрібно додати до рендеру
            // ! от чому start 15
            const beerItemsArrToAdd = beerListAll
                .filter((beer: any, index: number) => index >= start)
                .slice(0, difference);
            if (beerItemsArrToAdd.length > 0) {
                addToBeerListRendered(beerItemsArrToAdd);
            } else {
                // setDiff(0);
                setStart(0);
                setCurrentPage(old => old + 1);
            }
        }
    }, [beerListRendered]);

    useEffect(() => {
        if (currentPage === 1) {
            getDataFromApi(`https://api.punkapi.com/v2/beers?page=${currentPage}`);
        } else {
            fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}`)
                .then(res => res.json())
                .then(data => {
                    setBeerList(data);
                });
        }
    }, [currentPage]);

    useEffect(() => {
        if (currentPage === 1) {
            return;
        }
        setStart(old => old + 1);
        const beerItemsArrToAdd = beerListAll.filter((beer: any, index: number) => index >= start).slice(0, 1);
        if (beerItemsArrToAdd.length > 0) {
            addToBeerListRendered(beerItemsArrToAdd);
        }
    }, [beerListAll]);

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

    // ф-ія для видалення картки
    const remove = () => {
        // ф-ія зі стору
        filterBeerList(selectedCards)
        // очищаємо список вибраних інпутів
        setSelectedCards([])
    }

    // спробувати без колбеку
    // useEffect(() => {
    //     for (let i = 0; i <= offset; i++) {
    //         filterBeerList(i);
    //     }
    // }, [offset]);

    // useEffect(() => {
    //     const options = {
    //         root: null,
    //         rootMargin: "20px",
    //         threshold: 1.0,
    //     };
    //     let timer = setTimeout(() => {
    //         const observer = new IntersectionObserver(entries => {
    //             if (entries[0].isIntersecting) {
    //                 // скрол наверх сторінки
    //                 window.scrollTo({
    //                     top: 0,
    //                     behavior: "smooth",
    //                 });
    //                 setOffset(prev => prev + 5);
    //             }
    //         }, options);
    //         if (bottom.current) observer.observe(bottom.current);
    //     }, 3000);
    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, []);

    // всі складати в один масив, а показувати по 15..

    // рендеримо 15 перших товарів із 25 загалом, які записані в стор або помилку, якщо вона є
    const content = error ? (
        <h3 className='error-msg'>Sorry, service is an unavailable</h3>
    ) : (
        <ul className='beer-section__cards'>
            {beerListRendered.map((beer: Beer, index: number) => (
                <li
                    // style={{ display: index < offset && index + 1 > offset - 5 ? "block" : "none" }}
                    style={{maxWidth: 600}}
                    key={beer.id}
                    onClick={e => selectCard(e, beer.id)}>
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
                // 1232343
            )}
            <Box
                sx={{
                    display: selectedCards.length > 0 ? "flex" : "none",
                    justifyContent: "center",
                    position: "fixed",
                    top: "20px",
                    left: '50%',
                    transform: 'translate(-50%)'
                }}>
                <Button
                    variant='contained'
                    size='medium'
                    color='error'
                    onClick={remove}
                    sx={{ fontSize: 12 }}>
                    Delete
                </Button>
            </Box>
            {/* пустий дів для скролу */}
            {/* <div ref={bottom}>{""}</div> */}
        </section>
    );
};

export default HomeScreen;
