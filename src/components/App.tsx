import { defaultScreenSize } from 'lib/consts';
import { useEffect } from 'react';
import { useWorm } from 'service/worm';
import styled from 'styled-components';
import { Direction } from 'types';
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
  const { points, direction, changeDirection } = useWorm();
  const handleChangeDirection = (e: KeyboardEvent) => {
    if (Object.keys(directionMap).includes(e.key)) {
      changeDirection(directionMap[e.key]);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleChangeDirection);
  }, []);
  return (
    <Container>
      <Screen size={defaultScreenSize}>
        <Worm points={points} direction={direction} />
      </Screen>
    </Container>
  );
}

export default App;
