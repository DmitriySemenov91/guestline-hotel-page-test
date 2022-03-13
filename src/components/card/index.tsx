import React from "react";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import SwipeableTextMobileStepper from "../carousel";

import Rating from "@mui/material/Rating";

import styles from "./card.module.scss";

import { RoomCard } from "../../pages/rooms";

export type Images = {
  url: string;
};

type HotelsCardProps = {
  id: string;
  name: string;
  address1: string;
  address2: string;
  starRating: string;
  adults: string;
  children: string;
  images: Images[];
};

export const HotelCard: React.FC<HotelsCardProps> = ({
  id,
  name,
  address1,
  address2,
  starRating,
  adults,
  children,
  images,
}) => {
  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <CardActionArea>
          <div className={styles.cardContent}>
            <SwipeableTextMobileStepper images={images} />
            <div className={styles.cardInfo}>
              <div>
                <Typography gutterBottom variant="h5" component="div">
                  Hotel Name: {name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  address1: {address1 || "No adress"}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  address2: {address2 || "No adress"}
                </Typography>
              </div>
              <div className={styles.cardRating}>
                <Rating
                  name="read-only"
                  value={parseInt(starRating)}
                  readOnly
                />
              </div>
            </div>
          </div>
          <RoomCard id={id} adults={adults} children={children} />
        </CardActionArea>
      </Card>
    </div>
  );
};
