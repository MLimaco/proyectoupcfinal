"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Esquema para validación del formulario
const memberSchema = z.object({
  // Define tus campos aquí
  nombre: z.string().min(1, "El nombre es obligatorio"),
  cargo: z.string().min(1, "El cargo es obligatorio"),
  email: z.string().email("Ingresa un email válido"),
  // Otros campos que necesites...
});

type MemberFormValues = z.infer<typeof memberSchema>;

interface MembersFormProps {
  onSubmit: (data: any) => void;
}

export default function MembersForm({ onSubmit }: MembersFormProps) {
  const [members, setMembers] = useState<MemberFormValues[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMemberIndex, setCurrentMemberIndex] = useState<number | null>(null);

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      nombre: "",
      cargo: "",
      email: "",
    },
  });

  const handleAddMember = (data: MemberFormValues) => {
    if (currentMemberIndex !== null) {
      // Editar miembro existente
      const updatedMembers = [...members];
      updatedMembers[currentMemberIndex] = data;
      setMembers(updatedMembers);
    } else {
      // Agregar nuevo miembro
      setMembers([...members, data]);
    }
    
    // Resetear formulario y estado
    form.reset();
    setIsEditing(false);
    setCurrentMemberIndex(null);
  };

  const handleEditMember = (index: number) => {
    setCurrentMemberIndex(index);
    setIsEditing(true);
    form.reset(members[index]);
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  const handleSubmitMembers = () => {
    onSubmit({ members });
  };

  return (
    <div className="w-full space-y-6">
      {/* IMPORTANTE: Cambiar esto de FormLabel a un <h2> común */}
      <h2 className="text-2xl font-bold">Equipo de la startup</h2>
      <p className="text-muted-foreground">
        Añade a los usuarios que integran tu equipo
      </p>
      
      <div className="bg-card p-6 rounded-lg shadow-sm border">
        {/* Formulario para agregar/editar miembros */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddMember)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del miembro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder="Cargo o rol" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">
              {isEditing ? "Actualizar miembro" : "Agregar miembro"}
            </Button>
          </form>
        </Form>

        {/* Lista de miembros */}
        {members.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Integrantes del equipo</h3>
            <div className="space-y-4">
              {members.map((member, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div>
                    <p className="font-medium">{member.nombre}</p>
                    <p className="text-sm text-muted-foreground">{member.cargo}</p>
                    <p className="text-sm">{member.email}</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditMember(index)}>
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleRemoveMember(index)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botón para enviar todos los miembros */}
        {members.length > 0 && (
          <div className="mt-6">
            <Button onClick={handleSubmitMembers} className="w-full">
              Guardar equipo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}