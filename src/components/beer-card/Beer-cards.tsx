import * as React from "react";
import { useState, MouseEvent } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./Beer-card.sass";
import CardMedia from "@mui/material/CardMedia";
import "./Beer-card.sass";
import Typography from "@mui/material/Typography";
import { useBeerStore } from "../../store/store";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderIcon from "@mui/icons-material/Folder";
import Box from "@mui/material/Box";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import { BeerItem } from "../../store/store";

interface BeerCardProps extends BeerItem {
    selected: boolean;
}

const BeerCard = ({
    id,
    tagline,
    food_pairing,
    first_brewed,
    selected,
    image_url,
    name,
    description,
}: BeerCardProps): JSX.Element => {
    return (
        <div className={selected ? "beerCard beerCard-active" : "beerCard"}>
            <h1>{id}</h1>
            <Card sx={{  display: "flex", flexDirection: "column", height: '100%' }}>
                <Box sx={{ display: "flex",  }}>
                    <CardMedia
                        sx={{ height: 400, width: 400, backgroundSize: "contain", margin: "1rem" }}
                        image={image_url}
                        title='product-image'
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant='h3'
                            component='div'>
                            {name}
                        </Typography>
                        <Typography
                            sx={{ fontWeight: "bold", marginBottom: "10px", color: "red" }}
                            variant='h5'
                            color='text.secondary'>
                            {tagline}
                        </Typography>
                        <Typography
                            variant='h5'
                            color='text.secondary'>
                            {description.length > 200 ? description.slice(0, 200) + "..." : description}
                        </Typography>
                        <Box sx={{ marginTop: "10px" }}>
                            <Box sx={{ marginTop: "10px" }}>
                                <List
                                    dense
                                    disablePadding
                                    subheader='Tastes great with:'>
                                    {food_pairing.map((value: string) => (
                                        <ListItem
                                            sx={{ color: "#000" }}
                                            key={value}
                                            divider
                                            disableGutters>
                                            <ListItemIcon>
                                                <SportsBarIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primaryTypographyProps={{ fontSize: "14px" }}
                                                primary={`${value}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <Typography
                                sx={{ marginTop: "10px", textAlign: "end" }}
                                variant='h5'
                                color='text.secondary'>
                                First brewed in {first_brewed}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </div>
    );
};

export default BeerCard;
