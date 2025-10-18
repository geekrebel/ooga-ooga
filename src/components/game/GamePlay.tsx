import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { playOoga, playUgh, playTimesUp } from '@/utils/sounds';
import { AlertCircle, Check } from 'lucide-react';

export const GamePlay = () => {
  const {
    teams,
    activeTeamIndex,
    currentWord,
    timeRemaining,
    handleCorrect,
    handleUgh,
    endRound,
    tick,
    isPlaying,
  } = useGame();

  const activeTeam = teams[activeTeamIndex];
  const opposingTeam = teams[activeTeamIndex === 0 ? 1 : 0];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, tick]);

  useEffect(() => {
    if (timeRemaining === 0 && isPlaying) {
      playTimesUp();
      endRound();
    }
  }, [timeRemaining, isPlaying, endRound]);

  const onCorrect = () => {
    playOoga();
    handleCorrect();
  };

  const onUgh = () => {
    playUgh();
    handleUgh();
  };

  const progress = (timeRemaining / (teams[0].score + teams[1].score > 0 ? 60 : timeRemaining)) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Timer */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm">
              <span className="font-bold">{activeTeam.name}</span> is describing
            </div>
            <div className="text-2xl font-caveman">
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </div>
          </div>
          <div className="h-3 bg-primary-foreground/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-1000 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scores */}
      <div className="bg-card border-b-4 border-border p-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          <div className={`text-center p-4 rounded-lg ${activeTeamIndex === 0 ? 'bg-accent/20 border-2 border-accent' : 'bg-muted'}`}>
            <div className="text-sm text-muted-foreground">{teams[0].name}</div>
            <div className="text-4xl font-caveman text-primary">{teams[0].score}</div>
          </div>
          <div className={`text-center p-4 rounded-lg ${activeTeamIndex === 1 ? 'bg-accent/20 border-2 border-accent' : 'bg-muted'}`}>
            <div className="text-sm text-muted-foreground">{teams[1].name}</div>
            <div className="text-4xl font-caveman text-primary">{teams[1].score}</div>
          </div>
        </div>
      </div>

      {/* Word Display */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-8 max-w-2xl w-full">
          <div className="bg-card border-4 border-accent rounded-2xl p-12 shadow-2xl animate-bounce-in">
            <div className="text-sm text-muted-foreground mb-4">
              Describe this word:
            </div>
            <h2 className="text-5xl md:text-7xl font-caveman text-accent break-words">
              {currentWord?.word.toUpperCase()}
            </h2>
            <div className="mt-4">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                currentWord?.difficulty === 'easy' ? 'bg-success/20 text-success' :
                currentWord?.difficulty === 'medium' ? 'bg-accent/20 text-accent' :
                'bg-destructive/20 text-destructive'
              }`}>
                {currentWord?.difficulty.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              variant="ooga"
              size="huge"
              onClick={onCorrect}
              className="animate-pulse-glow"
            >
              <Check className="w-8 h-8 mr-2" />
              CORRECT!
            </Button>
            <Button
              variant="ugh"
              size="huge"
              onClick={onUgh}
              className="animate-shake"
            >
              <AlertCircle className="w-8 h-8 mr-2" />
              UGH!
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-card/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-bold mb-2">{opposingTeam.name} - Watch for rule breaks!</p>
            <p>Press <span className="text-destructive font-bold">UGH!</span> if {activeTeam.name} uses multi-syllable words or gestures.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
