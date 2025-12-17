import texturaAgricultura from "@/assets/img/layout/textura-01.svg";
import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className="">
        <div className="absolute inset-0 "
            style={{
            backgroundImage: `url(${texturaAgricultura})`,
            backgroundSize: "cover",        // hace que la imagen ocupe todo
            backgroundPosition: "center",   // centra la imagen
            backgroundRepeat: "no-repeat",  // evita mosaicos
            backgroundColor: "#7f0f2a",    
            }}
        />
        <div className="relative z-10">
            <Outlet/>
        </div>
    </div>

  )
}
