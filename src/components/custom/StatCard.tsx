import React from 'react';
import {LucideIcon} from 'lucide-react';
/**
 * @fileOverview This component is used to display a stat card.
 * @interface StatCardProps - The props for the stat card component.
 * @returns The {@link JSX.Element} for the stat card component.
 */
interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    color: string;
    bgImage?: string;
}

const StatCard: React.FC<StatCardProps> = ({
                                               title,
                                               value,
                                               icon: Icon,
                                               color,
                                               bgImage,
                                           }) => {
    return (
        <div className="group relative transform-gpu transition-all duration-300 hover:scale-[1.03]">
            <div
                className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white rounded-xl transform-gpu rotate-1 opacity-80 group-hover:rotate-2 transition-transform"></div>
            <div
                className="relative overflow-hidden rounded-xl bg-white shadow-lg border border-white/20"
                style={{
                    backgroundImage: bgImage
                        ? `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${bgImage})`
                        : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium text-${color}-600`}>{title}</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                        </div>
                        <div
                            className={`h-12 w-12 bg-${color}-50 rounded-lg flex items-center justify-center transform-gpu transition-transform group-hover:scale-110 group-hover:rotate-12`}
                        >
                            <Icon className={`h-6 w-6 text-${color}-600`}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCard;