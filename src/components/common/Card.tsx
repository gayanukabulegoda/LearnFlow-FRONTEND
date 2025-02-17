import React from 'react';
import {cn} from '../../lib/utils';
/**
 * @fileOverview This Card component is used to render cards with a gradient background and shadow.
 * @interface CardProps - The props for the Card component.
 * @returns {@link JSX.Element} for the Card component.
 */
interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({children, className, hover = true}) => {
    return (
        <div
            className={cn(
                'group relative transform-gpu transition-all duration-300',
                hover && 'hover:rotate-1',
                className
            )}
        >
            <div
                className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white rounded-xl transform-gpu rotate-1 opacity-80 group-hover:rotate-2 transition-transform"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                {children}
            </div>
        </div>
    );
};

export default Card;