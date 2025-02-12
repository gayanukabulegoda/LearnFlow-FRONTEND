import {forwardRef, TextareaHTMLAttributes} from 'react';

type TextareaProps = {
    label?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({label, ...props}, ref) => {
        return (
            <div className="space-y-1">
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...props}
                />
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
export default Textarea;