import palette from 'lib/palette';
import styled from 'styled-components';
import { ScreenSize } from 'types';

const Container = styled.div<{ size: ScreenSize }>`
  position: relative;
  width: ${({ size }) => `${size.width}px`};
  height: ${({ size }) => `${size.height}px`};
  background-color: ${palette.screenColor};
`;

const Screen = ({
  size,
  children,
}: {
  size: ScreenSize;
  children: React.ReactNode;
}) => {
  return <Container size={size}>{children}</Container>;
};

export default Screen;
