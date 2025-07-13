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
  nombre: z.string().min(1, "El nombre es obligatorio"),
  cargo: z.string().min(1, "El cargo es obligatorio"),
  email: z.string().email("Ingresa un email válido"),
});

type MemberFormValues = z.infer<typeof memberSchema>;

interface MembersFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function MembersForm({ onSubmit, initialData }: MembersFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Usar initialData si está disponible
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData || {
      nombre: "",
      cargo: "",
      email: "",
    },
  });

  const handleSubmit = (data: MemberFormValues) => {
    setIsSubmitting(true);
    
    // Simular envío con un pequeño retraso
    setTimeout(() => {
      onSubmit(data);
      setIsSubmitting(false);
      
      // Solo resetear si no hay datos iniciales (es un nuevo registro)
      if (!initialData) {
        form.reset();
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del integrante" {...field} />
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
                      <Input placeholder="Ej: CEO, CTO, Developer" {...field} />
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
                    <FormLabel>Email de contacto</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? "Guardando..." 
                  : initialData 
                    ? "Actualizar integrante" 
                    : "Agregar integrante"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}