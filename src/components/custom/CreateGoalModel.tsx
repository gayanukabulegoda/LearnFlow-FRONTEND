import React, {useState} from 'react';
import {XCircle} from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
/**
 * @fileoverview This file contains the modal component for creating a new goal.
 * @interface CreateGoalModalProps - The props for the CreateGoalModal component.
 * @returns The {@link JSX.Element} for the CreateGoalModal component.
 */
interface CreateGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (goal: {
        title: string;
        description: string;
        targetDate: string
    }) => Promise<void>;
}

const CreateGoalModal = ({isOpen, onClose, onCreate}: CreateGoalModalProps) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        targetDate: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onCreate(formData);
        setFormData({title: '', description: '', targetDate: ''});
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
                className="bg-white rounded-2xl w-full max-w-md p-6 transform-gpu transition-all duration-300 scale-100 opacity-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Goal</h2>
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
                            Title
                        </label>
                        <Input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required
                            placeholder="Enter goal title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            required
                            className="w-full rounded-lg border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none p-1"
                            placeholder="Describe your goal"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target Date
                        </label>
                        <Input
                            type="date"
                            value={formData.targetDate}
                            onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Create Goal</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGoalModal;