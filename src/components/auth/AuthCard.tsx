import {ReactNode} from 'react';
/**
 * @fileOverview The card component for authentication pages.
 * @interface AuthCardProps - The props for the card component.
 * @returns {JSX.Element} The JSX element for the card component.
 */
interface AuthCardProps {
    children: ReactNode;
    hoverColor?: string;
}

const AuthCard = ({children, hoverColor = 'blue'}: AuthCardProps) => {
    return (
        <div className="max-w-md w-full space-y-8 relative z-10">
            <div className="will-change-transform">
                <div
                    className={`bg-white rounded-2xl shadow-2xl p-8 transform-gpu transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl ${
                        hoverColor === 'purple' ? 'hover:shadow-purple-500/20' : 'hover:shadow-blue-500/20'
                    }`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthCard;