import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt", { username, password });
  };

  return (
    <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-semibold text-foreground">
            Usuario
          </Label>
          <Input id="username" type="text" placeholder="Nombre de usuario" value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 bg-input border-border rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold text-foreground">
            Contraseña
          </Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="Contraseña" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-input border-border rounded-lg pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="text-left">
          <a href="#" className="text-sm text-xaman-link hover:underline font-medium" >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <Button type="submit" className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg font-semibold" >
          Iniciar sesión
        </Button>

        <div className="text-center">
          <a href="#" className="text-sm text-xaman-gold hover:underline font-medium" >
            *Aviso de privacidad
          </a>
        </div>
      </form>
    </div>
  );
};

