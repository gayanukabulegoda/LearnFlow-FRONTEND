import {useState} from 'react';
import {Outlet, NavLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {logout} from '../store/slices/authSlice';
import {
    LayoutDashboard,
    Target,
    Library,
    Menu,
    X,
    LogOut,
    Lightbulb
} from 'lucide-react';
import Button from './ui/Button';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        {path: '/', icon: LayoutDashboard, label: 'Dashboard'},
        {path: '/goals', icon: Target, label: 'Goals'},
        {path: '/resources', icon: Library, label: 'Resources'},
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
                <div className="px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
                        </button>
                        <div className="flex items-center space-x-2">
                            <Lightbulb className="h-6 w-6 text-blue-600"/>
                            <span className="font-semibold text-xl">LearnFlow</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="h-16 px-4 border-b border-gray-200 flex items-center space-x-2">
                        <Lightbulb className="h-6 w-6 text-blue-600"/>
                        <span className="font-semibold text-xl">LearnFlow</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({isActive}) =>
                                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <item.icon size={20}/>
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Section */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                    <img src="/learnFlowIcon.svg" className="w-6 h-6" alt="learnFlow Icon"/>
                </span>
                            </div>
                            <div>
                                <p className="font-medium">{user?.name}</p>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} className="mr-2"/>
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`transition-all duration-200 ease-in-out ${
                    isSidebarOpen ? 'lg:ml-64' : ''
                } pt-16 lg:pt-0 lg:ml-64`}
            >
                <div className="container mx-auto px-4 py-8">
                    <Outlet/>
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;