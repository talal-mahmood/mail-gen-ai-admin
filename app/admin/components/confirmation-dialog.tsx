'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  // Notification,
  NotificationType,
} from '@/components/ui/notification';

const ConfirmationDialog = ({
  open,
  showNotification,
}: {
  open: boolean;
  showNotification: (
    type: NotificationType,
    message: string,
    position?: 'top' | 'bottom'
  ) => void;
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {}, [open]);

  return (
    <AnimatePresence>
      {showConfirmation && (
        <motion.div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowConfirmation(false)}
        >
          <motion.div
            className='bg-gray-800 p-6 rounded-lg max-w-md w-full'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-2'>
              <h3 className='text-lg font-semibold text-white'>
                Clear the Slate?
              </h3>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setShowConfirmation(false)}
                className='h-8 w-8 rounded-full hover:bg-gray-700'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
            <p className='text-gray-300 text-base mb-6 [text-shadow:none]'>
              Poof! All your current work will vanish so you can start something
              brand new. Ready to begin again?
            </p>
            <div className='flex justify-end gap-3'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant='outline'
                  onClick={() => setShowConfirmation(false)}
                  className='text-red-500 bg-transparent border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200'
                >
                  Cancel
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    setShowConfirmation(false);
                    showNotification('info', 'No changes were made!');
                  }}
                  className='bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300'
                >
                  Confirm
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;
