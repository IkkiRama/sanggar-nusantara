import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FaHome, FaTimes, FaBars,
    FaUser, FaUserCircle, FaSignOutAlt,
    FaBookOpen,
    FaTicketAlt,
    FaSun,
    FaMoon,
    FaShoppingBag
} from 'react-icons/fa';

import { FaEarthAsia } from 'react-icons/fa6';
import { useAuth } from '../Hooks/useAuth';


const NAV_ITEMS = [
    { path: '/', label: 'Beranda', icon: FaHome },
    { path: '/event', label: 'Event', icon: FaTicketAlt },
    { path: '/ragam-indonesia', label: 'Ragam Indonesia', icon: FaEarthAsia },
    { path: '/artikel', label: 'Artikel', icon: FaBookOpen },
];

// const BOTTOM_NAV_ITEMS = [
//     { path: '/', label: 'Beranda', icon: FaHome },
//     {
//         id: 'about',
//         label: 'Tentang',
//         icon: FaInfoCircle,
//         dropdown: [
//             { path: '/genbi-point', label: 'GenBI Point', icon: FaStar },
//             { path: '/tentang', label: 'Tentang GenBI', icon: FaInfoCircle },
//             { path: '/organisasi', label: 'Organisasi', icon: FaBuilding }
//         ]
//     },
//     {
//         id: 'media',
//         label: 'Media',
//         icon: FaFolder,
//         dropdown: [
//             { path: '/artikel', label: 'Artikel', icon: BookOpen },
//             { path: '/podcast', label: 'Podcast', icon: FaPodcast }
//         ]
//     },
//     { path: '/contact', label: 'Kontak', icon: FaEnvelope }
// ];

// Memoized Components
//@ts-ignore
const MobileMenuItem = memo(({ href, icon: Icon, label, isDark, onClick, isActive }) => (
    <Link
    //@ts-ignore
        href={href}
        className={`flex items-center space-x-3 p-3 rounded-xl ${
            isActive
                ? 'bg-red-600 text-white'
                : isDark
                    ? 'text-gray-300 hover:bg-gray-800/60'
                    : 'text-gray-700 hover:bg-gray-100'
        } transition-all duration-200`}
        onClick={onClick}
    >
        <div className={`size-9 rounded-xl flex items-center justify-center ${
            isActive
                ? 'bg-red-500'
                : isDark ? 'bg-gray-800/80' : 'bg-gray-100'
        }`}>
            <Icon className="w-5 h-5" />
        </div>
        <span className="font-medium dark:text-gray-200">{label}</span>
    </Link>
));

