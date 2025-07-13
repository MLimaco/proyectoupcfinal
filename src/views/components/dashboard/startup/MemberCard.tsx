"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  member: {
    id: string;
    nombre: string;
    cargo: string;
    email: string;
    avatar?: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export default function MemberCard({ 
  member,
  onEdit,
  onDelete,
  className
}: MemberCardProps) {
  // Obtener iniciales para el avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className={cn("h-full flex flex-col transition-all hover:shadow-md", className)}>
      <CardContent className="pt-6 pb-2 flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 mb-4">
          {member.avatar ? (
            <AvatarImage src={member.avatar} alt={member.nombre} />
          ) : (
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {getInitials(member.nombre)}
            </AvatarFallback>
          )}
        </Avatar>
        
        <h3 className="font-medium text-lg line-clamp-1">{member.nombre}</h3>
        <Badge variant="outline" className="mt-1 mb-2">
          {member.cargo}
        </Badge>
        <p className="text-sm text-muted-foreground line-clamp-1">{member.email}</p>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 flex justify-center gap-2 mt-auto">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground hover:text-foreground"
          onClick={() => onEdit(member.id)}
        >
          <Edit size={16} className="mr-1" />
          Editar
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-destructive hover:text-destructive/80"
          onClick={() => onDelete(member.id)}
        >
          <Trash2 size={16} className="mr-1" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}