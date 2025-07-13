"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddMemberCardProps {
  onClick: () => void;
  className?: string;
}

export default function AddMemberCard({ onClick, className }: AddMemberCardProps) {
  return (
    <Card 
      className={cn(
        "h-full flex flex-col items-center justify-center cursor-pointer transition-all",
        "hover:bg-primary/5 hover:border-primary/20",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center h-full py-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Plus size={36} className="text-primary" />
        </div>
        <h3 className="font-medium text-lg">Agregar integrante</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Añade un nuevo miembro a tu equipo
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4"
        >
          <Plus size={16} className="mr-1" />
          Nuevo integrante
        </Button>
      </CardContent>
    </Card>
  );
}