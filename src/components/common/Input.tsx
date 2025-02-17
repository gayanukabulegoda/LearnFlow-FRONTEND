import {forwardRef, InputHTMLAttributes} from 'react';
import {cn} from '../../lib/utils.ts';
/**
 * @fileOverview This Input component is used to render input fields with error messages.
 * @interface InputProps - The props for the Input component.
 * @returns {@link JSX.Element} for the Input component.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({className, error, ...props}, ref) => {
        return (
            <div className="w-full">
                <input
                    ref={ref}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2',
                        'text-sm placeholder:text-gray-400',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        error && 'border-red-500 focus:ring-red-500',
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;