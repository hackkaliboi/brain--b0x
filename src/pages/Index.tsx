import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Search, Download, Wifi, WifiOff } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/pharmacy-hero.jpg";
import { useEffect, useState } from "react";

const Index = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {isOnline ? (
                <>
                  <Wifi className="h-4 w-4" />
                  Online
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4" />
                  Offline Mode
                </>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Welcome to <span className="text-primary">brain-box</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Your internal price lookup tool. Check wholesale and retail prices instantly,
              manage inventory—even offline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg">
                <Link to="/auth">
                  <Package className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link to="/install">
                  <Download className="mr-2 h-5 w-5" />
                  Install App
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for workers to look up product prices instantly
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-2 transition-all hover:shadow-[var(--shadow-hover)]">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <WifiOff className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Works Offline</h3>
              <p className="text-muted-foreground">
                Access all product information even without an internet connection. Perfect for
                uninterrupted workflow.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 transition-all hover:shadow-[var(--shadow-hover)]">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Search</h3>
              <p className="text-muted-foreground">
                Find products instantly with powerful search and filtering. Filter by category,
                stock status, and more.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 transition-all hover:shadow-[var(--shadow-hover)]">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
              <p className="text-muted-foreground">
                Add, edit, and organize products with an intuitive interface. Track wholesale prices,
                retail prices, and quantities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Start looking up prices and managing your inventory today
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg shadow-[var(--shadow-card)]"
          >
            <Link to="/products">
              <Package className="mr-2 h-5 w-5" />
              Open Price Lookup
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
