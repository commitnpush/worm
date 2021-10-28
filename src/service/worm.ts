import produce from 'immer';
import * as consts from 'lib/consts';
import { useCallback, useMemo, useState } from 'react';
import { Direction, Point } from 'types';

export const useWorm = (defaultPoints?: Point[]) => {
  const [points, setPoints] = useState<Point[]>(
    defaultPoints || [
      { x: 40, y: 0 },
      { x: 20, y: 0 },
      { x: 0, y: 0 },
    ],
  );
  const [direction, setDirection] = useState<Direction>(90);
  const changeDirection = useCallback((newDirection: Direction) => {
    setDirection((draft) =>
      Math.abs(draft - newDirection) !== 180 ? newDirection : draft,
    );
  }, []);
  const moveWorm = useCallback(() => {
    setPoints((draftPoints) =>
      produce(draftPoints, (proxy) => {
        for (let i = 1; i < draftPoints.length; i++) {
          proxy[i].x = draftPoints[i - 1].x;
          proxy[i].y = draftPoints[i - 1].y;
        }
        switch (direction) {
          case 0: {
            const y = proxy[0].y - consts.cellSize;
            proxy[0].y =
              y >= 0 ? y : consts.screenSize.height - consts.cellSize;
            break;
          }
          case 90:
            proxy[0].x =
              (proxy[0].x + consts.cellSize) % consts.screenSize.width;
            break;
          case 180:
            proxy[0].y =
              (proxy[0].y + consts.cellSize) % consts.screenSize.height;
            break;
          case 270: {
            const x = proxy[0].x - consts.cellSize;
            proxy[0].x = x >= 0 ? x : consts.screenSize.width - consts.cellSize;
          }
        }
      }),
    );
  }, [direction]);

  const grow = () => {
    setPoints((draftPoints) => draftPoints.concat(draftPoints.slice(-1)[0]));
  };

  return useMemo(
    () => ({ points, direction, changeDirection, moveWorm, grow }),
    [points, direction, changeDirection, moveWorm],
  );
};
