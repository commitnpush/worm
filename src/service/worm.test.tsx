import { act, renderHook } from '@testing-library/react-hooks';
import { cellSize, screenSize } from 'lib/consts';
import { useWorm } from './worm';

describe('changeDirection', () => {
  test('방향이 90인 상태에서 방향을 180으로 변경 가능', () => {
    const { result } = renderHook(() => useWorm());
    const { changeDirection } = result.current;
    expect(result.current.direction).toBe(90);
    act(() => changeDirection(180));
    expect(result.current.direction).toBe(180);
  });
  test('방향이 90인 상태에서 방향을 270(반대 방향)으로 변경 불가능', () => {
    const { result } = renderHook(() => useWorm());
    const { changeDirection } = result.current;
    expect(result.current.direction).toBe(90);
    act(() => changeDirection(270));
    expect(result.current.direction).toBe(90);
  });
  test('방향이 90인 상태에서 방향을 180으로 변경 후 0으로 변경 불가능', () => {
    const { result } = renderHook(() => useWorm());
    const { changeDirection } = result.current;
    expect(result.current.direction).toBe(90);
    act(() => changeDirection(180));
    expect(result.current.direction).toBe(180);
    act(() => changeDirection(0));
    expect(result.current.direction).toBe(180);
  });
});

describe('moveWorm', () => {
  test('오른쪽(90)으로 한 칸 이동', () => {
    const defaultPoints = [{ x: 0, y: 0 }];
    const { result } = renderHook(() => useWorm(defaultPoints));
    expect(result.current.points.length).toBe(1);
    expect(result.current.points[0].x).toBe(defaultPoints[0].x);
    expect(result.current.points[0].y).toBe(defaultPoints[0].y);
    expect(result.current.direction).toBe(90);

    act(() => result.current.moveWorm());
    expect(result.current.points[0].x).toBe(defaultPoints[0].x + cellSize);
    expect(result.current.points[0].y).toBe(defaultPoints[0].y);
  });

  test('오른쪽(90)으로 두 칸 이동', () => {
    const defaultPoints = [{ x: cellSize * 5, y: 0 }];
    const { result } = renderHook(() => useWorm(defaultPoints));

    act(() => result.current.moveWorm());
    act(() => result.current.moveWorm());
    expect(result.current.points[0].x).toBe(defaultPoints[0].x + cellSize * 2);
    expect(result.current.points[0].y).toBe(defaultPoints[0].y);
  });

  test('아래(180)로 한 칸 이동', () => {
    const defaultPoints = [{ x: cellSize * 5, y: 0 }];
    const { result } = renderHook(() => useWorm(defaultPoints));
    act(() => result.current.changeDirection(180));
    act(() => result.current.moveWorm());
    expect(result.current.points[0].x).toBe(defaultPoints[0].x);
    expect(result.current.points[0].y).toBe(defaultPoints[0].y + cellSize);
  });

  test('아래(180)로 한 칸 이동 후 오른쪽(90)으로 한칸 이동', () => {
    const defaultPoints = [{ x: cellSize * 5, y: 0 }];
    const { result } = renderHook(() => useWorm(defaultPoints));
    act(() => result.current.changeDirection(180));
    act(() => result.current.moveWorm());
    act(() => result.current.changeDirection(90));
    act(() => result.current.moveWorm());
    expect(result.current.points[0].x).toBe(defaultPoints[0].x + cellSize);
    expect(result.current.points[0].y).toBe(defaultPoints[0].y + cellSize);
  });

  test('오른쪽 끝에서 오른쪽으로 이동하면 0으로 이동', () => {
    const defaultPoints = [{ x: screenSize.width - cellSize, y: 0 }];
    const { result } = renderHook(() => useWorm(defaultPoints));
    act(() => result.current.moveWorm());
    expect(result.current.points[0].x).toBe(0);
  });
  test('맨 위에서 위로 이동하면 맨 아래로 이동', () => {
    const defaultPoints = [{ x: 0, y: 0 }];
    const { result } = renderHook(() => useWorm(defaultPoints));
    act(() => result.current.changeDirection(0));
    act(() => result.current.moveWorm());
    expect(result.current.points[0].y).toBe(screenSize.height - cellSize);
  });
});
