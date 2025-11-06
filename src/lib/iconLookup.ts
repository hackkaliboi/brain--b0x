import { 
  Pill, Syringe, Stethoscope, HeartPulse, TestTube, 
  Cross, Activity, Thermometer, Eye, Ear, 
  Brain, Bone, Droplet, Zap, Shield, Sparkles,
  Package, Package2, Box, Boxes, Circle,
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
  Droplets, FlaskRound,
  LucideIcon
} from "lucide-react";

// Central icon lookup map - single source of truth
const iconMap: Record<string, LucideIcon> = {
  // Pills & Tablets
  Pill,
  Tablets,
  Circle,
  CircleDot,
  Hexagon,
  Square,
  
  // Liquids & Syrups
  Droplet,
  Droplets,
  Beaker,
  FlaskConical,
  FlaskRound,
  Wine,
  Coffee,
  Waves,
  Soup,
  
  // Injections & IV
  Syringe,
  TestTube,
  CloudRain,
  
  // Ointments & Creams
  Bandage,
  Sparkles,
  Sparkle,
  Snowflake,
  Flame,
  Gem,
  
  // Body Parts & Conditions
  Eye,
  Ear,
  Brain,
  Bone,
  Heart,
  HeartPulse,
  Activity,
  Wind,
  Footprints,
  Fingerprint,
  
  // Medical Equipment
  Stethoscope,
  Thermometer,
  Microscope,
  Cross,
  Shield,
  Ambulance,
  Briefcase,
  
  // Vitamins & Supplements
  Leaf,
  Flower2,
  Sun,
  Dna,
  Zap,
  Atom,
  Star,
  Lightbulb,
  
  // Nutrition & Food Supplements
  Apple,
  Carrot,
  Cherry,
  Salad,
  Milk,
  
  // Special Care & Accessories
  Baby,
  User,
  Users,
  Moon,
  Accessibility,
  Glasses,
  Shirt,
  Watch,
  
  // Packaging
  Package,
  Package2,
  Box,
  Boxes,
  
  // General & Alerts
  Check,
  Plus,
  AlertCircle,
  AlertOctagon,
  Triangle,
};

export const getIconComponent = (iconName?: string): LucideIcon => {
  if (!iconName) return Pill;
  return iconMap[iconName] || Pill;
};
