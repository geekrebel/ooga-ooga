import React, { createContext, useContext, useState, useEffect } from 'react';
import { Word, getRandomWord } from '@/data/words';

interface Team {
  name: string;
  score: number;
}

interface GameState {
  teams: [Team, Team];
  roundTime: 30 | 60 | 90;
  currentRound: number;
  activeTeamIndex: 0 | 1;
  currentWord: Word | null;
  isPlaying: boolean;
  timeRemaining: number;
  gamePhase: 'welcome' | 'setup' | 'playing' | 'roundSummary' | 'finalScores';
  roundScore: number;
  roundPenalties: number;
}

interface GameContextType extends GameState {
  setTeamName: (index: 0 | 1, name: string) => void;
  setRoundTime: (time: 30 | 60 | 90) => void;
  startGame: () => void;
  startRound: () => void;
  handleCorrect: () => void;
  handleUgh: () => void;
  endRound: () => void;
  nextRound: () => void;
  resetGame: () => void;
  tick: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_STATE: GameState = {
  teams: [
    { name: 'Team Fire', score: 0 },
    { name: 'Team Rock', score: 0 },
  ],
  roundTime: 60,
  currentRound: 1,
  activeTeamIndex: 0,
  currentWord: null,
  isPlaying: false,
  timeRemaining: 60,
  gamePhase: 'welcome',
  roundScore: 0,
  roundPenalties: 0,
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('ughhWordsGame');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('ughhWordsGame', JSON.stringify(state));
  }, [state]);

  const setTeamName = (index: 0 | 1, name: string) => {
    setState(prev => {
      const teams = [...prev.teams] as [Team, Team];
      teams[index] = { ...teams[index], name };
      return { ...prev, teams };
    });
  };

  const setRoundTime = (time: 30 | 60 | 90) => {
    setState(prev => ({ ...prev, roundTime: time, timeRemaining: time }));
  };

  const startGame = () => {
    setState(prev => ({
      ...prev,
      gamePhase: 'setup',
    }));
  };

  const startRound = () => {
    setState(prev => ({
      ...prev,
      gamePhase: 'playing',
      isPlaying: true,
      currentWord: getRandomWord(),
      timeRemaining: prev.roundTime,
      roundScore: 0,
      roundPenalties: 0,
    }));
  };

  const handleCorrect = () => {
    setState(prev => {
      const teams = [...prev.teams] as [Team, Team];
      teams[prev.activeTeamIndex] = {
        ...teams[prev.activeTeamIndex],
        score: teams[prev.activeTeamIndex].score + 1,
      };
      return {
        ...prev,
        teams,
        currentWord: getRandomWord(),
        roundScore: prev.roundScore + 1,
      };
    });
  };

  const handleUgh = () => {
    setState(prev => {
      const teams = [...prev.teams] as [Team, Team];
      teams[prev.activeTeamIndex] = {
        ...teams[prev.activeTeamIndex],
        score: Math.max(0, teams[prev.activeTeamIndex].score - 1),
      };
      return {
        ...prev,
        teams,
        currentWord: getRandomWord(),
        roundPenalties: prev.roundPenalties + 1,
      };
    });
  };

  const endRound = () => {
    setState(prev => ({
      ...prev,
      isPlaying: false,
      gamePhase: 'roundSummary',
    }));
  };

  const nextRound = () => {
    setState(prev => {
      const nextTeamIndex = (prev.activeTeamIndex === 0 ? 1 : 0) as 0 | 1;
      const nextRoundNum = prev.activeTeamIndex === 1 ? prev.currentRound + 1 : prev.currentRound;
      
      return {
        ...prev,
        activeTeamIndex: nextTeamIndex,
        currentRound: nextRoundNum,
        gamePhase: 'playing',
        isPlaying: true,
        currentWord: getRandomWord(),
        timeRemaining: prev.roundTime,
        roundScore: 0,
        roundPenalties: 0,
      };
    });
  };

  const resetGame = () => {
    setState(INITIAL_STATE);
  };

  const tick = () => {
    setState(prev => {
      if (prev.timeRemaining <= 1) {
        return {
          ...prev,
          timeRemaining: 0,
          isPlaying: false,
          gamePhase: 'roundSummary',
        };
      }
      return {
        ...prev,
        timeRemaining: prev.timeRemaining - 1,
      };
    });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        setTeamName,
        setRoundTime,
        startGame,
        startRound,
        handleCorrect,
        handleUgh,
        endRound,
        nextRound,
        resetGame,
        tick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