// Desktop Navigation Item
//@ts-ignore
const DesktopNavItem = memo(({ item, isActive, isDark, activeDropdown, onDropdownToggle }) => {
    const hasDropdown = item.dropdown;

    if (hasDropdown) {
        return (
            <div className="relative">
                <button
                    onClick={() => onDropdownToggle(item.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                        isActive
                            ? ' text-red-500'
                            : isDark
                                ? 'text-gray-300 hover:bg-gray-700'
                                : 'text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <item.icon className="mr-2" />
                    {item.label}
                    <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.id ? 'rotate-180' : ''
                    }`} />
                </button>

                <AnimatePresence>
                    {activeDropdown === item.id && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`absolute left-0 mt-2 w-48 rounded-xl shadow-lg py-1 border ${
                                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                            }`}
                        >
                            {item.dropdown.map((dropItem) => (
                                <Link
                                    key={dropItem.path}
                                    href={dropItem.path}
                                    className={`flex items-center space-x-3 px-4 py-2 text-sm ${
                                        isDark
                                            ? 'text-gray-300 hover:bg-gray-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <dropItem.icon className="w-4 h-4" />
                                    <span>{dropItem.label}</span>
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <Link
            href={item.path}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center ${
                isActive
                    ? 'text-red-500'
                    : isDark
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
            <item.icon className="mr-2" />
            {item.label}
        </Link>
    );
});


const Navbar = ({user, cartCount}) => {
    // const { user, loading } = useAuth();

    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    // const { isDark, toggleTheme } = useTheme();

    // Check if current path matches any dropdown item
    const isDropdownItemActive = useCallback((dropdownItems) => {
        return dropdownItems?.some(item => url.startsWith(item.path));
    }, [url]);

    // Check if path is active
    const isPathActive = useCallback((path) => {
        return  path === '/' ? url === path : url.startsWith(path);
    }, [url]);

    // Scroll handler with debounce
    useEffect(() => {
        let timeoutId;
        const handleScroll = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsScrolled(window.scrollY > 20);
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
        if (isProfileOpen) setIsProfileOpen(false);
        setActiveDropdown(null);
    }, [isProfileOpen]);

    const toggleDropdown = useCallback((dropdownId) => {
        setActiveDropdown(prev => prev === dropdownId ? null : dropdownId);
    }, []);

    const handleItemClick = useCallback(() => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
        setIsProfileOpen(false);
    }, []);

    return (
        <>
            {/* Main Navbar */}
            <motion.nav
                className={`fixed w-full z-99 top-0 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white/80 backdrop-blur-md shadow-md dark:bg-gray-950'
                        : 'bg-transparent'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h2
                                className="flex items-center text-[#111] font-semibold md:text-xl dark:text-white text-sm"
                            >
                                <Link href={"/"}>Sanggar Nusantara</Link>
                            </h2>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex">
                            <div className={`flex space-x-1 bg-white/80 backdrop-blur-md rounded-xl p-1 shadow-lg`}>
                                {NAV_ITEMS.map((item, index) => (
                                    <DesktopNavItem
                                        key={index || item.path}
                                        //@ts-ignore
                                        item={item}
                                        isActive={item.dropdown
                                            ? isDropdownItemActive(item.dropdown)
                                            : isPathActive(item.path)
                                        }
                                        activeDropdown={activeDropdown}
                                        onDropdownToggle={toggleDropdown}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop Auth Section */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {/* Theme Toggle */}
                            {/* <button
                                // onClick={toggleTheme}
                                className={`p-2 rounded-full transition-all duration-200 bg-white/80 text-blue-600 hover:bg-gray-100 shadow-lg`}
                                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                            >
                                {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                            </button> */}
                            {/* <ThemeToggle /> */}

                            {user ? (
                                <div className="relative">
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href="/keranjang"
                                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center bg-white/80 text-gray-700 hover:bg-gray-100 shadow-lg`}
                                        >
                                            <FaShoppingBag className="w-[20px] h-[20px]" />

                                            <span className="absolute -top-1 right-[-10px] bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                                                {cartCount ? cartCount : 0}
                                            </span>
                                        </Link>
                                        <button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className={`cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-white/80 text-blue-600 hover:bg-blue-50 shadow-lg`}
                                        >
                                            <FaUserCircle className="w-5 h-5" />
                                            <span>{user.name}</span>
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-2 border bg-white border-gray-100`}
                                            >
                                                <Link
                                                    href="/profile/dashboard"
                                                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50`}
                                                >
                                                    <FaUser className="inline-block mr-2" />
                                                    Profile
                                                </Link>
                                                <a
                                                    href="/logout"
                                                    className={`block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50`}
                                                >
                                                    <FaSignOutAlt className="inline-block mr-2" />
                                                    Logout
                                                </a>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <>
                                    {/* <Link
                                        href="/admin/login"
                                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-white/80 text-red-600 hover:bg-blue-50 shadow-lg`}
                                    >
                                        Daftar
                                    </Link> */}
                                    <a
                                        href="/admin/login"
                                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 text-white bg-red-500 hover:bg-red-400 shadow-lg`}
                                    >
                                        Masuk
                                    </a>
                                </>
                            )}



                            {/* <Link
                                href="/admin/login"
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-white/80 text-red-600 hover:bg-blue-50 shadow-lg`}
                            >
                                Daftar
                            </Link>
                            <Link
                                href="/admin/login"
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 text-white bg-red-500 hover:bg-blue-50 shadow-lg`}
                            >
                                Masuk
                            </Link> */}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center space-x-2">
                            {/* <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-all duration-200 bg-white/80 text-blue-600 shadow-lg`}
                                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                            >
                                {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                            </button> */}

                            <Link
                                href="/keranjang"
                                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center text-gray-700`}
                            >
                                <FaShoppingBag className="w-[20px] h-[20px]" />

                                <span className="absolute -top-1 right-[-10px] bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                                    99+
                                </span>
                            </Link>

                            <button
                                onClick={toggleMenu}
                                className={`p-2 rounded-full text-gray-700 cursor-pointer`}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <FaTimes className="h-6 w-6 dark:text-gray-200" />
                                ) : (
                                    <FaBars className="h-6 w-6 dark:text-gray-200" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className={`px-4 py-6 bg-white/95 backdrop-blur-lg dark:bg-gray-900/95 dark:border-t dark:border-gray-800`}
                            >
                                <div className="space-y-6">
                                    {/* Menu Items */}
                                    <div className="space-y-2">
                                        {NAV_ITEMS.map((item) => (
                                            <div key={item.id || item.path}>
                                                {item.dropdown ? (
                                                    <div className="space-y-2">
                                                        <motion.button
                                                            onClick={() => toggleDropdown(item.id)}
                                                            className={`w-full flex items-center justify-between p-3 rounded-xl ${
                                                                isDropdownItemActive(item.dropdown)
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'text-gray-700 hover:bg-gray-100'
                                                            } transition-all duration-200`}
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <div className={`size-9 rounded-xl flex items-center justify-center ${
                                                                    isDropdownItemActive(item.dropdown)
                                                                        ? 'bg-blue-500'
                                                                        : 'bg-gray-100'
                                                                }`}>
                                                                    <item.icon className="w-5 h-5" />
                                                                </div>
                                                                <span className="font-medium dark:text-gray-200">{item.label}</span>
                                                            </div>
                                                            <motion.div
                                                                animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <ChevronDown className="w-5 h-5" />
                                                            </motion.div>
                                                        </motion.button>

                                                        <AnimatePresence>
                                                            {activeDropdown === item.id && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: -10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0, y: -10 }}
                                                                    className="pl-5 space-y-2"
                                                                >
                                                                    {item.dropdown.map((dropItem) => (
                                                                        <MobileMenuItem
                                                                            key={dropItem.path}
                                                                            //@ts-ignore
                                                                            href={dropItem.path}
                                                                            icon={dropItem.icon}
                                                                            label={dropItem.label}
                                                                            onClick={handleItemClick}
                                                                            isActive={url.startsWith(dropItem.path)}
                                                                        />
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ) : (
                                                    <MobileMenuItem
                                                    //@ts-ignore
                                                        href={item.path}
                                                        icon={item.icon}
                                                        label={item.label}
                                                        onClick={handleItemClick}
                                                        isActive={isPathActive(item.path)}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mobile Auth Section */}
                                    <div className={`pt-4 border-t border-gray-200`}>
                                        {user ? (
                                            <div className="space-y-2">
                                                <MobileMenuItem
                                                //@ts-ignore
                                                    href="/profile/dashboard"
                                                    icon={FaUser}
                                                    label="Profile"
                                                    onClick={handleItemClick}
                                                    isActive={url === '/profile/dashboard'}
                                                />
                                                <a
                                                    href="/logout"
                                                    onClick={handleItemClick}
                                                    className={`w-full flex items-center space-x-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200`}
                                                >
                                                    <div className={`size-9 rounded-xl flex items-center justify-center bg-red-50`}>
                                                        <FaSignOutAlt className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-medium">Logout</span>
                                                </a>
                                            </div>
                                        ) : (
                                            <a
                                                href="/admin/login"
                                                className={`flex items-center space-x-3 p-3 rounded-xl text-blue-600 hover:bg-blue-50 transition-all duration-200`}
                                                onClick={handleItemClick}
                                            >
                                                <div className={`size-9 rounded-xl flex items-center justify-center bg-blue-50`}>
                                                    <FaUser className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium">daftar</span>
                                            </a>
                                        )}

                                        {/* <Link
                                            href="/admin/login"
                                            className={`flex items-center space-x-3 p-3 rounded-xl text-blue-600 hover:bg-blue-50 transition-all duration-200`}
                                            onClick={handleItemClick}
                                        >
                                            <div className={`size-9 rounded-xl flex items-center justify-center bg-blue-50`}>
                                                <FaUser className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium">daftar</span>
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>



            {/* Click Away Listener */}
            {(isProfileOpen || isMenuOpen || activeDropdown) && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    onClick={() => {
                        setIsProfileOpen(false);
                        setIsMenuOpen(false);
                        setActiveDropdown(null);
                    }}
                />
            )}
        </>
    );
};

export default memo(Navbar);
