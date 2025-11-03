import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Download } from "lucide-react";
import QRCode from "react-qr-code";
import { useToast } from "@/hooks/use-toast";

interface QRCodeDisplayProps {
  address: string;
  title?: string;
}

export default function QRCodeDisplay({
  address,
  title = "Recipient Address",
}: QRCodeDisplayProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Athar Address",
        text: address,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center p-4 bg-background rounded-lg">
          <QRCode value={address} size={200} />
        </div>
        <div className="space-y-2">
          <div className="font-mono text-sm bg-muted p-3 rounded-md break-all" data-testid="text-address">
            {address}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={handleCopy} data-testid="button-copy-address">
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button size="sm" variant="outline" onClick={handleShare} data-testid="button-share-address">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button size="sm" variant="outline" data-testid="button-save-qr">
              <Download className="h-4 w-4 mr-1" />
              Save QR
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
