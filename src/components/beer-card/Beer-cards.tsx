import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import './Beer-card.sass'
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface BeerCardProps {
    img: string,
    title: string,
    description: string,
    
}

const BeerCard = (): JSX.Element => {
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 200, width: 200, backgroundSize: 'contain', margin: '0 auto', marginTop: '1rem' }}
                    image='https://images.punkapi.com/v2/13.png'
                    title='beer-image'
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant='h2'
                        component='div'>
                        Lizard
                    </Typography>
                    <Typography
                        variant='h5'
                        color='text.secondary'>
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                        continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size='medium' color="error" sx={{fontSize: 12}}>Delete</Button>
                </CardActions>
            </Card>
        </>
    );
};

export default BeerCard;
