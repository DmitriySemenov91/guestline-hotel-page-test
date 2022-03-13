import React from "react";
import axios, { AxiosError } from "axios";

import { HotelCard } from "../../components/card";

import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import styles from "./home.module.scss";

export type Images = {
  url: string;
};

export type Hotels = {
  id: string;
  name: string;
  address1: string;
  address2: string;
  starRating: string;
  images: Images[];
};

export const Home = () => {
  const [hotels, setHotels] = React.useState<Hotels[]>();
  const [value, setValue] = React.useState<number | null>(3);
  const [amountAdult, setAmountAdult] = React.useState("");
  const [amountChild, setAmountChild] = React.useState("");

  const handleChangeAdult = (event: SelectChangeEvent) => {
    setAmountAdult(event.target.value as string);
  };

  const handleChangeChild = (event: SelectChangeEvent) => {
    setAmountChild(event.target.value as string);
  };

  React.useEffect(() => {
    axios
      .get(`https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG`)
      .then(({ data }) => {
        setHotels(data);
      })
      .catch((err: AxiosError) => {
        setHotels([]);
        console.warn("HotelsError", err);
      });
  }, []);

  return (
    <>
      <div className={styles.wrapperFilterPart}>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue !== null ? newValue : 0);
          }}
        />
        <div className={styles.wrapperCapacityPart}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={styles.typographyPart}
          >
            Adults:
            <div>
              <Select
                value={amountAdult}
                onChange={handleChangeAdult}
                className={styles.select}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
              </Select>
            </div>
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={styles.typographyPart}
          >
            Child:
            <div>
              <Select
                value={amountChild}
                onChange={handleChangeChild}
                className={styles.select}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
              </Select>
            </div>
          </Typography>
        </div>
      </div>
      <br />
      <br />
      <div>
        {hotels?.length ? (
          hotels
            .filter((obj) => obj.starRating.includes(value!.toString()))
            .map((obj) => (
              <HotelCard
                key={obj.id}
                id={obj.id}
                name={obj.name}
                address1={obj.address1}
                address2={obj.address2}
                starRating={obj.starRating}
                images={obj.images}
                adults={amountAdult}
                children={amountChild}
              />
            ))
        ) : (
          <div>no hotels</div>
        )}
      </div>
    </>
  );
};
