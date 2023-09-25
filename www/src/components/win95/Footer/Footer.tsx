import React, { useEffect, useState } from "react";

import styles from "./Footer.module.scss";
import { DSPubCallback, useDragSelect } from "../../DragSelectContext";

type Props = {};

export const Footer: React.FC<Props> = ({}) => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const ds = useDragSelect();

  useEffect(() => {
    if (!ds) return;

    const cb: DSPubCallback<"DS:end"> = ({ items = [] }) => {
      setSelectedAmount(items.length);
    };
    ds?.subscribe("DS:end", cb);
    return () => {
      ds?.unsubscribe("DS:end", cb);
    };
  }, [ds]);

  return (
    <div className={styles.root}>
      <div className={styles.element}>
        <div className={styles.font}>{selectedAmount || 0} object(s)</div>
      </div>
      <div className={styles.element}>
        <div className={styles.font}>{selectedAmount * 1.7}MB</div>
      </div>
    </div>
  );
};
