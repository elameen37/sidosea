'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface SaveDialogProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

export default function SaveDialog({ isOpen, onClose, message = "Changes saved successfully!" }: SaveDialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-[60]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] bg-white rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md text-center"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-300 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring", damping: 15 }}
                            className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle size={40} className="text-green-500" />
                        </motion.div>

                        <h3 className="text-xl font-bold text-brand-navy uppercase tracking-tight mb-2">Saved</h3>
                        <p className="text-gray-500 text-sm">{message}</p>

                        <button
                            onClick={onClose}
                            className="mt-6 w-full py-3 bg-brand-navy text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brand-orange transition-all"
                        >
                            Continue
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
