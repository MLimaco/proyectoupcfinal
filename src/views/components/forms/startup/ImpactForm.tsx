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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const impactSchema = z.object({
  problemaSolucion: z.string().min(10, "Describe el problema y la solución en al menos 10 caracteres"),
  impactoSocial: z.string().min(10, "Describe el impacto social en al menos 10 caracteres"),
  nivelComplejidad: z.enum(["1", "2", "3", "4", "5"]),
  nivelMercado: z.enum(["1", "2", "3", "4", "5"]),
  nivelEscalabilidad: z.enum(["1", "2", "3", "4", "5"]),
  nivelEquipo: z.enum(["1", "2", "3", "4", "5"]),
});

type ImpactFormValues = z.infer<typeof impactSchema>;

interface ImpactFormProps {
  onSubmit: (data: ImpactFormValues) => void;
  initialData?: Partial<ImpactFormValues>;
}

export default function ImpactForm({ onSubmit, initialData }: ImpactFormProps) {
  const [activeSection, setActiveSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ImpactFormValues>({
    resolver: zodResolver(impactSchema),
    defaultValues: initialData || {
      problemaSolucion: "",
      impactoSocial: "",
      nivelComplejidad: "3",
      nivelMercado: "3",
      nivelEscalabilidad: "3",
      nivelEquipo: "3",
    },
  });

  const handleSubmit = (data: ImpactFormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(data);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold">Impacto de tu Startup</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Cuéntanos sobre el problema que resuelves y el impacto que generarás
        </p>
      </div>
      
      <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
          <Button 
            variant={activeSection === 1 ? "default" : "outline"} 
            size="sm"
            className="text-xs sm:text-sm px-2 sm:px-3"
            onClick={() => setActiveSection(1)}
          >
            Complejidad
          </Button>
          <Button 
            variant={activeSection === 2 ? "default" : "outline"} 
            size="sm"
            className="text-xs sm:text-sm px-2 sm:px-3"
            onClick={() => setActiveSection(2)}
          >
            Mercado
          </Button>
          <Button 
            variant={activeSection === 3 ? "default" : "outline"} 
            size="sm"
            className="text-xs sm:text-sm px-2 sm:px-3"
            onClick={() => setActiveSection(3)}
          >
            Escalabilidad
          </Button>
          <Button 
            variant={activeSection === 4 ? "default" : "outline"} 
            size="sm"
            className="text-xs sm:text-sm px-2 sm:px-3"
            onClick={() => setActiveSection(4)}
          >
            Equipo
          </Button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6">
            {/* Problema y solución */}
            <FormField
              control={form.control}
              name="problemaSolucion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Qué problema resuelve tu startup?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe el problema que identificaste y cómo tu producto o servicio lo soluciona..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Impacto social */}
            <FormField
              control={form.control}
              name="impactoSocial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impacto social o ambiental</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe cómo tu startup genera un impacto positivo en la sociedad o el medio ambiente..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Sección activa */}
            <div className="pt-4 border-t">
              {activeSection === 1 && (
                <FormField
                  control={form.control}
                  name="nivelComplejidad"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Nivel de complejidad tecnológica</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex justify-between"
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <FormItem key={value} className="flex items-center space-x-1">
                              <FormControl>
                                <RadioGroupItem value={String(value)} />
                              </FormControl>
                              <FormLabel className="text-xs sm:text-sm">{value}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Básica</span>
                        <span>Avanzada</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {activeSection === 2 && (
                <FormField
                  control={form.control}
                  name="nivelMercado"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Potencial de mercado</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex justify-between"
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <FormItem key={value} className="flex items-center space-x-1">
                              <FormControl>
                                <RadioGroupItem value={String(value)} />
                              </FormControl>
                              <FormLabel className="text-xs sm:text-sm">{value}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Pequeño</span>
                        <span>Grande</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {activeSection === 3 && (
                <FormField
                  control={form.control}
                  name="nivelEscalabilidad"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Potencial de escalabilidad</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex justify-between"
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <FormItem key={value} className="flex items-center space-x-1">
                              <FormControl>
                                <RadioGroupItem value={String(value)} />
                              </FormControl>
                              <FormLabel className="text-xs sm:text-sm">{value}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Local</span>
                        <span>Global</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {activeSection === 4 && (
                <FormField
                  control={form.control}
                  name="nivelEquipo"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Fortaleza del equipo</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex justify-between"
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <FormItem key={value} className="flex items-center space-x-1">
                              <FormControl>
                                <RadioGroupItem value={String(value)} />
                              </FormControl>
                              <FormLabel className="text-xs sm:text-sm">{value}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>En desarrollo</span>
                        <span>Consolidado</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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