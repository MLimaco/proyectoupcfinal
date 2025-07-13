"use client";

import { useState } from "react";
import MemberCard from "./MemberCard";
import AddMemberCard from "./AddMemberCard";
import MembersForm from "@/views/components/forms/startup/MembersForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";

// Datos mockup de integrantes para demostración
const mockMembers = [
  {
    id: "1",
    nombre: "Ana Rodríguez",
    cargo: "CEO",
    email: "ana.rodriguez@startup.com",
    avatar: "",
  },
  {
    id: "2",
    nombre: "Carlos Mendoza",
    cargo: "CTO",
    email: "carlos.mendoza@startup.com",
    avatar: "",
  },
  {
    id: "3",
    nombre: "María Sánchez",
    cargo: "Marketing Lead",
    email: "maria.sanchez@startup.com",
    avatar: "",
  },
  {
    id: "4",
    nombre: "Javier López",
    cargo: "Full Stack Developer",
    email: "javier.lopez@startup.com",
    avatar: "",
  },
];

interface MembersListProps {
  startupId?: string;
  onSubmit?: (data: any) => void;
}

export default function MembersList({ startupId, onSubmit }: MembersListProps) {
  const [members, setMembers] = useState(mockMembers);
  const [showForm, setShowForm] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMember = () => {
    setEditingMemberId(null);
    setShowForm(true);
  };

  const handleEditMember = (id: string) => {
    setEditingMemberId(id);
    setShowForm(true);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleFormSubmit = (data: any) => {
    if (editingMemberId) {
      // Actualizar miembro existente
      setMembers(members.map(m => 
        m.id === editingMemberId ? { ...m, ...data } : m
      ));
    } else {
      // Añadir nuevo miembro
      const newMember = {
        id: `${Date.now()}`,
        ...data,
      };
      setMembers([...members, newMember]);
    }
    
    setShowForm(false);
    if (onSubmit) onSubmit(data);
  };

  // Si estamos mostrando el formulario
  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={() => setShowForm(false)}
          >
            <ArrowLeft size={16} className="mr-1" />
            Volver
          </Button>
          <h2 className="text-2xl font-bold">
            {editingMemberId ? "Editar integrante" : "Agregar integrante"}
          </h2>
        </div>
        
        <MembersForm 
          onSubmit={handleFormSubmit}
          initialData={editingMemberId 
            ? members.find(m => m.id === editingMemberId) 
            : undefined}
        />
      </div>
    );
  }

  // Mostrar la lista de integrantes
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Integrantes del equipo</h2>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="hidden md:flex" // Oculto en móvil, visible en desktop
        >
          <Plus size={16} className="mr-1" />
          Nuevo integrante
        </Button>
      </div>
      
      {/* Grid responsivo para las tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Solo mostrar la tarjeta de Añadir en móvil */}
        <div className="md:hidden">
          <AddMemberCard onClick={handleAddMember} />
        </div>
        
        {/* Tarjetas de miembros existentes */}
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        ))}
      </div>

      {/* Dialog para formulario en pantallas más grandes */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Agregar nuevo integrante</DialogTitle>
          </DialogHeader>
          <MembersForm 
            onSubmit={(data) => {
              handleFormSubmit(data);
              setIsDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}