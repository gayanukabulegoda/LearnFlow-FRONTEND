import React, {ReactNode} from 'react';
import {cn} from '../../lib/utils.ts';
/**
 * @fileOverview This PageHeader component is used to render a header section with a gradient background.
 * @interface PageHeaderProps - The props for the PageHeader component.
 * @returns {@link JSX.Element} for the PageHeader component.
 */
interface PageHeaderProps {
    title: string;
    subtitle?: string;
    gradient?: string;
    icon?: React.ElementType;
    iconColor?: string;
    children?: ReactNode;
    headerContent?: ReactNode;
}

const PageHeader = ({
                        title,
                        subtitle,
                        gradient = 'from-blue-400 to-indigo-400',
                        icon: Icon,
                        iconColor = 'blue',
                        children,
                        headerContent
                    }: PageHeaderProps) => {
    return (
        <div className="relative">
            {/* Gradient background */}
            <div className={cn(
                "absolute inset-0 rounded-2xl transform-gpu rotate-1 opacity-20 group-hover:rotate-2 transition-transform",
                `bg-gradient-to-r ${gradient}`
            )}/>

            {/* Main content container */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                {/* Header content area */}
                {/*<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">*/}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    {/* Left side with icon and text */}
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {Icon && (
                            <div className="relative group flex-shrink-0">
                                <div className={cn(
                                    "absolute inset-0 rounded-full blur-lg transform-gpu group-hover:scale-110 transition-transform duration-300 opacity-75",
                                    `bg-${iconColor}-500`
                                )}/>
                                <div className={cn(
                                    "relative bg-white rounded-full p-2",
                                    `text-${iconColor}-600`
                                )}>
                                    <Icon className="h-6 w-6"/>
                                </div>
                            </div>
                        )}

                        <div className="min-w-0">
                            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
                        </div>
                    </div>

                    {/* Right side content */}
                    {headerContent && (
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            {headerContent}
                        </div>
                    )}
                </div>

                {/* Additional children content */}
                {children && <div className="mt-4">{children}</div>}
            </div>
        </div>
    );
};

export default PageHeader;