"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const startupSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  razonSocial: z.string().optional().or(z.literal("")),
  ruc: z.string().optional().or(z.literal("")),
  fechaFundacion: z.string().optional().or(z.literal("")),
  categoria: z.string({
    required_error: "Selecciona una categoría",
  }),
  web: z.string().url("Ingresa una URL válida").optional().or(z.literal("")),
  descripcion: z.string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no debe exceder los 500 caracteres"),
});

type StartupFormValues = z.infer<typeof startupSchema>;

interface StartupProfileFormProps {
  onSubmit: (data: StartupFormValues) => void;
  startupData?: Partial<StartupFormValues>;
}

export default function StartupProfileForm({ 
  onSubmit,
  startupData
}: StartupProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(startupData?.descripcion?.length || 0);
  
  const form = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
    defaultValues: startupData || {
      nombre: "",
      razonSocial: "",
      ruc: "",
      fechaFundacion: "",
      categoria: "",
      web: "",
      descripcion: "",
    },
  });

  const handleSubmit = (data: StartupFormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(data);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold">Registro de Startup</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Completa la información de tu emprendimiento
        </p>
      </div>
      
      <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Nombre del proyecto <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del proyecto o startup" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="razonSocial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razón social</FormLabel>
                    <FormControl>
                      <Input placeholder="Razón social (opcional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ruc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RUC</FormLabel>
                    <FormControl>
                      <Input placeholder="RUC (opcional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fechaFundacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de fundación <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría <span className="text-destructive">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fintech">Fintech</SelectItem>
                        <SelectItem value="edtech">Edtech</SelectItem>
                        <SelectItem value="healthtech">Healthtech</SelectItem>
                        <SelectItem value="proptech">Proptech</SelectItem>
                        <SelectItem value="foodtech">Foodtech</SelectItem>
                        <SelectItem value="retailtech">Retailtech</SelectItem>
                        <SelectItem value="otros">Otros</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="web"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Página web o redes sociales</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Descripción corta <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe tu startup o proyecto (máx. 500 caracteres)" 
                        className="min-h-[120px]" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          setCharCount(e.target.value.length);
                        }}
                        maxLength={500}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <span className={`text-xs ${charCount > 480 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                        {charCount}/500
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-6" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar información"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}