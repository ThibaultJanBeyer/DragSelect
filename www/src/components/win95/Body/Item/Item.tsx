import React, { memo, useEffect, useRef, useState } from "react";
import { BubbleExplosion } from "beautiful-web-animations";
import { useDragSelectEvent, useSelectable } from "@dragselect/react";

import styles from "./Item.module.scss";
import { FileIcon } from "./FileIcon";
import { getRandomFileName } from "./fileNames";

const explode = async (element: HTMLElement, isAppearing?: boolean) => {
  const BE = BubbleExplosion({
    element,
    content: `url("${element
      .querySelector("img[data-img]")
      ?.getAttribute("data-img")}")`,
    particles: { direction: isAppearing ? "up" : "down", size: 15 },
    isAppearing,
  });
  await BE.trigger();
  BE.destroy();
};

const _Item: React.FC = () => {
  const [name] = useState(getRandomFileName);
  const [available, setAvailable] = useState(true);
  const element = useRef<HTMLButtonElement>(null);
  const selectableRef = useSelectable();

  // only selectable once the appear animation is done
  useEffect(() => {
    const el = element.current;
    if (el) explode(el, true).then(() => selectableRef(el));
  }, [selectableRef]);

  useDragSelectEvent("DS:removed", async ({ item }) => {
    if (!element.current || item !== element.current) return;
    await explode(element.current);
    setAvailable(false);
  });

  if (!available) return null;

  return (
    <button className={styles.root} ref={element} aria-labelledby={name}>
      <FileIcon />
      <div>{name}</div>
    </button>
  );
};

export const Item = memo(_Item);
