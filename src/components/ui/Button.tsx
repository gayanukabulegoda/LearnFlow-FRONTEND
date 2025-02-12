import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'disabled:pointer-events-none disabled:opacity-50',
                    {
                        'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600':
                            variant === 'primary',
                        'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500':
                            variant === 'secondary',
                        'border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500':
                            variant === 'outline',
                        'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500':
                            variant === 'ghost',
                        'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600':
                            variant === 'danger',
                        'h-8 px-3 text-sm': size === 'sm',
                        'h-10 px-4': size === 'md',
                        'h-12 px-6 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;