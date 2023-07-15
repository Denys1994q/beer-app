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

// interface BeerCardProps {
//     id: string;
//     img: string;
//     name: string;
//     description: string;
//     selected: boolean;
//     filterBeerList: any;
//     isShown: boolean;
//     first_brewed: string
// }

const BeerCard = ({
    id,
    first_brewed,
    selected,
    image_url,
    name,
    description,
    filterBeerList,
}: any): JSX.Element => {
    return (
        <div
            
            className={selected ? "beerCard beerCard-active" : "beerCard"}>
            <Card sx={{ maxWidth: 645, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex" }}>
                    <CardMedia
                        sx={{ height: 300, width: 300, backgroundSize: "contain", margin: "1rem" }}
                        image={image_url}
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
                            {description.length > 300 ? description.slice(0, 300) + "..." : description}
                        </Typography>
                        <Box sx={{marginTop: '10px'}}>
                            <Typography
                                variant='h5'
                                color='text.secondary'>
                                First brewed in {first_brewed}
                            </Typography>
                        </Box>
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
