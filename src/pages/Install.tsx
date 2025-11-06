import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Smartphone, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            {isInstalled ? (
              <CheckCircle2 className="h-8 w-8 text-accent" />
            ) : (
              <Smartphone className="h-8 w-8 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isInstalled ? "WellX-Tab is Installed!" : "Install WellX-Tab"}
          </CardTitle>
          <CardDescription>
            {isInstalled
              ? "You can now use WellX-Tab offline anytime"
              : "Add to your home screen for quick access and offline use"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isInstalled ? (
            <Button onClick={() => navigate("/")} className="w-full" size="lg">
              Open App
            </Button>
          ) : (
            <>
              {deferredPrompt ? (
                <Button onClick={handleInstall} className="w-full" size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  Install Now
                </Button>
              ) : (
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">How to install:</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">iOS:</span>
                      <span>Tap Share → Add to Home Screen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">Android:</span>
                      <span>Tap Menu (⋮) → Install app</span>
                    </div>
                  </div>
                </div>
              )}
              <Button onClick={() => navigate("/")} variant="outline" className="w-full">
                Continue to App
              </Button>
            </>
          )}

          <div className="pt-4 border-t space-y-2">
            <p className="text-sm font-semibold">Benefits:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Works completely offline</li>
              <li>✓ Quick access from home screen</li>
              <li>✓ Faster loading times</li>
              <li>✓ No internet required to view products</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Install;
