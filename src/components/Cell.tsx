import { cellSize } from 'lib/consts';
import palette from 'lib/palette';
import styled from 'styled-components';
import { Direction, Point } from 'types';

const Container = styled.div<{ point: Point; direction: Direction }>`
  position: absolute;
  left: ${({ point }) => point.x}px;
  top: ${({ point }) => point.y}px;
  width: ${cellSize}px;
  height: ${cellSize}px;
  background-color: ${palette.cellColor};
  border-radius: 4px;
  transition: left 0.2s linear, top 0.2s linear;

  &:first-child {
    transform: rotate(${({ direction }) => direction}deg);

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 4px;
      display: block;
      width: 4px;
      height: 4px;
      background-color: #f00;
    }
    &::before {
      left: 4px;
    }
    &::after {
      content: '';
      position: absolute;
      right: 4px;
      display: block;
      width: 4px;
      height: 4px;
      background-color: #f00;
    }
  }
`;

const Cell = ({ point, direction }: { point: Point; direction: Direction }) => {
  return <Container point={point} direction={direction} />;
};
export default Cell;
