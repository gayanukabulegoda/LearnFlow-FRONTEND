import {format} from 'date-fns';
import {Calendar, Trash2, CheckCircle, BarChart2, Clock, Target} from 'lucide-react';
import {Goal} from '../../types/types.ts';
import Button from '../common/Button.tsx';
import ProgressChart from './ProgressChart';
/**
 * @fileoverview This file contains the GoalCard component.
 * @interface GoalCardProps - The props for the GoalCard component.
 * @returns The {@link JSX.Element} for the GoalCard component.
 */
interface GoalCardProps {
    goal: Goal;
    onDelete: (id: number) => void;
    onComplete: (id: number) => void;
    onLogProgress: (goal: Goal) => void;
}

const GoalCard = ({goal, onDelete, onComplete, onLogProgress}: GoalCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-100 text-green-800';
            case 'IN_PROGRESS':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const daysLeft = Math.ceil(
        (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    );

    return (
        <div className="group relative transform-gpu transition-all duration-300 hover:scale-[1.02] hover:rotate-1">
            <div
                className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl transform-gpu rotate-1 opacity-80 group-hover:rotate-2 transition-transform"></div>
            <div className="relative bg-white rounded-xl p-6 shadow-lg border border-white/20">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                        <div
                            className="p-2 bg-blue-50 rounded-lg transform-gpu transition-transform group-hover:scale-110">
                            <Target className="h-5 w-5 text-blue-600"/>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">{goal.title}</h3>
                    </div>
                    <button
                        onClick={() => onDelete(goal.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transform-gpu transition-all duration-200 hover:scale-110"
                    >
                        <Trash2 className="h-4 w-4"/>
                    </button>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{goal.description}</p>

                {/* Progress Chart */}
                <div className="mt-4">
                    <ProgressChart progress={goal.progress || 0}/>
                </div>

                {/* Date and Status */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0"/>
                        <span>{format(new Date(goal.targetDate), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2"/>
                        <span>{daysLeft} days left</span>
                    </div>
                </div>

                {/* Status and Actions */}
                <div className="mt-4 flex items-center justify-between">
          <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                  goal.status
              )}`}
          >
            {goal.status.replace('_', ' ')}
          </span>
                    {goal.status !== 'COMPLETED' && (
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onLogProgress(goal)}
                                className="text-xs group/button"
                            >
                                <BarChart2
                                    className="h-3 w-3 mr-1 transform-gpu transition-transform group-hover/button:scale-110"/>
                                Log Progress
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onComplete(goal.id)}
                                className="text-xs group/button"
                            >
                                <CheckCircle
                                    className="h-3 w-3 mr-1 transform-gpu transition-transform group-hover/button:scale-110"/>
                                Complete
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoalCard;