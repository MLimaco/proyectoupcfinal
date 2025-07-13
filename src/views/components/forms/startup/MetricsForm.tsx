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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const metricsSchema = z.object({
  etapa: z.string({
    required_error: "Selecciona la etapa de tu startup",
  }),
  ingresosMensuales: z.string().regex(/^\d*$/, {
    message: "Debe ser un número sin puntos ni comas",
  }).optional().or(z.literal("")),
  clientesActivos: z.string().regex(/^\d*$/, {
    message: "Debe ser un número",
  }).optional().or(z.literal("")),
  metricaPrincipal: z.string().min(1, "Describe tu métrica principal"),
  metricaSecundaria: z.string().optional().or(z.literal("")),
});

type MetricsFormValues = z.infer<typeof metricsSchema>;

interface MetricsFormProps {
  onSubmit: (data: MetricsFormValues) => void;
  initialData?: Partial<MetricsFormValues>;
}

export default function MetricsForm({ onSubmit, initialData }: MetricsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<MetricsFormValues>({
    resolver: zodResolver(metricsSchema),
    defaultValues: initialData || {
      etapa: "",
      ingresosMensuales: "",
      clientesActivos: "",
      metricaPrincipal: "",
      metricaSecundaria: "",
    },
  });

  const handleSubmit = (data: MetricsFormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(data);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold">Métricas de tu Startup</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Comparte los indicadores clave de desempeño de tu startup
        </p>
      </div>
      
      <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="etapa"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Etapa actual</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la etapa de tu startup" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ideacion">Ideación</SelectItem>
                        <SelectItem value="validacion">Validación</SelectItem>
                        <SelectItem value="mvp">MVP / Prototipo</SelectItem>
                        <SelectItem value="traccion">Tracción temprana</SelectItem>
                        <SelectItem value="crecimiento">Crecimiento</SelectItem>
                        <SelectItem value="expansion">Expansión</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      La etapa de desarrollo en la que se encuentra tu startup
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ingresosMensuales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingresos mensuales (USD)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 5000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Promedio mensual de ingresos recurrentes
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="clientesActivos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clientes/Usuarios activos</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 250" {...field} />
                    </FormControl>
                    <FormDescription>
                      Número actual de usuarios o clientes activos
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="metricaPrincipal"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Métrica principal (KPI)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe la métrica más importante para tu startup y su valor actual..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Por ejemplo: tasa de conversión, valor de vida del cliente, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="metricaSecundaria"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Métricas secundarias (opcional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe otras métricas relevantes para tu startup..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
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
              {isSubmitting ? "Guardando..." : "Guardar métricas"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}