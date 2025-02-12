import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchGoals} from '../store/slices/goalsSlice';
import {fetchRecommendations} from '../store/slices/resourcesSlice';
import {Target, Book, Trophy, ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import Button from '../components/ui/Button';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.auth);
    const {goals} = useAppSelector((state) => state.goals);
    const {recommendations} = useAppSelector((state) => state.resources);

    useEffect(() => {
        dispatch(fetchGoals());
        dispatch(fetchRecommendations());
    }, [dispatch]);

    const activeGoals = goals.filter((goal) => goal.status !== 'COMPLETED');
    const completedGoals = goals.filter((goal) => goal.status === 'COMPLETED');

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name}!
                </h1>
                <p className="mt-2 text-gray-600">
                    Track your progress and achieve your learning goals.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Goals</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {activeGoals.length}
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Target className="h-6 w-6 text-blue-600"/>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Resources</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {recommendations.length}
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
                            <Book className="h-6 w-6 text-green-600"/>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completed</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {completedGoals.length}
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-purple-600"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Goals */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Goals</h2>
                        <Link to="/goals">
                            <Button variant="ghost" size="sm">
                                View all
                                <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="divide-y divide-gray-200">
                    {activeGoals.slice(0, 3).map((goal) => (
                        <div key={goal.id} className="p-6">
                            <h3 className="font-medium text-gray-900">{goal.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        goal.status === 'ACTIVE'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {goal.status.replace('_', ' ')}
                </span>
                                <span className="text-sm text-gray-500">
                  Due {new Date(goal.targetDate).toLocaleDateString()}
                </span>
                            </div>
                        </div>
                    ))}
                    {activeGoals.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            No active goals. Start by creating one!
                        </div>
                    )}
                </div>
            </div>

            {/* Recommended Resources */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Recommended Resources
                        </h2>
                        <Link to="/resources">
                            <Button variant="ghost" size="sm">
                                View all
                                <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="divide-y divide-gray-200">
                    {recommendations.slice(0, 3).map((resource) => (
                        <div key={resource.id} className="p-6">
                            <h3 className="font-medium text-gray-900">{resource.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {resource.description}
                            </p>
                            <div className="mt-4">
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Learn more →
                                </a>
                            </div>
                        </div>
                    ))}
                    {recommendations.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            No recommendations available yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;