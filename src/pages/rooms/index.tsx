import React from "react";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import styles from "./rooms.module.scss";

import axios, { AxiosError } from "axios";

type HotelId = {
  id: string;
  adults: string;
  children: string;
};

interface occupancyProps {
  maxAdults: number;
  maxChildren: number;
}

type RoomsCard = {
  name: string;
  id: string;
  longDescription: string;
  occupancy: occupancyProps;
};

export const RoomCard: React.FC<HotelId> = ({ id, adults, children }) => {
  const [room, setRooms] = React.useState<RoomsCard[] | null>();

  React.useEffect(() => {
    axios
      .get(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${id}`)
      .then(({ data }) => {
        setRooms(data.rooms);
      })
      .catch((err: AxiosError) => {
        setRooms([]);
        console.warn("RoomsError", err);
      });
  }, []);

  return (
    <div>
      {room?.length ? (
        room
          .filter((obj) => obj.occupancy.maxAdults.toString().includes(adults))
          .filter((obj) =>
            obj.occupancy.maxChildren.toString().includes(children)
          )
          .map((obj) => (
            <CardContent key={obj.id} className={styles.wrapper}>
              <div className={styles.wrapperLeftPart}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Room: {obj.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Adults: {obj.occupancy.maxAdults}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Children: {obj.occupancy.maxChildren}
                </Typography>
              </div>
              <div className={styles.wrapperRightPart}>
                <Typography gutterBottom variant="h5" component="div">
                  {obj.longDescription}
                </Typography>
              </div>
            </CardContent>
          ))
      ) : (
        <div>no rooms</div>
      )}
    </div>
  );
};
