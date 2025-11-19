import Navbar from "@/components/Navbar";
import { Keyword } from "@/components/Keyword";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Mail, LayoutGrid, Sparkles, CheckCircle2, ShieldCheck, Upload, ArrowLeft, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import heroShot from "@/assets/pexels-ketut-subiyanto-4353605-CldvEu3q.jpg";
import importShot from "@/assets/ccl_img-CEDKlAM3.jpg";
import kanbanShot from "@/assets/BCRP-BoxNf_19.jpg";

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-12 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-normal text-foreground flex flex-col gap-3 md:gap-4 lg:gap-6 leading-none">
            <span className="block">¿Estás desplegando</span>
            <span className="block"><Keyword tight>Atix‑SmartMail</Keyword>?</span>
            <span className="block">Conoce su documentación</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-8 max-w-3xl">
            Encuentra el formato <Keyword tight>JSON</Keyword> esperado, ejemplos de procesamiento con <Keyword tight>IA</Keyword>,
            explicación del flujo de importación desde <Keyword tight>Gmail</Keyword> y detalles del <Keyword tight>MVP</Keyword>.
          </p>
          <div className="mt-8">
            <Link href="/">
              <Button variant="outline" className="rounded-full"><ArrowLeft className="mr-2 h-4 w-4" /> Volver atrás</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-8">Visión general del producto</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border shadow-sm">
              <div className="text-primary mb-3"><ShieldCheck className="h-6 w-6" /></div>
              <h3 className="font-medium mb-2">Autenticación Google OAuth</h3>
              <p className="text-sm text-muted-foreground">Inicio seguro con <Keyword tight>Google</Keyword>. La sesión se gestiona en base de datos y tu información permanece privada.</p>
            </Card>
            <Card className="p-6 border shadow-sm">
              <div className="text-primary mb-3"><Upload className="h-6 w-6" /></div>
              <h3 className="font-medium mb-2">Importación desde Gmail y JSON</h3>
              <p className="text-sm text-muted-foreground">Conecta tu <Keyword tight>Gmail</Keyword> o sube un archivo <Keyword tight>JSON</Keyword> para procesar tus correos en minutos.</p>
            </Card>
            <Card className="p-6 border shadow-sm">
              <div className="text-primary mb-3"><Sparkles className="h-6 w-6" /></div>
              <h3 className="font-medium mb-2">IA de filtrado y tareas</h3>
              <p className="text-sm text-muted-foreground">La <Keyword tight>IA</Keyword> clasifica por categoría y prioridad y detecta si existe una tarea accionable.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-10">Flujo de trabajo</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              <li>Inicia sesión con tu cuenta de <Keyword tight>Google</Keyword></li>
              <li>Importa correos desde <Keyword tight>Gmail</Keyword> o sube un <Keyword tight>JSON</Keyword></li>
              <li>Procesa con <Keyword tight>IA</Keyword> para filtrar, clasificar y priorizar</li>
              <li>Convierte correos en tareas en tu <Keyword tight>Kanban</Keyword></li>
              <li>Organiza, arrastra y marca completado</li>
            </ul>
            <div className="w-full max-w-md border rounded-2xl p-8 bg-white shadow-sm mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6 text-primary">
                <Mail className="h-8 w-8" />
                <Sparkles className="h-6 w-6" />
                <LayoutGrid className="h-8 w-8" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-16 border border-primary/20 rounded-md bg-primary/5" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-8">Procesamiento con IA</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border shadow-sm">
              <div className="text-primary mb-3"><AlertCircle className="h-6 w-6" /></div>
              <h3 className="font-medium mb-2">Categoría</h3>
              <p className="text-sm text-muted-foreground">Cliente, Lead, Interno o Spam según intención y contexto.</p>
            </Card>
            <Card className="p-6 border shadow-sm">
              <div className="text-primary mb-3"><Clock className="h-6 w-6" /></div>
              <h3 className="font-medium mb-2">Prioridad</h3>
              <p className="text-sm text-muted-foreground">Alta, media o baja según urgencia y riesgo.</p>
            </Card>
            <Card className="p-6 border shadow-sm">
              <div className="text-primary mb-3"><Sparkles className="h-6 w-6" /></div>
              <h3 className="font-medium mb-2">Detección de tareas</h3>
              <p className="text-sm text-muted-foreground">Identifica acciones concretas: enviar propuesta, agendar reunión, responder consulta.</p>
            </Card>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <Card className="p-6 border shadow-sm">
              <h3 className="font-medium mb-2">Ejemplo de resultado</h3>
              <pre className="text-xs whitespace-pre-wrap break-words bg-muted/30 rounded-md p-4">
{`{
  "categoria": "lead",
  "prioridad": "alta",
  "hasTask": true,
  "taskDescription": "Enviar cotización y agendar demo"
}`}
              </pre>
            </Card>
            <Card className="p-6 border shadow-sm">
              <h3 className="font-medium mb-2">Tarjeta de tarea</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Asunto: Solicitud de demo</span>
                  <Badge className="bg-primary text-white">Alta</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Enviar propuesta y coordinar reunión para esta semana.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-10">Capturas del aplicativo</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border shadow-sm">
              <h3 className="font-medium mb-3">Login con Google</h3>
              <div className="rounded-xl overflow-hidden border">
                <Image src={heroShot} alt="Login con Google" className="w-full h-48 object-cover" />
              </div>
              <p className="text-sm text-muted-foreground mt-3">Accede en segundos con tu cuenta de <Keyword tight>Google</Keyword>.</p>
            </Card>
            <Card className="p-6 border shadow-sm">
              <h3 className="font-medium mb-3">Importación desde Gmail</h3>
              <div className="rounded-xl overflow-hidden border">
                <Image src={importShot} alt="Importación desde Gmail" className="w-full h-48 object-cover" />
              </div>
              <p className="text-sm text-muted-foreground mt-3">Trae tus emails de <Keyword tight>Gmail</Keyword> y prepara el procesamiento.</p>
            </Card>
            <Card className="p-6 border shadow-sm">
              <h3 className="font-medium mb-3">Tablero Kanban</h3>
              <div className="rounded-xl overflow-hidden border">
                <Image src={kanbanShot} alt="Tablero Kanban" className="w-full h-48 object-cover" />
              </div>
              <p className="text-sm text-muted-foreground mt-3">Organiza y gestiona tareas detectadas por la <Keyword tight>IA</Keyword>.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-primary">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-10">Formato JSON esperado</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card className="p-6 bg-white/10 border-white/20">
                <p className="text-sm text-white/90">Cada registro debe contener <Keyword tight>id</Keyword>, <Keyword tight>email</Keyword>, <Keyword tight>subject</Keyword> y <Keyword tight>body</Keyword>.</p>
                <pre className="mt-4 text-xs whitespace-pre-wrap break-words text-white/90">
{`[
  {
    "id": "eml_001",
    "email": "cliente@empresa.com",
    "subject": "Solicitud de propuesta",
    "body": "Hola, necesitamos cotización para el servicio..."
  },
  {
    "id": "eml_002",
    "email": "prospecto@startup.io",
    "subject": "Interesados en demo",
    "body": "¿Podemos agendar una reunión para ver el producto?"
  }
]`}
                </pre>
              </Card>
              <div className="mt-4 text-white/90 text-sm">Formato simple y compatible con lotes grandes.</div>
            </div>
            <div className="text-white/90">
              <div className="grid gap-3">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Estructura simple y validada</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Integración rápida</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Compatible con lotes grandes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-10">Bondades del producto</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border shadow-sm">
              <h3 className="font-medium mb-2">Productividad inmediata</h3>
              <p className="text-sm text-muted-foreground">Ahorra tiempo clasificando y priorizando correos con IA.</p>
            </Card>
            <Card className="p-6 border shadow-sm">
              <h3 className="font-medium mb-2">Claridad total</h3>
              <p className="text-sm text-muted-foreground">Tareas visibles y accionables en un <Keyword tight>Kanban</Keyword> moderno.</p>
            </Card>
            <Card className="p-6 border shadow-sm">
              <h3 className="font-medium mb-2">Integración simple</h3>
              <p className="text-sm text-muted-foreground">Conecta <Keyword tight>Gmail</Keyword> o sube <Keyword tight>JSON</Keyword> sin fricción.</p>
            </Card>
          </div>
          <div className="mt-10">
            <Link href="/login">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white">Comenzar ahora</Button>
            </Link>
          </div>
          <div className="mt-10">
            <Link href="/">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white">Volver al inicio</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Docs;