import { GameProvider, useGame } from '@/contexts/GameContext';
import { WelcomeScreen } from '@/components/game/WelcomeScreen';
import { TeamSetup } from '@/components/game/TeamSetup';
import { GamePlay } from '@/components/game/GamePlay';
import { RoundSummary } from '@/components/game/RoundSummary';

const GameContent = () => {
  const { gamePhase } = useGame();

  switch (gamePhase) {
    case 'welcome':
      return <WelcomeScreen />;
    case 'setup':
      return <TeamSetup />;
    case 'playing':
      return <GamePlay />;
    case 'roundSummary':
      return <RoundSummary />;
    default:
      return <WelcomeScreen />;
  }
};

const Index = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default Index;
