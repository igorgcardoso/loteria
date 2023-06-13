import { GameContext, GameContextDataProps } from '@src/contexts/gameContext';
import { useContext } from 'react';

export function useGame(): GameContextDataProps {
  const context = useContext(GameContext);

  return context;
}
