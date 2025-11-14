import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Upload,
  Search,
  Filter,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
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

const EmailsView = () => {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: "1",
      email: "cliente@empresa.com",
      subject: "Reunión urgente - Propuesta Q4",
      received_at: "2024-11-14T09:15:00Z",
      body: "Necesito que revisemos la propuesta para el cuarto trimestre. Es importante coordinar una reunión esta semana para discutir los detalles del proyecto.",
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
      body: "Buenos días, estamos buscando un proveedor de servicios de email management y nos gustaría conocer más sobre su oferta.",
      category: "lead",
      priority: "media",
      hasTask: true,
      taskDescription: "Enviar cotización y material comercial",
    },
    {
      id: "3",
      email: "equipo@interno.com",
      subject: "Actualización de proyecto",
      received_at: "2024-11-14T07:45:00Z",
      body: "El proyecto está avanzando según lo planificado. Se adjunta el reporte semanal con los últimos avances.",
      category: "interno",
      priority: "baja",
      hasTask: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File uploaded:", file.name);
      // TODO: Implement JSON parsing
    }
  };

  const getCategoryBadge = (category?: string) => {
    const variants: Record<string, string> = {
      cliente: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      lead: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      interno: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      spam: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return variants[category || ""] || variants.spam;
  };

  const getPriorityBadge = (priority?: string) => {
    const variants: Record<
      string,
      { bg: string; icon: React.ReactNode }
    > = {
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

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (email: Email) => {
    setSelectedEmail(email);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Emails</h1>
        <p className="text-muted-foreground">
          Gestiona y procesa tus emails con inteligencia artificial
        </p>
      </div>

      {/* Actions Bar */}
      <Card className="p-6 shadow-card border-0">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por remitente o asunto..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
            <label htmlFor="file-upload-emails">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Upload className="h-4 w-4" />
                Importar JSON
              </Button>
              <input
                id="file-upload-emails"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <Button className="gap-2 bg-purple text-white hover:bg-purple/90">
              <Sparkles className="h-4 w-4" />
              Procesar con IA
            </Button>
          </div>
        </div>
      </Card>

      {/* Email Table */}
      <Card className="shadow-card border-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead>Remitente</TableHead>
              <TableHead>Asunto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Tarea</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmails.map((email) => {
              const priorityInfo = getPriorityBadge(email.priority);
              return (
                <TableRow
                  key={email.id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleRowClick(email)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{email.email}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {email.subject}
                  </TableCell>
                  <TableCell>
                    {email.category && (
                      <Badge className={getCategoryBadge(email.category)}>
                        {email.category}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {email.priority && (
                      <Badge className={priorityInfo.bg}>
                        <span className="flex items-center gap-1">
                          {priorityInfo.icon}
                          {email.priority}
                        </span>
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {email.hasTask ? (
                      <Badge className="bg-primary/10 text-primary">Sí</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(email.received_at).toLocaleDateString("es-ES")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Email Details Dialog */}
      <EmailDetailsDialog
        email={selectedEmail}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default EmailsView;
