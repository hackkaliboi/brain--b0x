import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

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
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("showWholesale", JSON.stringify(showWholesale));
  }, [showWholesale]);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card className="transition-all hover:shadow-md cursor-pointer" onClick={handleCardClick}>
      <CardContent className="p-4 space-y-3">
        {product.image_url && (
          <div className="flex justify-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-24 w-24 object-contain rounded-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowWholesale(!showWholesale);
              }}
            >
              {showWholesale ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            {canEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(product);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product.id);
                }}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm">
          {showWholesale && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-muted-foreground">Wholesale Price</p>
                <p className="font-semibold">₦{product.wholesale_price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Wholesale Unit</p>
                <p className="font-semibold">{product.wholesale_unit || product.unit}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Quantity</p>
                <p className="font-semibold">{product.quantity}</p>
              </div>
            </div>
          )}
          <div className={showWholesale ? "grid grid-cols-3 gap-2" : "grid grid-cols-3 gap-2"}>
            <div>
              <p className="text-muted-foreground">Retail Price</p>
              <p className="font-semibold">₦{product.retail_price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Retail Unit</p>
              <p className="font-semibold">{product.retail_unit || product.unit}</p>
            </div>
            {!showWholesale && (
              <div>
                <p className="text-muted-foreground">Quantity</p>
                <p className="font-semibold">{product.quantity}</p>
              </div>
            )}
          </div>
        </div>

        {product.expiry_date && (
          <div className="text-sm pt-2 border-t">
            <span className="text-muted-foreground">Expires: </span>
            <span className="font-medium">{new Date(product.expiry_date).toLocaleDateString()}</span>
          </div>
        )}

        {!product.expiry_date && (
          <div className="text-sm pt-2 border-t">
            <span className="text-muted-foreground">Quantity: </span>
            <span className="font-semibold">{product.quantity}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};