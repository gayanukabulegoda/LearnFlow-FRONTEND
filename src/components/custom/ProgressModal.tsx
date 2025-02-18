import {useState} from 'react';
import {format} from 'date-fns';
import {XCircle, Clock} from 'lucide-react';
import {Goal, Progress} from '../../types/types.ts';
import Button from '../common/Button.tsx';
import Input from '../common/Input.tsx';
/**
 * @fileoverview This file contains the modal component for logging progress.
 * @interface ProgressModalProps - The props for the ProgressModal component.
 * @returns The {@link JSX.Element} for the ProgressModal component.
 */
interface ProgressModalProps {
    goal: Goal;
    progress: Progress[];
    onClose: () => void;
    onSubmit: (data: { notes: string; duration: number }) => Promise<void>;
}

const ProgressModal = ({goal, progress, onClose, onSubmit}: ProgressModalProps) => {
    const [newProgress, setNewProgress] = useState({
        notes: '',
        duration: 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(newProgress);
        setNewProgress({notes: '', duration: 0});
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
                className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto transform-gpu transition-all duration-300 scale-100 opacity-100">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Log Progress</h2>
                        <p className="text-sm text-gray-500 mt-1">{goal.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 transform-gpu transition-all duration-200 hover:scale-110"
                    >
                        <XCircle className="h-6 w-6"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            What did you accomplish?
                        </label>
                        <textarea
                            value={newProgress.notes}
                            onChange={(e) => setNewProgress({...newProgress, notes: e.target.value})}
                            required
                            className="w-full rounded-lg border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none p-1"
                            placeholder="Describe your progress..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time spent (minutes)
                        </label>
                        <Input
                            type="number"
                            value={newProgress.duration}
                            onChange={(e) =>
                                setNewProgress({
                                    ...newProgress,
                                    duration: parseInt(e.target.value),
                                })
                            }
                            required
                            min="1"
                            placeholder="Enter duration"
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Progress</Button>
                    </div>
                </form>

                {progress.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Progress History</h3>
                        <div className="space-y-4">
                            {progress.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-gray-50 rounded-lg p-4 transform-gpu transition-all duration-200 hover:scale-[1.02]"
                                >
                                    <p className="text-sm text-gray-900">{p.notes}</p>
                                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1"/>
                                            <span>{p.duration} minutes</span>
                                        </div>
                                        <span>{format(new Date(p.createdAt), 'MMM d, yyyy h:mm a')}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgressModal;