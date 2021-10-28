import styled from 'styled-components';
import { Direction, Point } from 'types';
import Cell from './Cell';

const Container = styled.div`
  position: relative;
  z-index: 10;
`;

const Worm = ({
  points,
  direction,
}: {
  points: Point[];
  direction: Direction;
}) => {
  return (
    <Container>
      {points.map((point, index) => (
        <Cell key={index} point={point} direction={direction} />
      ))}
    </Container>
  );
};

export default Worm;
