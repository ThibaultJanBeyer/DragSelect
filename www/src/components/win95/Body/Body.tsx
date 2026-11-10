import React, { useState } from "react";
import {
  useDragSelect,
  useDragSelectArea,
  useDragSelectEvent,
  useDropZone,
} from "@dragselect/react";

import styles from "./Body.module.scss";
import { Item } from "./Item/Item";
import { Icon } from "../Icon/Icon";
import { handleApproveReject } from "./approveReject";

type Props = {};

const verdicts: Record<string, string> = {
  approve: '"✅"',
  reject: '"❌"',
};

export const Body: React.FC<Props> = ({}) => {
  const [itemCount, setItemCount] = useState(5);
  const ds = useDragSelect();
  const areaRef = useDragSelectArea();
  const approveRef = useDropZone("approve");
  const rejectRef = useDropZone("reject");

  useDragSelectEvent("DS:end", ({ items, isDragging, dropTarget }) => {
    const content = dropTarget && verdicts[dropTarget.id];
    if (!isDragging || !content || !items?.length) return;
    handleApproveReject({ items: items as HTMLElement[], content });
    setTimeout(() => ds?.removeSelectables(items, true, true));
  });

  // "__add" is a custom event the ActionPanel publishes to spawn new items
  // @ts-expect-error not a built-in event
  useDragSelectEvent("__add", ({ value = 1 }) => setItemCount((count) => count + value));

  return (
    <div className={styles.root} ref={areaRef}>
      <div className={styles.approveReject}>
        <div className={styles.approve} ref={approveRef}>
          <div>
            <Icon iconPath="/w95-icons/Mail stamp (check mark).ico" />
            Approve
          </div>
        </div>
        <div className={styles.reject} ref={rejectRef}>
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
