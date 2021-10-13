import produce from 'immer';
import * as consts from 'lib/consts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Direction, Point } from 'types';

const defaultPoints: Point[] = [
  { x: 40, y: 0 },
  { x: 20, y: 0 },
  { x: 0, y: 0 },
];

export const useWorm = () => {
  const [points, setPoints] = useState<Point[]>(defaultPoints);
  const [direction, setDirection] = useState<Direction>(90);
  const changeDirection = useCallback((newDirection: Direction) => {
    setDirection((draft) =>
      Math.abs(draft - newDirection) !== 180 ? newDirection : draft,
    );
  }, []);
  const moveWorm = () => {
    setPoints((draftPoints) =>
      produce(draftPoints, (proxy) => {
        for (let i = 1; i < draftPoints.length; i++) {
          proxy[i].x = draftPoints[i - 1].x;
          proxy[i].y = draftPoints[i - 1].y;
        }
        switch (direction) {
          case 0: {
            const y = proxy[0].y - consts.cellSize;
            proxy[0].y = y >= 0 ? y : 480;
            break;
          }
          case 90:
            proxy[0].x = (proxy[0].x + consts.cellSize) % 500;
            break;
          case 180:
            proxy[0].y = (proxy[0].y + consts.cellSize) % 500;
            break;
          case 270: {
            const x = proxy[0].x - consts.cellSize;
            proxy[0].x = x >= 0 ? x : 480;
          }
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
    () => ({ points, direction, changeDirection }),
    [points, direction],
  );
};
