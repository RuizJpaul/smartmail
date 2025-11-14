import { Card } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

const QuickAccessCard = ({ title, description, icon: Icon, href }: QuickAccessCardProps) => {
  return (
    <Link to={href}>
      <Card className="p-6 shadow-card border-0 hover:shadow-soft transition-all hover:border-primary/20 cursor-pointer group">
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Acceso Rápido
          </p>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default QuickAccessCard;
