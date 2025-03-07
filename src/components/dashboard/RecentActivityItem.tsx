
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentActivityItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  status?: "success" | "warning" | "error" | "info";
  className?: string;
}

const RecentActivityItem = ({
  icon,
  title,
  description,
  time,
  user,
  status = "info",
  className,
}: RecentActivityItemProps) => {
  const statusStyles = {
    info: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    success: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    error: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className={cn("flex items-start space-x-4 py-4", className)}>
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full",
          statusStyles[status]
        )}
      >
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium leading-none">{title}</p>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {user && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default RecentActivityItem;
