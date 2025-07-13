"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  activeView?: string; // Añadimos esta prop
  onSelectProfile?: () => void; 
  onSelectStartups?: () => void;
}

export default function Layout({ 
  children, 
  activeView = "startups", // Valor por defecto
  onSelectProfile = () => {}, 
  onSelectStartups = () => {} 
}: LayoutProps) {
  // Añadir una bandera de montaje para evitar problemas de hidratación
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Versión simple para el servidor o mientras carga
  if (!isMounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="w-full bg-primary text-primary-foreground p-4 shadow-md">
          {/* Placeholder del Header */}
        </div>
        <div className="flex flex-1">
          <div className="h-full w-64 border-r bg-card p-4"></div>
          <main className="flex-1 p-6">
            {/* Un esqueleto o nada mientras carga */}
          </main>
        </div>
      </div>
    );
  }

  // Versión completa solo para el cliente
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar 
          activeView={activeView} // Pasamos la vista activa al Sidebar
          onSelectProfile={onSelectProfile}
          onSelectStartups={onSelectStartups}
        />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}