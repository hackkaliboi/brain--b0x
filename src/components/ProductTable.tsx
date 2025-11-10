import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowUpDown, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type SortField = "name" | "category" | "wholesale_price" | "retail_price" | "quantity";
type SortDirection = "asc" | "desc";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  canEdit?: boolean;
  isAdmin?: boolean;
}

export const ProductTable = ({
  products,
  onEdit,
  onDelete,
  canEdit = true,
  isAdmin = false,
}: ProductTableProps) => {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [showWholesale, setShowWholesale] = useState(() => {
    const saved = localStorage.getItem("showWholesale");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("showWholesale", JSON.stringify(showWholesale));
  }, [showWholesale]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const SortableHeader = ({ field, children, align = "left" }: { field: SortField; children: React.ReactNode; align?: "left" | "right" }) => (
    <TableHead 
      className={`font-semibold cursor-pointer hover:bg-muted/50 select-none ${align === "right" ? "text-right" : ""}`}
      onClick={() => handleSort(field)}
    >
      <div className={`flex items-center gap-1 ${align === "right" ? "justify-end" : ""}`}>
        {children}
        <ArrowUpDown className="h-4 w-4" />
      </div>
    </TableHead>
  );

  return (
    <div className="rounded-md border bg-card">
      <div className="p-4 border-b flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowWholesale(!showWholesale)}
        >
          {showWholesale ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Hide Wholesale
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Show Wholesale
            </>
          )}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader field="name">Product Name</SortableHeader>
            <SortableHeader field="category">Category</SortableHeader>
            {showWholesale && <SortableHeader field="wholesale_price" align="right">Wholesale Price</SortableHeader>}
            <SortableHeader field="retail_price" align="right">Retail Price</SortableHeader>
            <SortableHeader field="quantity" align="right">Quantity</SortableHeader>
            <TableHead className="font-semibold">Expiry Date</TableHead>
            {(canEdit || isAdmin) && <TableHead className="font-semibold text-center">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showWholesale ? 7 : 6} className="text-center text-muted-foreground py-8">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            sortedProducts.map((product) => {
              return (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <span>{product.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  {showWholesale && (
                    <TableCell className="text-right">
                      ₦{product.wholesale_price.toLocaleString()} / {product.unit}
                    </TableCell>
                  )}
                  <TableCell className="text-right">
                    ₦{product.retail_price.toLocaleString()} / {product.unit}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold">{product.quantity}</span>
                  </TableCell>
                  <TableCell>
                    {product.expiry_date ? (
                      <span className="text-sm">
                        {new Date(product.expiry_date).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  {(canEdit || isAdmin) && (
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
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
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};