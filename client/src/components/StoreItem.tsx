import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface StoreItemProps {
  name: string;
  price: number;
  description?: string;
  onPurchase?: () => void;
}

export default function StoreItem({
  name,
  price,
  description,
  onPurchase,
}: StoreItemProps) {
  return (
    <Card className="hover-elevate">
      <CardContent className="p-6">
        <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        )}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums">{price.toLocaleString()}</span>
          <Badge variant="secondary">ATH</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" onClick={onPurchase} data-testid={`button-purchase-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Purchase
        </Button>
      </CardFooter>
    </Card>
  );
}
