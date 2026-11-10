import React from "react";
import { useSelection } from "@dragselect/react";

import styles from "./Footer.module.scss";

type Props = {};

export const Footer: React.FC<Props> = ({}) => {
  const selectedAmount = useSelection().length;

  return (
    <div className={styles.root}>
      <div className={styles.element}>
        <div className={styles.font}>{selectedAmount} object(s)</div>
      </div>
      <div className={styles.element}>
        <div className={styles.font}>{selectedAmount * 1.7}MB</div>
      </div>
    </div>
  );
};
