'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const SubTabs = ({
  mode,
  activeTab,
  setActiveTab,
}: {
  mode: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
}) => {
  return (
    <Tabs
      defaultValue={mode === 'banner' ? 'blurb' : 'bold'}
      value={activeTab}
      onValueChange={setActiveTab}
      className=''
    >
      <motion.div
        className='glassmorphism w-max p-2 !-mt-6 mb-2 h-auto rounded-xl'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TabsList className='flex w-max bg-transparent'>
          <TabsTrigger
            value={mode === 'banner' ? 'blurb' : 'bold'}
            className='data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white px-4 sm:px-10 py-2 transition-all duration-300'
          >
            {mode === 'splash'
              ? 'Bold and Flashy'
              : mode === 'email'
              ? 'Bold and Flashy (Marketing Magic)'
              : 'Hercu/PowerBlurb'}
          </TabsTrigger>
          <TabsTrigger
            value={mode === 'banner' ? 'banner' : 'cozy'}
            className='data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white px-4 sm:px-10 py-2 transition-all duration-300'
          >
            {mode === 'splash'
              ? 'Clean and Corporate'
              : mode === 'email'
              ? 'Cozy and Personal (Human Tone)'
              : 'Banner Ad'}
          </TabsTrigger>
        </TabsList>
      </motion.div>
    </Tabs>
  );
};

export default SubTabs;
