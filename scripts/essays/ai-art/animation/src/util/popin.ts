import {
  PlopSpring,
  SmoothSpring,
  spring,
} from "@motion-canvas/core/lib/tweening";
import { Shape } from "@motion-canvas/2d";
import { Reference, chain, Vector2 } from "@motion-canvas/core";

export const popin = <T extends Shape>(
  ref: Reference<T>,
  from?: number,
  to?: number
) =>
  spring(SmoothSpring, (from ?? 0) * 100, (to ?? 1) * 100, 1, (value) => {
    ref().scale(value / 100);
  });

export const popout = <T extends Shape>(
  ref: Reference<T>,
  from?: number,
  to?: number
) =>
  chain(
    spring(
      SmoothSpring,
      (from ?? 1) * 100,
      ((from ?? 1) + (from ?? 1) / 10) * 100,
      1,
      (value) => {
        ref().scale(value / 100);
      }
    ),
    spring(
      SmoothSpring,
      ((from ?? 1) + (from ?? 1) / 10) * 100,
      (to ?? 0) * 100,
      1,
      (value) => {
        ref().scale(value / 100);
      }
    )
  );
/*
   * chain(
    spring(SmoothSpring, 100, 110, 1, (value) => {
      ref().scale(value / 100);
    }),
    spring(SmoothSpring, 100, 0, 1, (value) => {
      ref().scale(value / 100);
    })
  );
   */

const getSize = (size: Vector2, v: number) =>
  [size.x * (v / 100), size.y * (v / 100)] as [number, number];

export const popinSize = <T extends Shape>(ref: Reference<T>, init: Vector2) =>
  spring(SmoothSpring, 10, 100, 1, (value) => {
    ref().size(getSize(init, value));
  });

export const popoutSize = <T extends Shape>(ref: Reference<T>) =>
  chain(
    spring(SmoothSpring, 100, 110, 1, (value) => {
      ref().size(getSize(ref().size(), value));
    }),
    spring(SmoothSpring, 100, 0, 1, (value) => {
      ref().size(getSize(ref().size(), value));
    })
  );
