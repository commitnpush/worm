import { cellSize, screenSize } from 'lib/consts';
import { useCallback, useMemo, useState } from 'react';
import { Point } from 'types';

const getRanDomPoint = (): Point => {
  return {
    x: Math.floor(Math.random() * (screenSize.width / cellSize)) * cellSize,
    y: Math.floor(Math.random() * (screenSize.height / cellSize)) * cellSize,
  };
};

export const useFrog = () => {
  const [point, setPoint] = useState<Point>(getRanDomPoint());
  const move = useCallback(() => {
    setPoint(getRanDomPoint());
  }, []);
  return useMemo(() => ({ point, move }), [point, move]);
};
