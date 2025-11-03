import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Sparkles } from "lucide-react";

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
    <div className="relative group">
      <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-300" />
      <Card className="relative rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-lg hover:shadow-2xl transition-all overflow-hidden">
        <CardContent className="p-6">
          <div className="aspect-square bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 rounded-2xl mb-4 flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-2 right-2 h-8 w-8 gradient-primary rounded-full opacity-20" />
            <ShoppingCart className="h-16 w-16 text-muted-foreground opacity-40" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tabular-nums gradient-text">{price.toLocaleString()}</span>
            <Badge variant="secondary" className="rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-sm border-white/20">
              ATH
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button 
            className="w-full rounded-full gradient-primary text-white shadow-lg hover:shadow-xl transition-all" 
            onClick={onPurchase} 
            data-testid={`button-purchase-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Purchase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
