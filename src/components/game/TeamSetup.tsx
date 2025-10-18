import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';
import { Timer } from 'lucide-react';

export const TeamSetup = () => {
  const { teams, setTeamName, setRoundTime, startRound, roundTime } = useGame();
  const [team1Name, setTeam1Name] = useState(teams[0].name);
  const [team2Name, setTeam2Name] = useState(teams[1].name);

  const handleStart = () => {
    setTeamName(0, team1Name);
    setTeamName(1, team2Name);
    startRound();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-caveman text-primary">
            Team Setup
          </h2>
          <p className="text-muted-foreground">
            Enter team names and choose round time
          </p>
        </div>

        {/* Team Names */}
        <div className="space-y-6 bg-card border-2 border-border rounded-xl p-6">
          <div className="space-y-2">
            <label className="text-lg font-semibold flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              Team 1
            </label>
            <Input
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              placeholder="Team Fire"
              className="text-lg h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-semibold flex items-center gap-2">
              <span className="text-2xl">🪨</span>
              Team 2
            </label>
            <Input
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              placeholder="Team Rock"
              className="text-lg h-12"
            />
          </div>
        </div>

        {/* Timer Selection */}
        <div className="space-y-4 bg-card border-2 border-border rounded-xl p-6">
          <label className="text-lg font-semibold flex items-center gap-2">
            <Timer className="w-5 h-5" />
            Round Time
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[30, 60, 90].map((time) => (
              <Button
                key={time}
                variant={roundTime === time ? 'secondary' : 'outline'}
                onClick={() => setRoundTime(time as 30 | 60 | 90)}
                className="h-16 text-lg font-bold"
              >
                {time}s
              </Button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <Button
          variant="hero"
          size="xl"
          onClick={handleStart}
          disabled={!team1Name.trim() || !team2Name.trim()}
          className="w-full"
        >
          Let's Go!
        </Button>
      </div>
    </div>
  );
};
