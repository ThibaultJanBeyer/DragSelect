import { Vect2 } from "../types";

/**
 * Returns cursor x, y position based on event object
 */
export const getPointerPos = ({ event }: { event: { clientX: number, clientY: number }}): Vect2 => ({
  x: event.clientX,
  y: event.clientY,
})
