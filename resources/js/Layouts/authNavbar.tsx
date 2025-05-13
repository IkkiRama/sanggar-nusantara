import React, {  memo } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const authNavbar = () => {
    
    return (
        <motion.nav
            className={`fixed w-full z-99 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-md dark:bg-gray-950` }
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

                </div>
            </div>

        </motion.nav>
    );
};

export default memo(authNavbar);
