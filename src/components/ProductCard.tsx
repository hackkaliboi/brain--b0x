import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { getIconComponent } from "@/lib/iconLookup";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  canEdit?: boolean;
  isAdmin?: boolean;
}

export const ProductCard = ({
  product,
  onEdit,
  onDelete,
  canEdit = true,
  isAdmin = false,
}: ProductCardProps) => {
  const [showWholesale, setShowWholesale] = useState(() => {
    const saved = localStorage.getItem("showWholesale");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("showWholesale", JSON.stringify(showWholesale));
  }, [showWholesale]);

  const IconComponent = getIconComponent(product.icon);

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <IconComponent className="h-6 w-6 text-primary" strokeWidth={2.5} />
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
            </div>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWholesale(!showWholesale)}
            >
              {showWholesale ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            {canEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(product)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(product.id)}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {showWholesale && (
            <div>
              <p className="text-muted-foreground">Wholesale</p>
              <p className="font-semibold">₦{product.wholesale_price.toLocaleString()} / {product.unit}</p>
            </div>
          )}
          <div className={showWholesale ? "" : "col-span-2"}>
            <p className="text-muted-foreground">Retail</p>
            <p className="font-semibold">₦{product.retail_price.toLocaleString()} / {product.unit}</p>
          </div>
        </div>

        {product.expiry_date && (
          <div className="text-sm pt-2 border-t">
            <span className="text-muted-foreground">Expires: </span>
            <span className="font-medium">{new Date(product.expiry_date).toLocaleDateString()}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-muted-foreground">Quantity</span>
          <span className="font-semibold">{product.quantity}</span>
        </div>
      </CardContent>
    </Card>
  );
};
