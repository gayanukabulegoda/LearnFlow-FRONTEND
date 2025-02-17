import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    fetchGoalProgress,
    logProgress,
    setSelectedGoal,
} from '../store/slices/goalsSlice.ts';
import {Plus, Target} from 'lucide-react';
import Button from '../components/common/Button.tsx';
import GoalCard from '../components/custom/GoalCard.tsx';
import ProgressModal from '../components/custom/ProgressModal.tsx';
import PageHeader from "../components/common/PageHeader.tsx";
import CreateGoalModal from "../components/custom/CreateGoalModel.tsx";
/**
 * @fileOverview The Goals component: used to manage learning goals.
 * @features Create, update, delete, and log progress for learning goals.
 * @exports Goals - The Goals component.
 */
const Goals = () => {
    const dispatch = useAppDispatch();
    const {goals, selectedGoal, progress, isLoading} = useAppSelector(
        (state) => state.goals
    );
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchGoals());
    }, [dispatch]);

    useEffect(() => {
        if (selectedGoal) {
            dispatch(fetchGoalProgress(selectedGoal.id));
        }
    }, [dispatch, selectedGoal]);

    const handleCreateGoal = async (formData: {
        title: string;
        description: string;
        targetDate: string
    }) => {
        const formattedGoal = {
            ...formData,
            targetDate: new Date(formData.targetDate).toISOString(),
        };
        await dispatch(createGoal(formattedGoal));
        setIsCreateModalOpen(false);
    };

    const handleUpdateStatus = async (id: number, status: 'COMPLETED') => {
        const goal = goals.find((goal) => goal.id === id);
        if (!goal) return;

        await dispatch(updateGoal({
            id,
            data: {
                title: goal.title,
                description: goal.description,
                targetDate: goal.targetDate,
                status
            }
        }));
        dispatch(fetchGoals());
    };

    const handleDeleteGoal = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            await dispatch(deleteGoal(id));
            dispatch(fetchGoals());
        }
    };

    const handleLogProgress = async (data: { notes: string; duration: number }) => {
        if (selectedGoal) {
            await dispatch(
                logProgress({
                    goalId: selectedGoal.id,
                    data,
                })
            );
            dispatch(fetchGoals());
            setIsProgressModalOpen(false);
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
        <div
            className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -mt-8 -mx-4 sm:-mx-6 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <PageHeader
                    title="Learning Goals"
                    subtitle="Track and manage your learning objectives"
                    icon={Target}
                    iconColor="blue"
                    headerContent={
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="w-full sm:w-auto transform-gpu transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                        >
                            <Plus className="h-4 w-4 mr-2"/>
                            New Goal
                        </Button>
                    }
                />

                {/* Goals Grid */}
                {goals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {goals.map((goal) => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onDelete={handleDeleteGoal}
                                onComplete={(id) => handleUpdateStatus(id, 'COMPLETED')}
                                onLogProgress={(goal) => {
                                    dispatch(setSelectedGoal(goal));
                                    setIsProgressModalOpen(true);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 animate-bounce">
                            <Target className="h-8 w-8 text-blue-600"/>
                        </div>
                        <h3 className="mt-4 text-xl font-medium text-gray-900">No goals yet</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Create your first learning goal to get started
                        </p>
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="mt-6"
                        >
                            <Plus className="h-4 w-4 mr-2"/>
                            Create Goal
                        </Button>
                    </div>
                )}
            </div>

            {/* Create Goal Modal */}
            {isCreateModalOpen && (
                <CreateGoalModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreate={handleCreateGoal}
                />
            )}

            {/* Progress Modal */}
            {isProgressModalOpen && selectedGoal && (
                <ProgressModal
                    goal={selectedGoal}
                    progress={progress}
                    onClose={() => setIsProgressModalOpen(false)}
                    onSubmit={handleLogProgress}
                />
            )}
        </div>
    );
};

export default Goals;