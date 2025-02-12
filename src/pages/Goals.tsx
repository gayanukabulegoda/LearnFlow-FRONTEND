import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    fetchGoalProgress,
    logProgress,
    setSelectedGoal,
} from '../store/slices/goalsSlice';
import {format} from 'date-fns';
import {
    Plus,
    Calendar,
    Trash2,
    CheckCircle,
    XCircle,
    BarChart2,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Goals = () => {
    const dispatch = useAppDispatch();
    const {goals, selectedGoal, progress, isLoading} = useAppSelector(
        (state) => state.goals
    );
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
    const [newGoal, setNewGoal] = useState({
        title: '',
        description: '',
        targetDate: '',
    });
    const [newProgress, setNewProgress] = useState({
        notes: '',
        duration: 0,
    });

    useEffect(() => {
        dispatch(fetchGoals());
    }, [dispatch]);

    useEffect(() => {
        if (selectedGoal) {
            dispatch(fetchGoalProgress(selectedGoal.id));
        }
    }, [dispatch, selectedGoal]);

    const handleCreateGoal = async (e: React.FormEvent) => {
        e.preventDefault();
        // Format the date to ISO string for the backend
        const formattedGoal = {
            ...newGoal,
            targetDate: new Date(newGoal.targetDate).toISOString(),
        };
        await dispatch(createGoal(formattedGoal));
        setNewGoal({title: '', description: '', targetDate: ''});
        setIsCreateModalOpen(false);
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        await dispatch(updateGoal({id, data: {status}}));
    };

    const handleDeleteGoal = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            await dispatch(deleteGoal(id));
        }
    };

    const handleLogProgress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedGoal) {
            await dispatch(
                logProgress({
                    goalId: selectedGoal.id,
                    data: newProgress,
                })
            );
            setNewProgress({notes: '', duration: 0});
            setIsProgressModalOpen(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-100 text-green-800';
            case 'IN_PROGRESS':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading && goals.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"/>
            </div>
        );
    }

    return (
        <div className="space-y-6 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Learning Goals</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Track and manage your learning objectives
                    </p>
                </div>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4 mr-2"/>
                    New Goal
                </Button>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {goals.map((goal) => (
                    <div
                        key={goal.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                                {goal.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleDeleteGoal(goal.id)}
                                    className="text-gray-400 hover:text-red-500 p-1"
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </button>
                            </div>
                        </div>
                        <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">
                            {goal.description}
                        </p>
                        <div className="mt-4 flex items-center text-xs sm:text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-2 flex-shrink-0"/>
                            {format(new Date(goal.targetDate), 'MMM d, yyyy')}
                        </div>
                        <div
                            className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      goal.status
                  )}`}
              >
                {goal.status.replace('_', ' ')}
              </span>
                            {goal.status !== 'COMPLETED' && (
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                            dispatch(setSelectedGoal(goal));
                                            setIsProgressModalOpen(true);
                                        }}
                                        className="text-xs"
                                    >
                                        <BarChart2 className="h-3 w-3 mr-1"/>
                                        Log Progress
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleUpdateStatus(goal.id, 'COMPLETED')}
                                        className="text-xs"
                                    >
                                        <CheckCircle className="h-3 w-3 mr-1"/>
                                        Complete
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {goals.length === 0 && !isLoading && (
                <div className="text-center py-12">
                    <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mx-auto">
                        <Plus className="h-6 w-6 text-blue-600"/>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No goals yet</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Create your first learning goal to get started
                    </p>
                </div>
            )}

            {/* Create Goal Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg sm:text-xl font-semibold">Create New Goal</h2>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <XCircle className="h-6 w-6"/>
                            </button>
                        </div>
                        <form onSubmit={handleCreateGoal} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <Input
                                    type="text"
                                    value={newGoal.title}
                                    onChange={(e) =>
                                        setNewGoal({...newGoal, title: e.target.value})
                                    }
                                    required
                                    className="mt-1"
                                    placeholder="Enter goal title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={newGoal.description}
                                    onChange={(e) =>
                                        setNewGoal({...newGoal, description: e.target.value})
                                    }
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
                                    placeholder="Describe your goal"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Target Date
                                </label>
                                <Input
                                    type="date"
                                    value={newGoal.targetDate}
                                    onChange={(e) =>
                                        setNewGoal({...newGoal, targetDate: e.target.value})
                                    }
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="w-full sm:w-auto">
                                    Create Goal
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Log Progress Modal */}
            {isProgressModalOpen && selectedGoal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg sm:text-xl font-semibold">Log Progress</h2>
                            <button
                                onClick={() => setIsProgressModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <XCircle className="h-6 w-6"/>
                            </button>
                        </div>
                        <form onSubmit={handleLogProgress} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Notes
                                </label>
                                <textarea
                                    value={newProgress.notes}
                                    onChange={(e) =>
                                        setNewProgress({...newProgress, notes: e.target.value})
                                    }
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
                                    placeholder="What did you accomplish?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Duration (minutes)
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
                                    className="mt-1"
                                    placeholder="Enter time spent"
                                />
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsProgressModalOpen(false)}
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="w-full sm:w-auto">
                                    Log Progress
                                </Button>
                            </div>
                        </form>

                        {/* Progress History */}
                        {progress.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">
                                    Progress History
                                </h3>
                                <div className="space-y-3">
                                    {progress.map((p) => (
                                        <div
                                            key={p.id}
                                            className="bg-gray-50 rounded-lg p-3 text-sm"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{p.notes}</span>
                                                <span className="text-gray-500">
                          {p.duration} minutes
                        </span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {format(new Date(p.createdAt), 'MMM d, yyyy h:mm a')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Goals;