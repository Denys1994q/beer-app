import * as React from "react";
import { useState, MouseEvent } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./Beer-card.sass";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import "./Beer-card.sass";
import Typography from "@mui/material/Typography";
import { useBeerStore } from "../../store/store";
import Box from "@mui/material/Box";

interface BeerCardProps {
    id: string;
    img: string;
    name: string;
    description: string;
    selected: boolean;
    filterBeerList: any;
    isShown: boolean
}

const BeerCard = ({ isShown, id, selected, img, name, description, filterBeerList }: BeerCardProps): JSX.Element => {
    return (
        <div style={{display: isShown ? 'block' : 'none'}} className={selected ? "beerCard beerCard-active" : "beerCard"}>
            <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex" }}>
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
                </Box>
                <Box sx={{ display: selected ? "flex" : "none", justifyContent: "end" }}>
                    <CardActions>
                        <Button
                            variant='contained'
                            size='medium'
                            color='error'
                            onClick={() => filterBeerList(id)}
                            sx={{ fontSize: 12 }}>
                            Delete
                        </Button>
                    </CardActions>
                </Box>
            </Card>
        </div>
    );
};

export default BeerCard;
