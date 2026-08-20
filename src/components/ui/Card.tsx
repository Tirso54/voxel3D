import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverScale?: boolean;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverScale = false,
  className,
  ...props
}: CardProps) {
  const variants = {
    default: 'rounded-2xl border bg-card text-card-foreground shadow-voxel-sm transition-all duration-300',
    hover: 'rounded-2xl border bg-card text-card-foreground shadow-voxel-sm transition-all duration-300 hover:shadow-voxel-lg hover:-translate-y-1',
    glass: 'rounded-2xl bg-white/80 dark:bg-voxel-900/80 backdrop-blur-xl border border-white/20 dark:border-voxel-800/50 shadow-voxel-xl',
    gradient: 'relative rounded-2xl bg-card text-card-foreground overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:via-transparent before:to-accent/5',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const Component = hoverScale ? motion.div : 'div';

  return (
    <Component
      whileHover={hoverScale ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
      className={cn(variants[variant], paddings[padding], className)}
      {...(props as any)}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-heading-lg font-semibold text-foreground', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-1 text-body-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  );
}