interface GameStatsProps {
  score: number;
  level: number;
  lines: number;
}

const GameStats = ({ score, level, lines }: GameStatsProps) => {
  return (
    <div className="flex flex-col gap-6 bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-white/5">
      <div>
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Score</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          {score.toLocaleString()}
        </p>
      </div>
      <div>
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Level</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {level}
        </p>
      </div>
      <div>
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Lines</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          {lines}
        </p>
      </div>
    </div>
  );
};

export default GameStats;