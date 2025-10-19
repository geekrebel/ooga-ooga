import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { Flame } from 'lucide-react';

export const WelcomeScreen = () => {
  const { startGame } = useGame();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Title */}
        <div className="space-y-4 animate-bounce-in">
          <div className="flex items-center justify-center gap-4">
            <Flame className="w-12 h-12 text-accent animate-pulse-glow" />
            <h1 className="text-6xl md:text-7xl font-caveman text-primary tracking-wider">
              OOGA!
            </h1>
            <Flame className="w-12 h-12 text-accent animate-pulse-glow" />
          </div>
          <h2 className="text-4xl md:text-5xl font-caveman text-secondary">
            WORDS
          </h2>
          <p className="text-xl text-muted-foreground">
            The Caveman Party Game
          </p>
        </div>

        {/* Rules Card */}
        <div className="bg-card border-4 border-border rounded-2xl p-8 shadow-2xl space-y-6">
          <h3 className="text-3xl font-caveman text-accent">How to Play</h3>
          
          <div className="space-y-4 text-left">
            <div className="flex gap-4">
              <span className="text-3xl">🗣️</span>
              <div>
                <h4 className="font-bold text-lg">Use One Syllable Words</h4>
                <p className="text-muted-foreground">
                  Describe the word using only single-syllable words. "Big" is good. "Tel-e-phone" is bad!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl">👥</span>
              <div>
                <h4 className="font-bold text-lg">Team Up</h4>
                <p className="text-muted-foreground">
                  Two teams take turns. One player describes while their team guesses.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl">💥</span>
              <div>
                <h4 className="font-bold text-lg">OOGA! Button</h4>
                <p className="text-muted-foreground">
                  Break the rule? The other team smashes the OOGA! button and you lose a point!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl">⏱️</span>
              <div>
                <h4 className="font-bold text-lg">Beat the Clock</h4>
                <p className="text-muted-foreground">
                  Get as many words as possible before time runs out. +1 for correct, -1 for OOGA!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <Button 
          variant="hero" 
          size="xl" 
          onClick={startGame}
          className="w-full max-w-md mx-auto animate-pulse-glow"
        >
          START GAME
        </Button>

        <p className="text-sm text-muted-foreground">
          Pass & Play • 4-8 Players • No Login Required
        </p>
      </div>
    </div>
  );
};
