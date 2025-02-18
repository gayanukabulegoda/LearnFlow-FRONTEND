import {Link} from 'react-router-dom';
import {Lightbulb} from 'lucide-react';
/**
 * @fileOverview The header component for authentication pages.
 * @interface AuthHeaderProps - The props for the header component.
 * @returns {JSX.Element} The JSX element for the header component.
 */
interface AuthHeaderProps {
    title: string;
    linkText: string;
    linkPath: string;
    linkPathText: string;
    themeColor?: 'blue' | 'purple';
}

const AuthHeader = ({title, linkText, linkPath, linkPathText, themeColor = 'blue'}: AuthHeaderProps) => {
    const colors = {
        blue: {
            bg: 'bg-blue-500',
            icon: 'text-blue-600',
            link: 'text-blue-600 hover:text-blue-500',
            after: 'after:bg-blue-600'
        },
        purple: {
            bg: 'bg-purple-500',
            icon: 'text-purple-600',
            link: 'text-purple-600 hover:text-purple-500',
            after: 'after:bg-purple-600'
        }
    };

    return (
        <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
                <div className="relative group">
                    <div
                        className={`absolute inset-0 ${colors[themeColor].bg} rounded-full blur-lg transform-gpu group-hover:scale-110 transition-transform duration-300`}></div>
                    <div
                        className="relative bg-white rounded-full p-3 transform-gpu transition-transform duration-300 group-hover:scale-105">
                        <Lightbulb className={`h-8 w-8 ${colors[themeColor].icon}`}/>
                    </div>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{title}</h2>
            <p className="text-sm text-gray-600">
                {linkText}{' '}
                <Link
                    to={linkPath}
                    className={`font-medium ${colors[themeColor].link} transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 ${colors[themeColor].after} after:scale-x-0 after:origin-right after:transition-transform hover:after:scale-x-100 hover:after:origin-left`}
                >
                    {linkPathText}
                </Link>
            </p>
        </div>
    );
};

export default AuthHeader;