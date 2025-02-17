import {useState, useEffect} from 'react';
import {Outlet, NavLink, useLocation} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {logout} from '../store/slices/authSlice';
import {
    LayoutDashboard,
    Target,
    Library,
    Menu,
    X,
    LogOut,
    Lightbulb,
    ChevronRight,
} from 'lucide-react';
import Button from './common/Button.tsx';
import {cn} from '../lib/utils.ts';
/**
 * @fileOverview A layout component that wraps the main content with a sidebar and header.
 * @returns The {@link JSX.Element} for the layout component.
 */
const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleLogout = async () => {
        await dispatch(logout());
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close sidebar on route change for mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const navItems = [
        {path: '/', icon: LayoutDashboard, label: 'Dashboard'},
        {path: '/goals', icon: Target, label: 'Goals'},
        {path: '/resources', icon: Library, label: 'Resources'},
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header - Glass Effect */}
            <header
                className={cn(
                    'lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    'backdrop-blur-md bg-white/80 border-b border-gray-200/50',
                    isScrolled && 'shadow-md'
                )}
            >
                <div className="px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-gray-100/80 rounded-lg transition-colors"
                        >
                            {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="relative group">
                                <div
                                    className="absolute inset-0 bg-blue-500 rounded-full blur-lg transform-gpu group-hover:scale-110 transition-transform duration-300 opacity-75"></div>
                                <div className="relative bg-white rounded-full p-2">
                                    <Lightbulb className="h-5 w-5 text-blue-600"/>
                                </div>
                            </div>
                            <span className="font-semibold text-xl">LearnFlow</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar with Glass Effect */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-40 w-64 transform-gpu transition-all duration-300 ease-in-out lg:translate-x-0',
                    'backdrop-blur-md bg-white/80 border-r border-gray-200/50',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="h-16 px-4 border-b border-gray-200/50 flex items-center space-x-3">
                        <div className="relative group">
                            <div
                                className="absolute inset-0 bg-blue-500 rounded-full blur-lg transform-gpu group-hover:scale-110 transition-transform duration-300 opacity-75"></div>
                            <div className="relative bg-white rounded-full p-2">
                                <Lightbulb className="h-5 w-5 text-blue-600"/>
                            </div>
                        </div>
                        <span className="font-semibold text-xl">LearnFlow</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1.5">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({isActive}) =>
                                    cn(
                                        'flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200',
                                        'group relative overflow-hidden',
                                        isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-100/50'
                                    )
                                }
                            >
                                {({isActive}) => (
                                    <>
                                        <div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        <item.icon
                                            size={20}
                                            className={cn(
                                                'transition-transform duration-200',
                                                'group-hover:scale-110'
                                            )}
                                        />
                                        <span>{item.label}</span>
                                        <ChevronRight
                                            size={16}
                                            className={cn(
                                                'ml-auto transition-transform duration-200',
                                                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                                                'group-hover:translate-x-1'
                                            )}
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Section with Glass Effect */}
                    <div className="p-4 border-t border-gray-200/50 backdrop-blur-sm bg-white/50">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="relative group">
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-lg transform-gpu group-hover:scale-110 transition-transform duration-300 opacity-50"></div>
                                <div
                                    className="relative h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center transform-gpu transition-transform duration-300 group-hover:scale-105">
                  <span className="text-white font-medium">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                                </div>
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-gray-900 truncate">{user?.name}</p>
                                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full justify-start group hover:border-red-200 hover:bg-red-50/50"
                            onClick={handleLogout}
                        >
                            <LogOut
                                size={18}
                                className="mr-2 text-gray-500 group-hover:text-red-500 transition-colors"
                            />
                            <span className="group-hover:text-red-600 transition-colors">Logout</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={cn(
                    'transition-all duration-300 ease-in-out',
                    'pt-16 lg:pt-0 lg:ml-64'
                )}
            >
                <div className="container mx-auto px-4 py-8 min-w-[280px]">
                    <Outlet/>
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;