import { useState } from "react";
import { 
  Pill, Syringe, Stethoscope, HeartPulse, TestTube, 
  Cross, Activity, Thermometer, Eye, Ear, 
  Brain, Bone, Droplet, Zap, Shield, Sparkles,
  Package, Package2, Box, Boxes, Circle, ChevronDown,
  FlaskConical, Microscope, Bandage, Beaker, Dna,
  Wind, Snowflake, Flame, Moon, Sun, CloudRain,
  Baby, User, Users, Heart, Leaf, Flower2,
  Milk, Wine, Coffee, Waves, Cigarette, Drama,
  Tablets, Wrench, Check, AlertCircle, Plus,
  Apple, Carrot, Cherry, Soup, Salad, Smartphone,
  CircleDot, Hexagon, Triangle, Square,
  Star, Lightbulb, Sparkle, Gem, Atom,
  Briefcase, Glasses, Shirt, Watch, Footprints,
  Fingerprint, Accessibility, AlertOctagon, Ambulance,
  Droplets, FlaskRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Organized by medicine/product categories with more diverse icons
const medicalIcons = [
  // Pills & Tablets
  { name: "Pill", Icon: Pill, category: "Tablets & Capsules" },
  { name: "Tablets", Icon: Tablets, category: "Tablets & Capsules" },
  { name: "Circle", Icon: Circle, category: "Tablets & Capsules" },
  { name: "CircleDot", Icon: CircleDot, category: "Tablets & Capsules" },
  { name: "Hexagon", Icon: Hexagon, category: "Tablets & Capsules" },
  { name: "Square", Icon: Square, category: "Tablets & Capsules" },
  
  // Liquids & Syrups
  { name: "Droplet", Icon: Droplet, category: "Liquids & Syrups" },
  { name: "Droplets", Icon: Droplets, category: "Liquids & Syrups" },
  { name: "Beaker", Icon: Beaker, category: "Liquids & Syrups" },
  { name: "FlaskConical", Icon: FlaskConical, category: "Liquids & Syrups" },
  { name: "FlaskRound", Icon: FlaskRound, category: "Liquids & Syrups" },
  { name: "Wine", Icon: Wine, category: "Liquids & Syrups" },
  { name: "Coffee", Icon: Coffee, category: "Liquids & Syrups" },
  { name: "Waves", Icon: Waves, category: "Liquids & Syrups" },
  { name: "Soup", Icon: Soup, category: "Liquids & Syrups" },
  
  // Injections & IV
  { name: "Syringe", Icon: Syringe, category: "Injections & IV" },
  { name: "TestTube", Icon: TestTube, category: "Injections & IV" },
  { name: "CloudRain", Icon: CloudRain, category: "Injections & IV" },
  
  // Ointments & Creams
  { name: "Bandage", Icon: Bandage, category: "Topical Products" },
  { name: "Sparkles", Icon: Sparkles, category: "Topical Products" },
  { name: "Sparkle", Icon: Sparkle, category: "Topical Products" },
  { name: "Snowflake", Icon: Snowflake, category: "Topical Products" },
  { name: "Flame", Icon: Flame, category: "Topical Products" },
  { name: "Gem", Icon: Gem, category: "Topical Products" },
  
  // Body Parts & Conditions
  { name: "Eye", Icon: Eye, category: "Body Systems" },
  { name: "Ear", Icon: Ear, category: "Body Systems" },
  { name: "Brain", Icon: Brain, category: "Body Systems" },
  { name: "Bone", Icon: Bone, category: "Body Systems" },
  { name: "Heart", Icon: Heart, category: "Body Systems" },
  { name: "HeartPulse", Icon: HeartPulse, category: "Body Systems" },
  { name: "Activity", Icon: Activity, category: "Body Systems" },
  { name: "Wind", Icon: Wind, category: "Body Systems" },
  { name: "Footprints", Icon: Footprints, category: "Body Systems" },
  { name: "Fingerprint", Icon: Fingerprint, category: "Body Systems" },
  
  // Medical Equipment
  { name: "Stethoscope", Icon: Stethoscope, category: "Medical Equipment" },
  { name: "Thermometer", Icon: Thermometer, category: "Medical Equipment" },
  { name: "Microscope", Icon: Microscope, category: "Medical Equipment" },
  { name: "Cross", Icon: Cross, category: "Medical Equipment" },
  { name: "Shield", Icon: Shield, category: "Medical Equipment" },
  { name: "Ambulance", Icon: Ambulance, category: "Medical Equipment" },
  { name: "Briefcase", Icon: Briefcase, category: "Medical Equipment" },
  
  // Vitamins & Supplements
  { name: "Leaf", Icon: Leaf, category: "Supplements & Vitamins" },
  { name: "Flower2", Icon: Flower2, category: "Supplements & Vitamins" },
  { name: "Sun", Icon: Sun, category: "Supplements & Vitamins" },
  { name: "Dna", Icon: Dna, category: "Supplements & Vitamins" },
  { name: "Zap", Icon: Zap, category: "Supplements & Vitamins" },
  { name: "Atom", Icon: Atom, category: "Supplements & Vitamins" },
  { name: "Star", Icon: Star, category: "Supplements & Vitamins" },
  { name: "Lightbulb", Icon: Lightbulb, category: "Supplements & Vitamins" },
  
  // Nutrition & Food Supplements
  { name: "Apple", Icon: Apple, category: "Nutrition" },
  { name: "Carrot", Icon: Carrot, category: "Nutrition" },
  { name: "Cherry", Icon: Cherry, category: "Nutrition" },
  { name: "Salad", Icon: Salad, category: "Nutrition" },
  { name: "Milk", Icon: Milk, category: "Nutrition" },
  
  // Special Care & Accessories
  { name: "Baby", Icon: Baby, category: "Special Care" },
  { name: "User", Icon: User, category: "Special Care" },
  { name: "Users", Icon: Users, category: "Special Care" },
  { name: "Moon", Icon: Moon, category: "Special Care" },
  { name: "Accessibility", Icon: Accessibility, category: "Special Care" },
  { name: "Glasses", Icon: Glasses, category: "Special Care" },
  { name: "Shirt", Icon: Shirt, category: "Special Care" },
  { name: "Watch", Icon: Watch, category: "Special Care" },
  
  // Packaging
  { name: "Package", Icon: Package, category: "Packaging" },
  { name: "Package2", Icon: Package2, category: "Packaging" },
  { name: "Box", Icon: Box, category: "Packaging" },
  { name: "Boxes", Icon: Boxes, category: "Packaging" },
  
  // General & Alerts
  { name: "Check", Icon: Check, category: "General" },
  { name: "Plus", Icon: Plus, category: "General" },
  { name: "AlertCircle", Icon: AlertCircle, category: "General" },
  { name: "AlertOctagon", Icon: AlertOctagon, category: "General" },
  { name: "Triangle", Icon: Triangle, category: "General" },
];

const categories = Array.from(new Set(medicalIcons.map(icon => icon.category)));

interface IconSelectorProps {
  value?: string;
  onChange: (iconName: string) => void;
}

export const IconSelector = ({ value, onChange }: IconSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const selectedIcon = medicalIcons.find(icon => icon.name === value);
  const SelectedIconComponent = selectedIcon?.Icon || Pill;

  const filteredIcons = searchQuery 
    ? medicalIcons.filter(icon => 
        icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        icon.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : medicalIcons;

  const groupedIcons = categories.map(category => ({
    category,
    icons: filteredIcons.filter(icon => icon.category === category)
  })).filter(group => group.icons.length > 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12"
        >
          <div className="flex items-center gap-3">
            <SelectedIconComponent className="h-6 w-6 text-primary" />
            <span className="font-medium text-base">{selectedIcon?.name || "Select icon"}</span>
          </div>
          <ChevronDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0" align="start">
        <div className="p-4 border-b bg-muted/30">
          <input
            type="text"
            placeholder="Search icons by name or category..."
            className="w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[450px]">
          <div className="p-4 space-y-5">
            {groupedIcons.map(({ category, icons }) => (
              <div key={category}>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                  {category}
                </h4>
                <div className="grid grid-cols-5 gap-2.5">
                  {icons.map(({ name, Icon }) => (
                    <Button
                      key={name}
                      variant={value === name ? "default" : "outline"}
                      size="sm"
                      className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-accent hover:scale-105 transition-transform"
                      onClick={() => {
                        onChange(name);
                        setOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2} />
                      <span className="text-[10px] font-semibold truncate max-w-full leading-tight">
                        {name}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            {filteredIcons.length === 0 && (
              <div className="text-center py-12 text-sm text-muted-foreground">
                No icons found matching "{searchQuery}"
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
