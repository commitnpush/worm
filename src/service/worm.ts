import produce from 'immer';
import * as consts from 'lib/consts';
import { useEffect, useMemo, useState } from 'react';
import { Direction, Point } from 'types';

const defaultPoints: Point[] = [
  { x: 60, y: 20 },
  { x: 40, y: 20 },
  { x: 20, y: 20 },
];

export const useWorm = () => {
  const [points, setPoints] = useState<Point[]>(defaultPoints);
  const [direction, setDirection] = useState<Direction>(90);
  const moveWorm = () => {
    setPoints((draftPoints) =>
      produce(draftPoints, (proxy) => {
        for (let i = 1; i < draftPoints.length; i++) {
          proxy[i].x = draftPoints[i - 1].x;
          proxy[i].y = draftPoints[i - 1].y;
        }
        switch (direction) {
          case 0:
            proxy[0].y -= consts.cellSize;
            break;
          case 90:
            proxy[0].x += consts.cellSize;
            break;
          case 180:
            proxy[0].y += consts.cellSize;
            break;
          case 270:
            proxy[0].x -= consts.cellSize;
        }
      }),
    );
  };

  useEffect(() => {
    moveWorm();
    const interval = setInterval(moveWorm, 200);
    return () => clearInterval(interval);
  }, [direction]);

  return useMemo(
    () => ({ points, direction, changeDirection: setDirection }),
    [points, direction],
  );
};
