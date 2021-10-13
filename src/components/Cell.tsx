import { cellSize } from 'lib/consts';
import palette from 'lib/palette';
import styled from 'styled-components';
import { Direction, Point } from 'types';

const Container = styled.div.attrs(({ point }: { point: Point }) => ({
  style: {
    transform: `translate(
	${point.x}px,
	${point.y}px
)`,
    width: cellSize,
    height: cellSize,
  },
}))<{
  point: Point;
  direction: Direction;
}>`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${palette.cellColor};
  border-radius: 4px;
  transition: transform, 0.2s linear;

  &:first-child {
    background-color: #f00;
  }
`;

const Cell = ({ point, direction }: { point: Point; direction: Direction }) => {
  return <Container point={point} direction={direction} />;
};
export default Cell;
