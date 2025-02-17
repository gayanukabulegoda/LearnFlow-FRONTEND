import {useEffect, useState, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {
    fetchRecommendations,
    trackInteraction,
} from '../store/slices/resourcesSlice.ts';
import {
    ExternalLink,
    FileText,
    Video,
    Code,
    File,
    Search,
    RefreshCw,
    Lightbulb,
    Filter,
} from 'lucide-react';
import Button from '../components/common/Button.tsx';
import Input from '../components/common/Input.tsx';
import {cn} from '../lib/utils.ts';
import Card from "../components/common/Card.tsx";
import PageHeader from "../components/common/PageHeader.tsx";
/**
 * @fileoverview The Resources page component: displays a list of curated resources for learning.
 * @feature Filter resources by type and search for specific resources.
 * @feature Track user interactions with resources.
 * @exports Resources - The Resources page component.
 */
const Resources = () => {
    const dispatch = useAppDispatch();
    const {recommendations, isLoading} = useAppSelector(
        (state) => state.resources
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchRecommendations());
    }, [dispatch]);

    const handleResourceView = async (id: number) => {
        await dispatch(
            trackInteraction({
                recommendationId: id,
                type: 'VIEW',
            })
        );
    };

    const getResourceIcon = (type: string) => {
        switch (type.toUpperCase()) {
            case 'DOCUMENTATION':
                return <FileText className="h-5 w-5"/>;
            case 'VIDEO':
                return <Video className="h-5 w-5"/>;
            case 'TUTORIAL':
                return <Code className="h-5 w-5"/>;
            default:
                return <File className="h-5 w-5"/>;
        }
    };

    const getResourceTypeColor = (type: string) => {
        switch (type.toUpperCase()) {
            case 'DOCUMENTATION':
                return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'VIDEO':
                return 'bg-red-50 text-red-600 border-red-100';
            case 'TUTORIAL':
                return 'bg-green-50 text-green-600 border-green-100';
            default:
                return 'bg-blue-50 text-blue-600 border-blue-100';
        }
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedType('');
    };

    const filteredRecommendations = useMemo(() => {
        return recommendations.filter((resource) => {
            const matchesSearch =
                searchTerm === '' ||
                resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.reason.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType =
                selectedType === '' ||
                resource.type.toUpperCase() === selectedType.toUpperCase();

            return matchesSearch && matchesType;
        });
    }, [recommendations, searchTerm, selectedType]);

    const uniqueTypes = useMemo(() => {
        return Array.from(new Set(recommendations.map(r => r.type)));
    }, [recommendations]);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -mt-8 -mx-4 sm:-mx-6 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header with Search and Filters */}
                <div className="relative z-10">
                    <PageHeader
                        title="Learning Resources"
                        subtitle="Discover curated resources to enhance your learning journey"
                        gradient="from-purple-400 to-blue-400"
                        headerContent={
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                {/* Search and filter components */}
                                <div className="relative flex-1 sm:flex-none">
                                    <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        type="text"
                                        placeholder="Search resources..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9 w-full sm:w-64"
                                    />
                                </div>
                                <div className="relative">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className="w-full sm:w-auto"
                                    >
                                        <Filter className="h-4 w-4 mr-2"/>
                                        Filter
                                    </Button>
                                    {isFilterOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                            <div className="px-3 py-2 text-sm font-medium text-gray-700">Resource Type
                                            </div>
                                            <div className="divide-y divide-gray-100">
                                                <button
                                                    onClick={() => {
                                                        setSelectedType('');
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className={cn(
                                                        "w-full px-4 py-2 text-sm text-left hover:bg-gray-50",
                                                        !selectedType && "text-blue-600 bg-blue-50"
                                                    )}
                                                >
                                                    All Types
                                                </button>
                                                {uniqueTypes.map((type) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => {
                                                            setSelectedType(type);
                                                            setIsFilterOpen(false);
                                                        }}
                                                        className={cn(
                                                            "w-full px-4 py-2 text-sm text-left hover:bg-gray-50",
                                                            selectedType === type && "text-blue-600 bg-blue-50"
                                                        )}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {(searchTerm || selectedType) && (
                                    <Button
                                        onClick={resetFilters}
                                        variant="outline"
                                        className="flex-none"
                                    >
                                        <RefreshCw className="h-4 w-4 mr-2"/>
                                        Reset
                                    </Button>
                                )}
                            </div>
                        }
                    />
                </div>

                {/* Resources Grid */}
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div
                            className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"/>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredRecommendations.map((resource) => (
                            <Card key={resource.id}>
                                <div className="relative flex items-start justify-between">
                                    <div
                                        className={`p-2 rounded-lg ${getResourceTypeColor(resource.type)} transform-gpu transition-transform group-hover:scale-110`}>
                                        {getResourceIcon(resource.type)}
                                    </div>
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded-full ${getResourceTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                                </div>

                                <h3 className="relative mt-4 text-lg font-semibold text-gray-900 line-clamp-2">
                                    {resource.title}
                                </h3>
                                <p className="relative mt-2 text-sm text-gray-500 line-clamp-2">
                                    {resource.reason}
                                </p>

                                <div className="relative mt-4 flex items-center justify-end">
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleResourceView(resource.id)}
                                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 group/link"
                                    >
                                        <span>View Resource</span>
                                        <ExternalLink
                                            className="ml-1 h-4 w-4 transform-gpu transition-transform group-hover/link:translate-x-1 group-hover/link:rotate-12"/>
                                    </a>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredRecommendations.length === 0 && (
                    <Card hover={false}>
                        <div className="text-center">
                            <div
                                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4 animate-bounce">
                                <Lightbulb className="h-6 w-6 text-blue-600"/>
                            </div>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                                No recommendations found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm || selectedType
                                    ? 'Try adjusting your search criteria'
                                    : 'Start by adding some learning custom to get personalized recommendations'}
                            </p>
                            {(searchTerm || selectedType) && (
                                <Button
                                    onClick={resetFilters}
                                    variant="outline"
                                    className="mt-4"
                                >
                                    <RefreshCw className="h-4 w-4 mr-2"/>
                                    Reset Filters
                                </Button>
                            )}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Resources;