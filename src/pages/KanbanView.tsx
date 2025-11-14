import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import EmailDetailsDialog from "@/components/EmailDetailsDialog";

interface Email {
  id: string;
  email: string;
  subject: string;
  received_at: string;
  body?: string;
  category?: string;
  priority?: string;
  hasTask?: boolean;
  taskDescription?: string;
}

const KanbanView = () => {
  const [emails] = useState<Email[]>([
    {
      id: "1",
      email: "cliente@empresa.com",
      subject: "Reunión urgente - Propuesta Q4",
      received_at: "2024-11-14T09:15:00Z",
      body: "Necesito que revisemos la propuesta para el cuarto trimestre.",
      category: "cliente",
      priority: "alta",
      hasTask: true,
      taskDescription: "Preparar presentación para reunión Q4",
    },
    {
      id: "2",
      email: "lead@startup.com",
      subject: "Interesado en sus servicios",
      received_at: "2024-11-14T08:30:00Z",
      body: "Estamos buscando un proveedor de servicios.",
      category: "lead",
      priority: "media",
      hasTask: true,
      taskDescription: "Enviar cotización y material comercial",
    },
  ]);

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getPriorityBadge = (priority?: string) => {
    const variants: Record<string, { bg: string; icon: React.ReactNode }> = {
      alta: {
        bg: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        icon: <AlertCircle className="h-3 w-3" />,
      },
      media: {
        bg: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        icon: <Clock className="h-3 w-3" />,
      },
      baja: {
        bg: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        icon: <CheckCircle2 className="h-3 w-3" />,
      },
    };
    return variants[priority || "baja"];
  };

  const handleCardClick = (email: Email) => {
    setSelectedEmail(email);
    setDialogOpen(true);
  };

  const taskEmails = emails.filter((e) => e.hasTask);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Tablero Kanban
        </h1>
        <p className="text-muted-foreground">
          Organiza tus tareas visualmente por estado de progreso
        </p>
      </div>

      {/* Kanban Board */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Por hacer */}
        <div className="space-y-4">
          <Card className="p-4 shadow-card border-0 bg-muted/30">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-foreground">
                Por hacer
              </h3>
              <Badge className="bg-blue-100 text-blue-800">
                {taskEmails.length}
              </Badge>
            </div>
          </Card>
          <div className="space-y-3">
            {taskEmails.map((email) => {
              const priorityInfo = getPriorityBadge(email.priority);
              return (
                <Card
                  key={email.id}
                  className="p-4 bg-card border border-border hover:shadow-sm hover:border-primary/20 transition-all cursor-pointer"
                  onClick={() => handleCardClick(email)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm text-foreground line-clamp-2">
                        {email.subject}
                      </p>
                      <Badge className={priorityInfo.bg}>
                        <span className="flex items-center gap-1">
                          {priorityInfo.icon}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {email.email}
                    </p>
                    {email.taskDescription && (
                      <div className="flex items-start gap-2 bg-muted/50 p-2 rounded text-xs">
                        <Sparkles className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                        <p className="text-muted-foreground line-clamp-2">
                          {email.taskDescription}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* En progreso */}
        <div className="space-y-4">
          <Card className="p-4 shadow-card border-0 bg-muted/30">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-foreground">
                En progreso
              </h3>
              <Badge className="bg-yellow-100 text-yellow-800">0</Badge>
            </div>
          </Card>
          <Card className="p-8 border-2 border-dashed border-border bg-muted/20">
            <div className="text-center text-muted-foreground text-sm">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Arrastra tareas aquí</p>
            </div>
          </Card>
        </div>

        {/* Completado */}
        <div className="space-y-4">
          <Card className="p-4 shadow-card border-0 bg-muted/30">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-foreground">
                Completado
              </h3>
              <Badge className="bg-green-100 text-green-800">0</Badge>
            </div>
          </Card>
          <Card className="p-8 border-2 border-dashed border-border bg-muted/20">
            <div className="text-center text-muted-foreground text-sm">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Las tareas completadas aparecerán aquí</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Email Details Dialog */}
      <EmailDetailsDialog
        email={selectedEmail}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default KanbanView;
