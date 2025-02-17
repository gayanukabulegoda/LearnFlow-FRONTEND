import {ComponentType} from 'react';
import Input from '../common/Input.tsx';
/**
 * @fileOverview The form field component for authentication pages.
 * @interface FormFieldProps - The props for the form field component.
 * @returns {JSX.Element} - The JSX element for the form field component.
 */
interface FormFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    icon: ComponentType<{ className?: string }>;
    placeholder: string;
    themeColor?: 'blue' | 'purple';
    required?: boolean;
}

const FormField = ({
                       id,
                       label,
                       type,
                       value,
                       onChange,
                       icon: Icon,
                       placeholder,
                       themeColor = 'blue',
                       required = true
                   }: FormFieldProps) => {
    const ringColor = themeColor === 'blue' ? 'focus:ring-blue-500' : 'focus:ring-purple-500';

    return (
        <div className="group">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400"/>
                </div>
                <Input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    className={`pl-10 transition-all duration-300 ${ringColor} focus:ring-2 focus:border-transparent`}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default FormField;