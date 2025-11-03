import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="max-w-2xl space-y-1">
      <ChatMessage
        message="Hey! How are you doing today?"
        sender="Sarah Ahmed"
        timestamp="10:30 AM"
        isSelf={false}
      />
      <ChatMessage
        message="I'm doing great! Just finished the new Athar platform features."
        sender="You"
        timestamp="10:32 AM"
        isSelf={true}
      />
      <ChatMessage
        message="That's awesome! Can't wait to try them out."
        sender="Sarah Ahmed"
        timestamp="10:33 AM"
        isSelf={false}
      />
    </div>
  );
}
