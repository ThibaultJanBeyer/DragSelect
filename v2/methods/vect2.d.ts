export function calc({ x: x1, y: y1 }: Vect2, operator: '+' | '-' | '*' | '/', { x: x2, y: y2 }: Vect2): Vect2;
export function rect2vect(rect: {
    left: number;
    top: number;
}): Vect2;
export function vect2rect(vect: Vect2, dimension?: number): DSBoundingRect;
export function num2vect(n: number): Vect2;
import "../types"
