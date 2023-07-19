import { useEffect, useState } from "react";
import "./OneBeerPage.sass";
import Typography from "@mui/material/Typography";
import { useBeerStore } from "../store/store";
import { useParams } from "react-router-dom";
import { BeerItem } from "../store/store";

// працює коректно при переході з попередньої сторінки, коли вже є увесь список товарів. Якщо перейти на сторінку напряму через url-адресу, то нічого не буде показано, тому що в такому разі не існує списку товарів. Це можна було б вирішити, якби був апі для отримання одного товару. Або апі для отримання всіх товарів, які є (а не по сторінках). Відповідно, щоб це виправити, разом з айді товару передаємо в роут номер сторінки, з якої цей товар. В такому разі можна зробити запит по цій сторінці і знайти потрібний товар. Але робимо це тільки тоді, коли юзер потрапив на сторінку товару не з домашньої сторінки (бо в такому разу все й так працюватиме коректно, оскільки загальний список буде сформований).
const OneBeerPage = () => {
    const { page, id }: any = useParams();
    const beerListRendered = useBeerStore(state => state.beerListAll);
    const [product, setProduct] = useState<BeerItem | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (beerListRendered && beerListRendered.length > 0) {
            const currentProduct = beerListRendered.find((item: any) => item.id === +id);
            if (currentProduct) {
                setProduct(currentProduct);
            }
        } else {
            fetch(`https://api.punkapi.com/v2/beers?page=${page}`)
                .then(res => {
                    if (!res.ok) {
                        throw Error("could not fetch data");
                    }
                    return res.json();
                })
                .then(data => {
                    const currentProduct = data.find((item: any) => item.id === +id);
                    setProduct(currentProduct);
                    if (!currentProduct) {
                        setError(true);
                    }
                })
                .catch(err => {
                    setError(true);
                });
        }
    }, []);

    return (
        <section className='card'>
            {product && (
                <>
                    <Typography
                        gutterBottom
                        variant='h1'
                        sx={{ textAlign: "center" }}
                        component='div'>
                        {product.name}
                    </Typography>
                    <div className='card__wrapper'>
                        <img
                            className='card__image'
                            src={product.image_url}
                            alt={product.name}
                        />
                        <div className='card__info'>
                            <Typography
                                gutterBottom
                                variant='h4'
                                sx={{ color: "red" }}
                                component='div'>
                                {product.tagline}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant='h4'
                                component='div'>
                                {product.description}
                            </Typography>
                        </div>
                    </div>
                </>
            )}
            {error && <h2>Sorry, nothing found</h2>}
        </section>
    );
};

export default OneBeerPage;
