import { gameSpeed, screenSize } from 'lib/consts';
import { useEffect } from 'react';
import { useFrog } from 'service/frog';
import { useWorm } from 'service/worm';
import styled from 'styled-components';
import { Direction } from 'types';
import Frog from './Frog';
import Screen from './Screen';
import Worm from './Worm';

const directionMap: { [key: string]: Direction } = {
  ArrowUp: 0,
  ArrowRight: 90,
  ArrowDown: 180,
  ArrowLeft: 270,
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  const worm = useWorm();
  const frog = useFrog();
  const handleChangeDirection = (e: KeyboardEvent) => {
    if (Object.keys(directionMap).includes(e.key)) {
      worm.changeDirection(directionMap[e.key]);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleChangeDirection);
    return () => {
      document.removeEventListener('keydown', handleChangeDirection);
    };
  }, []);
  useEffect(() => {
    worm.moveWorm();
    const interval = setInterval(worm.moveWorm, gameSpeed);
    return () => clearInterval(interval);
  }, [worm.direction]);
  useEffect(() => {
    if (
      worm.points[0].x === frog.point.x &&
      worm.points[0].y === frog.point.y
    ) {
      worm.grow();
      frog.move();
    }
  }, [worm.points, frog.point]);
  return (
    <Container>
      <Screen size={screenSize}>
        <Worm points={worm.points} direction={worm.direction} />
        <Frog point={frog.point} />
      </Screen>
    </Container>
  );
}

export default App;
