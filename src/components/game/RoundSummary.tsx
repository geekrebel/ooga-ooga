import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { Trophy, Frown } from 'lucide-react';

export const RoundSummary = () => {
  const { teams, activeTeamIndex, roundScore, roundPenalties, nextRound, resetGame, currentRound } = useGame();
  
  const activeTeam = teams[activeTeamIndex];
  const nextTeamIndex = activeTeamIndex === 0 ? 1 : 0;
  const nextTeam = teams[nextTeamIndex];
  const netScore = roundScore - roundPenalties;
  
  const shouldEndGame = currentRound >= 4; // End after 4 rounds (2 per team)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className={`text-6xl animate-bounce-in ${netScore > 0 ? 'animate-pulse-glow' : ''}`}>
            {netScore >= 5 ? '🔥' : netScore > 0 ? '👍' : netScore < 0 ? '💀' : '😐'}
          </div>
          <h2 className="text-4xl font-caveman text-primary">
            Round Over!
          </h2>
          <p className="text-xl text-muted-foreground">
            {activeTeam.name}'s Turn Complete
          </p>
        </div>

        {/* Score Summary */}
        <div className="bg-card border-4 border-border rounded-2xl p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xl">
              <span className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-success" />
                Correct Words
              </span>
              <span className="font-caveman text-2xl text-success">+{roundScore}</span>
            </div>
            
            <div className="flex justify-between items-center text-xl">
              <span className="flex items-center gap-2">
                <Frown className="w-6 h-6 text-destructive" />
                UGH! Penalties
              </span>
              <span className="font-caveman text-2xl text-destructive">-{roundPenalties}</span>
            </div>
            
            <div className="border-t-2 border-border pt-4">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Net Score</span>
                <span className={`font-caveman text-3xl ${netScore > 0 ? 'text-success' : netScore < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {netScore > 0 ? '+' : ''}{netScore}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Standings */}
        <div className="bg-card border-2 border-border rounded-xl p-6">
          <h3 className="text-xl font-caveman text-center mb-4">Current Standings</h3>
          <div className="grid grid-cols-2 gap-4">
            {teams.map((team, idx) => (
              <div 
                key={idx}
                className={`text-center p-4 rounded-lg ${
                  team.score === Math.max(teams[0].score, teams[1].score) && team.score > 0
                    ? 'bg-accent/20 border-2 border-accent'
                    : 'bg-muted'
                }`}
              >
                <div className="text-sm text-muted-foreground">{team.name}</div>
                <div className="text-4xl font-caveman text-primary">{team.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {shouldEndGame ? (
            <>
              <Button
                variant="hero"
                size="xl"
                onClick={resetGame}
                className="w-full"
              >
                View Final Scores
              </Button>
              <p className="text-center text-muted-foreground">
                Game Complete! See who won 🏆
              </p>
            </>
          ) : (
            <>
              <Button
                variant="hero"
                size="xl"
                onClick={nextRound}
                className="w-full"
              >
                {nextTeam.name}'s Turn
              </Button>
              <p className="text-center text-muted-foreground">
                Pass device to {nextTeam.name}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
