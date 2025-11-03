import QRCodeDisplay from '../QRCodeDisplay';

export default function QRCodeDisplayExample() {
  return (
    <div className="max-w-md">
      <QRCodeDisplay
        address="11039PKSG281027GGA01BA071"
        title="My Wallet Address"
      />
    </div>
  );
}
