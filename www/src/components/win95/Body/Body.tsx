import React, { useEffect, useRef, useState } from "react";

import styles from "./Body.module.scss";
import { Item } from "./Item/Item";
import { DSPubCallback, useDragSelect } from "../../DragSelectContext";
import { Icon } from "../Icon/Icon";
import { handleApproveReject } from "./approveReject";

type Props = {};

export const Body: React.FC<Props> = ({}) => {
  const [itemCount, setItemCount] = useState(5);

  const inputEl = useRef(null);
  const approveEl = useRef(null);
  const rejectEl = useRef(null);
  const ds = useDragSelect();

  useEffect(() => {
    if (!inputEl.current || !ds || !approveEl.current || !rejectEl.current)
      return;

    ds.setSettings({
      area: inputEl.current,
      selectedClass: styles.selected,
      selectableClass: styles.selectable,
      dropZoneReadyClass: styles.dropZoneReady,
      dropZones: [
        {
          element: approveEl.current,
          id: "approve",
        },
        {
          element: rejectEl.current,
          id: "reject",
        },
      ],
    });

    const dsCallback: DSPubCallback<"DS:end"> = async ({
      items,
      isDragging,
      dropTarget,
    }) => {
      if (!isDragging || !dropTarget || !items) return;
      if (dropTarget?.id === "approve") {
        handleApproveReject({
          items: items as HTMLElement[],
          content: '"✅"',
        });
        setTimeout(() => ds.removeSelectables(items, true, true));
      } else if (dropTarget?.id === "reject") {
        handleApproveReject({
          items: items as HTMLElement[],
          content: '"❌"',
        });
        setTimeout(() => ds.removeSelectables(items, true, true));
      }
    };
    ds.subscribe("DS:end", dsCallback);

    const add = ({ value = 1 }) => setItemCount((count) => count + value);
    // @ts-ignore
    ds.subscribe("__add", add);

    return () => {
      ds.unsubscribe("DS:end", dsCallback);
      // @ts-ignore
      ds.unsubscribe("__add", add);
    };
  }, [inputEl, ds, approveEl, rejectEl]);

  return (
    <div className={styles.root} ref={inputEl}>
      <div className={styles.approveReject}>
        <div className={styles.approve} ref={approveEl}>
          <div>
            <Icon iconPath="/w95-icons/Mail stamp (check mark).ico" />
            Approve
          </div>
        </div>
        <div className={styles.reject} ref={rejectEl}>
          <div>
            <Icon iconPath="/w95-icons/Mail stamp (cross).ico" />
            Reject
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {new Array(itemCount).fill(1).map((_, index) => (
          <Item key={index} />
        ))}
      </div>
    </div>
  );
};
