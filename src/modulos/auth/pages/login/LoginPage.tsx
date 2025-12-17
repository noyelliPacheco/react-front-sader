import { LoginCard } from "../../components/LoginCard";
import agriculturaLogoBlanco from "@/assets/img/layout/logo_agricultura_blanco-01.svg";

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-xaman-burgundy relative overflow-hidden">
      
      

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 gap-12 lg:gap-24">
        {/* Left side - Welcome text */}
        <div className="text-white text-center lg:text-left max-w-xl">
          <h1 className="text-5xl lg:text-6xl font-montserrat font-bold mb-6 leading-tight">
            Bienvenidos a<br />
            Xaman
          </h1>
          <p className="text-2xl lg:text-3xl font-montserrat font-thin mb-12">
            Herramienta de gestion de apoyos y programas.
          </p>
          
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <img src={agriculturaLogoBlanco} alt="Agricultura Logo"  className="w-16 h-16 lg:w-xl lg:w-xl" />
            {/* <div className="text-left">
              <p className="text-2xl font-bold">Agricultura</p>
              <p className="text-sm">Secretaría de Agricultura y Desarrollo Rural</p>
            </div> */}
          </div>
        </div>

        {/* Right side - Login card */}
        <LoginCard />
      </div>
    </div>
  );
};

