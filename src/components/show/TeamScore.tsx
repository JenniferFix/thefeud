const TeamScore = ({ score }: { score: number }) => {
  return (
    <div className="w-full h-full flex justify-center items-center text-9xl drop-shadow text-white team-score-shadow">
      {score}
    </div>
  );
};

export default TeamScore;
