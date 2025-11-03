import MatchCard from '../MatchCard';

export default function MatchCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MatchCard
        type="chat"
        onMatch={() => console.log('Match chat')}
        onNext={() => console.log('Next chat')}
      />
      <MatchCard
        type="voice"
        onMatch={() => console.log('Match voice')}
        onNext={() => console.log('Next voice')}
      />
    </div>
  );
}
