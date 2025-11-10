import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product, ProductFormData, Category } from "@/types/product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100),
  wholesale_price: z.coerce.number().min(0, "Wholesale price must be 0 or positive"),
  retail_price: z.coerce.number().min(0, "Retail price must be 0 or positive"),
  quantity: z.coerce.number().int().min(0, "Quantity must be 0 or positive"),
  category: z.string().min(1, "Category is required"),
  unit: z.string().min(1, "Unit is required").max(50),
  wholesale_unit: z.string().optional(),
  retail_unit: z.string().optional(),
  expiry_date: z.string().optional(),
});

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

export const ProductForm = ({ product, categories, onSubmit, onCancel }: ProductFormProps) => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
        name: product.name,
        wholesale_price: product.wholesale_price,
        retail_price: product.retail_price,
        quantity: product.quantity,
        category: product.category,
        unit: product.unit,
        wholesale_unit: product.wholesale_unit || "",
        retail_unit: product.retail_unit || "",
        expiry_date: product.expiry_date || "",
      }
      : {
        name: "",
        wholesale_price: 0,
        retail_price: 0,
        quantity: 0,
        category: "",
        unit: "unit",
        wholesale_unit: "",
        retail_unit: "",
        expiry_date: "",
      },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Paracetamol 500mg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="wholesale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wholesale Price (₦)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="retail_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retail Price (₦)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="wholesale_unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wholesale Unit (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., pack, box" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="retail_unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retail Unit (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., card, strip" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Unit</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., card, bottle, pack" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="expiry_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date (Optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {product ? "Update Product" : "Add Product"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};