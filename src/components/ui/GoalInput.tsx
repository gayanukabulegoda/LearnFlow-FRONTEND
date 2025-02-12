import {forwardRef, InputHTMLAttributes} from 'react';

type InputProps = {
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({label, ...props}, ref) => {
        return (
            <div className="space-y-1">
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';
export default Input;