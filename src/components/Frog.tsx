import { cellSize } from 'lib/consts';
import styled from 'styled-components';
import { Point } from 'types';

const Container = styled.div<{ point: Point }>`
  position: absolute;
  width: ${cellSize}px;
  height: ${cellSize}px;
  background-color: green;
  left: ${({ point: { x } }) => x}px;
  top: ${({ point: { y } }) => y}px;
  border-radius: 50%;
`;

const Frog = ({ point }: { point: Point }) => {
  return <Container point={point} />;
};

export default Frog;
