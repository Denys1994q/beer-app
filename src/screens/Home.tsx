import "./Home.sass";
import { useEffect, useState, MouseEvent, useRef, LegacyRef, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import BeerCard from "../components/beer-card/Beer-cards";
import { useBeerStore } from "../store/store";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
// інтерфейси зі стору
import { BeerItem } from "../store/store";
import { BeerState } from "../store/store";

// з апі приходить 25 продуктів, в рендер завжди потрапляє 15. При першому завантаженні сторінки відбувається запит до 1 сторінки апі, отримуються 25 продуктів, з них рендеряться 15 (вони показуються по 5 товарів і підвантажують по скролу). Коли юзер скролить вниз, перші 5 товарів видаляється з масиву продуктів, а наступні 5 товарів додаються (в результаті в рендері залишається 15 карток)
// юзер може видаляти картки. Якщо юзер хоче видалити стільки карток, що в масиві залишиться менше 15 товарів, то відбувається запит до наступної сторінки апі. І замість кількості видалених, додається стільки ж нових.
const HomeScreen = (): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // список товарів зі стору, з якого формуються товари для рендеру (які й показуються) і ф-ія для запису в стор
    const beerListAll = useBeerStore((state: BeerState) => state.beerListAll);
    const setBeerList: any = useBeerStore((state: BeerState) => state.setBeerList);
    // вибрані картки, які можна видалити і ф-ія для видалення обраних карток і оновлення списку товарів
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const filterBeerListAll = useBeerStore((state: BeerState) => state.filterBeerListAll);
    // номер сторінки для апі
    const [currentPage, setCurrentPage] = useState(1);
    // індикатори для показу карток по 5 штук
    const [visibleNum, setVisibleNum] = useState(5);
    // реф для скролу при досягненню нижнього блоку
    const bottom = useRef<null | HTMLDivElement>(null);

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
                setBeerList(data, selectedCards);
                setSelectedCards([]);
                setError(false);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

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

    useEffect(() => {
        getDataFromApi(`https://api.punkapi.com/v2/beers?page=${currentPage}`);
    }, []);

    useEffect(() => {
        if (currentPage === 1) return;
        getDataFromApi(`https://api.punkapi.com/v2/beers?page=${currentPage}`);
    }, [currentPage]);

    // ф-ія для видалення картки
    const remove = () => {
        // якщо карток більше 15 і кількість карток для видалення, які обрав юзер, менша, ніж вільних місць до кінця списку, то видаляти.
        // Якщо менше - то спочатку отримати нову сторінку і тоді видалити, і відразу показати нові (наприклад, юзер вже дійшов до 23 карточки з 25 і хоче видалити ще 4 картки, тоді відбувається новий запит до наступної сторінки, видаляються 4 картки, які обрав юзер і замість них рендеряться 4 картки наступні по списку, тобто, картка 24,25 (зі старого списку) і картки 26,27 з нової сторінки). Для юзера працює так, що скільки видалив, стільки й отримав нових (хоч в цей час і відбувся запит до нової сторінки)
        if (beerListAll.length - selectedCards.length > 15) {
            filterBeerListAll(selectedCards);
            // очищаємо список вибраних інпутів
            setSelectedCards([]);
        } else {
            setCurrentPage(page => page + 1);
        }
    };

    // коли змінються кількість карток для показу (тобто, після скролу до останньої картки) видаляємо перші 5 і додаємо наступні 5
    useEffect(() => {
        // якщо менше 15 карток, то нічого не видаляємо, або якщо юзер вже вибрав на видалення стільки карток, що потрібно буде й так підвантажувати наступну сторінку, то тоді теж нічого не видаляємо 
        if (visibleNum <= 15 || beerListAll.length - selectedCards.length < 15 ) {
            return;
        } else {
            // знаходимо айді перших 5 елементів масиву, які видаляємо
            const idsArr: any = [];
            // формуємо з них масив і видаляємо з масиву карток
            beerListAll.slice(0, 5).map((item: any) => {
                idsArr.push(item.id);
            });
            setSelectedCards(idsArr);
            if (beerListAll.length - idsArr.length >= 15) {
                filterBeerListAll(idsArr);
                // очищаємо список вибраних інпутів
                setSelectedCards([]);
            } else {
                setCurrentPage(page => page + 1);
            }
        }
    }, [visibleNum]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        };
        // таймаут для коректної роботи IntersectionObserver з ДОМ (кращого рішення не знайшов)
        let timer = setTimeout(() => {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    // коли доходидо до блоку bottom показуємо наступні 5 карток
                    setVisibleNum((prev: number) => prev + 5);
                }
            }, options);
            if (bottom.current) observer.observe(bottom.current);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // рендеримо 15 перших товарів із 25 загалом, які записані в стор або помилку, якщо вона є
    const content = error ? (
        <h3 className='error-msg'>Sorry, service is an unavailable</h3>
    ) : (
        <>
            <ul className='beer-section__cards'>
                {beerListAll.slice(0, 15).map((beer: BeerItem, index: number) => (
                    <li
                        style={{ maxWidth: 650, display: index < visibleNum ? "block" : "none" }}
                        key={beer.id}
                        onContextMenu={e => selectCard(e, beer.id)}>
                        <Link to={`${currentPage}/${beer.id}`}>
                            <BeerCard
                                selected={selectedCards.indexOf(beer.id) > -1}
                                {...beer}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
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
            <Box
                sx={{
                    display: selectedCards.length > 0  ? "flex" : "none",
                    justifyContent: "center",
                    position: "fixed",
                    top: "20px",
                    left: "50%",
                    transform: "translate(-50%)",
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
            <div ref={bottom}>{""}</div>
        </section>
    );
};

export default HomeScreen;
