import {ReactNode} from 'react';
/**
 * @fileOverview The layout component for authentication pages.
 * @interface AuthLayoutProps - The props for the layout component.
 * @returns {JSX.Element} The JSX element for the layout component.
 */
interface AuthLayoutProps {
    children: ReactNode;
    blobColors: string[];
}

const AuthLayout = ({children, blobColors}: AuthLayoutProps) => {
    return (
        <div
            className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 z-0">
                {blobColors.map((color, index) => (
                    <div
                        key={index}
                        className={`absolute ${getBlobPosition(index)} w-32 h-32 ${color} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${
                            index % 2 === 0 ? 'animation-delay-2000' : ''
                        }`}
                    ></div>
                ))}
            </div>
            {children}
        </div>
    );
};

const getBlobPosition = (index: number) => {
    const positions = [
        'top-1/4 left-1/4',
        'top-1/3 right-1/3',
        'bottom-1/3 left-1/2',
        'bottom-1/4 right-1/4'
    ];
    return positions[index % positions.length];
};

export default AuthLayout;