import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./Beer-card.sass";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface BeerCardProps {
    img: string;
    name: string;
    description: string;
}

const BeerCard = ({ img, name, description }: BeerCardProps): JSX.Element => {
    return (
        <>
            <Card sx={{ maxWidth: 345, display: 'flex' }}>
                <CardMedia
                    sx={{ height: 200, width: 200, backgroundSize: "contain", margin: "1rem" }}
                    image={img}
                    title='product-image'
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant='h4'
                        component='div'>
                        {name}
                    </Typography>
                    <Typography
                        variant='h5'
                        color='text.secondary'>
                        {description.length > 200 ? description.slice(0, 200) + "..." : description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Button
                        variant='contained'
                        size='medium'
                        color='error'
                        sx={{ fontSize: 12 }}>
                        Delete
                    </Button> */}
                </CardActions>
            </Card>
        </>
    );
};

export default BeerCard;
