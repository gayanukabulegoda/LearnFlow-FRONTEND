import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
    fetchRecommendations,
    trackInteraction,
} from '../store/slices/resourcesSlice';
import {ExternalLink, BookOpen, Video, Code, File} from 'lucide-react';

const Resources = () => {
    const dispatch = useAppDispatch();
    const {recommendations, isLoading} = useAppSelector(
        (state) => state.resources
    );

    useEffect(() => {
        dispatch(fetchRecommendations());
    }, [dispatch]);

    const handleResourceClick = async (id: number) => {
        await dispatch(
            trackInteraction({
                recommendationId: id,
                type: 'CLICK',
            })
        );
    };

    const getResourceIcon = (type: string) => {
        switch (type.toUpperCase()) {
            case 'ARTICLE':
                return <BookOpen className="h-5 w-5"/>;
            case 'VIDEO':
                return <Video className="h-5 w-5"/>;
            case 'TUTORIAL':
                return <Code className="h-5 w-5"/>;
            default:
                return <File className="h-5 w-5"/>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Learning Resources</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Personalized recommendations based on your learning goals
                </p>
            </div>

            {/* Resources Grid */}
            {isLoading ? (
                <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"/>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((resource) => (
                        <div
                            key={resource.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className={`p-2 rounded-lg ${
                                        resource.type === 'ARTICLE'
                                            ? 'bg-blue-50 text-blue-600'
                                            : resource.type === 'VIDEO'
                                                ? 'bg-red-50 text-red-600'
                                                : 'bg-green-50 text-green-600'
                                    }`}
                                >
                                    {getResourceIcon(resource.type)}
                                </div>
                                <span className="text-xs font-medium text-gray-500 uppercase">
                  {resource.type}
                </span>
                            </div>
                            <h3 className="mt-4 font-medium text-gray-900">{resource.title}</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                {resource.description}
                            </p>
                            <div className="mt-4">
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleResourceClick(resource.id)}
                                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                                >
                                    View Resource
                                    <ExternalLink className="ml-2 h-4 w-4"/>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!isLoading && recommendations.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400"/>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No recommendations yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Start by adding some learning goals to get personalized recommendations
                    </p>
                </div>
            )}
        </div>
    );
};

export default Resources;