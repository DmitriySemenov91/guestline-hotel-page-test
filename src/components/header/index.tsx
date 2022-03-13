import { Button } from "@mui/material";
import React from "react";

import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.root}>
      <h3 className={styles.logo}>Guestline — Frontend Task</h3>

      <div className={styles.rightSide}>
        <div className={styles.links}>
          <Button>Soon feature</Button>
          <Button>Soon feature</Button>
        </div>
      </div>
    </header>
  );
};
