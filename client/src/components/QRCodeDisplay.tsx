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
    <Card className="rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl gradient-text">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center p-6 bg-white rounded-2xl shadow-inner">
          <QRCode value={address} size={200} />
        </div>
        <div className="space-y-3">
          <div className="font-mono text-sm bg-white/50 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20 dark:border-white/10 break-all" data-testid="text-address">
            {address}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-full backdrop-blur-sm bg-background/50 border-white/20" 
              onClick={handleCopy} 
              data-testid="button-copy-address"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-full backdrop-blur-sm bg-background/50 border-white/20" 
              onClick={handleShare} 
              data-testid="button-share-address"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-full backdrop-blur-sm bg-background/50 border-white/20" 
              data-testid="button-save-qr"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
