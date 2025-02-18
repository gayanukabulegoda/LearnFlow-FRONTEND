import React from "react";
import {Link} from 'react-router-dom';
import Button from '../common/Button.tsx';
import {ChevronRight} from 'lucide-react';
/**
 * @fileoverview This file contains the CardListSection component.
 * @interface CardListSectionProps - The props for the CardListSection component.
 * @returns The {@link JSX.Element} for the CardListSection component.
 */
interface CardListSectionProps<T> {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    items: T[];
    viewAllLink: string;
    renderItem: (item: T) => React.ReactNode;
    emptyState: {
        icon: React.ComponentType<{ className?: string }>;
        message: string;
    };
    iconColor?: string;
}

const CardListSection = <T, >({
                                  title,
                                  icon: Icon,
                                  items,
                                  viewAllLink,
                                  renderItem,
                                  emptyState,
                                  iconColor = 'blue',
                              }: CardListSectionProps<T>) => {
    return (
        <div
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 transform-gpu transition-all duration-300">
            <div className="p-6 border-b border-gray-200/80">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-${iconColor}-50 rounded-lg`}>
                            <Icon className={`h-5 w-5 text-${iconColor}-600`}/>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    </div>
                    <Link to={viewAllLink}>
                        <Button variant="ghost" size="sm" className="group">
                            View all
                            <ChevronRight
                                className="ml-2 h-4 w-4 transform-gpu transition-transform group-hover:translate-x-1"/>
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="divide-y divide-gray-200/80">
                {items.slice(0, 3).map((item, index) => (
                    <div key={index} className="p-6 group hover:bg-gray-50/50 transition-colors">
                        {renderItem(item)}
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="p-6 text-center">
                        <div
                            className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${iconColor}-100 mb-4`}>
                            <emptyState.icon className={`h-6 w-6 text-${iconColor}-600`}/>
                        </div>
                        <p className="text-sm text-gray-500">{emptyState.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardListSection;