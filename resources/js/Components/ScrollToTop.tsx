import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(window.pageYOffset > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    onClick={scrollToTop}
                    className={`
                        fixed bottom-[25px] lg:bottom-[75px] right-4 md:bottom-8 md:right-8 z-50
                        p-3 rounded-full shadow-lg cursor-pointer
                        transition-all duration-300 ease-in-out group
                        bg-red-600 hover:bg-red-700
                        hover:shadow-xl text-white
                    `}
                    aria-label="Scroll to top"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronUp
                        className={`h-6 w-6 transition-transform duration-300
                            group-hover:-translate-y-1`}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
