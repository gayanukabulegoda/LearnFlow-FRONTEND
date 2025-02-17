import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchGoals} from '../store/slices/goalsSlice';
import {fetchRecommendations} from '../store/slices/resourcesSlice';
import {
    Target,
    Book,
    Trophy,
    ArrowRight,
    Rocket,
    TrendingUp,
    Clock,
} from 'lucide-react';
import StatCard from "../components/custom/StatCard.tsx";
import CardListSection from "../components/custom/CardListSection.tsx";
import PageHeader from "../components/common/PageHeader.tsx";
/**
 * @fileOverview The Dashboard component: used to display user stats, goals, and resources.
 * @exports Dashboard - The Dashboard component.
 */
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

    const stats = [
        {
            title: 'Active Goals',
            value: activeGoals.length,
            icon: Target,
            color: 'blue',
            bgImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
        },
        {
            title: 'Learning Resources',
            value: recommendations.length,
            icon: Book,
            color: 'green',
            bgImage: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&q=80',
        },
        {
            title: 'Completed Goals',
            value: completedGoals.length,
            icon: Trophy,
            color: 'purple',
            bgImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
        },
    ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -mt-8 -mx-4 sm:-mx-6 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <PageHeader
                    title={`Welcome back, ${user?.name}! 👋`}
                    subtitle="Your learning journey continues. Let's achieve more today!"
                    gradient="from-blue-400 to-indigo-400"
                    headerContent={
                        <div className="hidden sm:block">
                            <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80"
                                alt="Learning"
                                className="w-24 h-24 object-cover rounded-lg shadow-md transform-gpu rotate-3 hover:rotate-0 transition-transform duration-300"
                            />
                        </div>
                    }
                />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {stats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>

                {/* Recent Goals and Resources Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CardListSection
                        title="Recent Goals"
                        icon={Rocket}
                        items={activeGoals}
                        viewAllLink="/goals"
                        iconColor="blue"
                        emptyState={{
                            icon: Target,
                            message: "No active custom. Start by creating one!",
                        }}
                        renderItem={(goal) => (
                            <>
                                <div className="flex items-start justify-between">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-medium text-gray-900 truncate">{goal.title}</h3>
                                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{goal.description}</p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            goal.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {goal.status.replace('_', ' ')}
                    </span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-xs text-gray-500">
                                    <Clock className="h-4 w-4 mr-1"/>
                                    Due {new Date(goal.targetDate).toLocaleDateString()}
                                </div>
                            </>
                        )}
                    />

                    <CardListSection
                        title="Recommended Resources"
                        icon={TrendingUp}
                        items={recommendations}
                        viewAllLink="/resources"
                        iconColor="purple"
                        emptyState={{
                            icon: Book,
                            message: "No recommendations available yet.",
                        }}
                        renderItem={(resource) => (
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div
                                        className={`p-2 rounded-lg ${resource.type === 'video' ? 'bg-red-50' : 'bg-green-50'}`}>
                                        {resource.type === 'video' ? (
                                            <Book className="h-5 w-5 text-red-600"/>
                                        ) : (
                                            <Book className="h-5 w-5 text-green-600"/>
                                        )}
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">{resource.title}</h3>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{resource.reason}</p>
                                    <div className="mt-2">
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 group"
                                        >
                                            Learn more
                                            <ArrowRight
                                                className="ml-1 h-4 w-4 transform-gpu transition-transform group-hover:translate-x-1"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;