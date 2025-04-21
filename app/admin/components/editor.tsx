'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Wand2,
  RefreshCw,
  Copy,
  ExternalLink,
  X,
  Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification, useNotification } from '@/components/ui/notification';
import useAppStore from '@/lib/store';
import { savePrompt, saveModel } from '@/lib/api/splash';

type Model = {
  model_name: string;
  temperature: number;
};

export default function Editor({
  mode,
}: {
  mode: 'splash' | 'email' | 'banner';
}) {
  const [subMode, setSubMode] = useState<'generate' | 'update'>('generate');
  const [prompt, setPrompt] = useState<string>('');
  const [model, setModel] = useState<Model>({
    model_name: '',
    temperature: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  // Notification system
  const { notification, showNotification, hideNotification } =
    useNotification();
  const { models, prompts } = useAppStore();

  useEffect(() => {
    console.log('Data in splash: ', models, prompts);
    if (prompts && models) {
      initializeValues();
    }
  }, [models, prompts]);

  const initializeValues = () => {
    if (mode === 'splash') {
      console.log('splash_prompt: ', prompts.splash_page);
      // console.log(prompts);
      setPrompt(prompts.splash_page);
      setModel(models.splash_page);
      return;
    }
    if (mode === 'email') {
      if (subMode === 'generate') {
        console.log('email_generation_prompt: ', prompts.email_generation);
        setPrompt(prompts.email_generation);
        setModel(models.email);
        return;
      }
      if (subMode === 'update') {
        console.log('email_generation_prompt: ', prompts.email_generation);
        setPrompt(prompts.email_generation);
        setModel(models.email);
        return;
      }
    }
    if (mode === 'banner') {
      console.log('banner_prompt: ', prompts.banner);
      // console.log(prompts);
      setPrompt(prompts.banner);
      setModel(models.banners);
      return;
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleModelChange = (val: string) => {
    setModel((prev) => ({ ...prev, model_name: val }));
  };

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0 && val <= 1) {
      setModel((prev) => ({ ...prev, temperature: val }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveNewData();
    }
  };

  const saveNewData = async () => {
    if (mode === 'splash') {
      const promptRes = await savePrompt({
        mode: 'splash_page',
        prompt,
      });
      console.log(promptRes);
      const modelRes = await saveModel({ mode: 'splash_page', model });
      console.log(modelRes);
      return;
    }
    if (mode === 'email') {
      if (subMode === 'generate') {
        const promptRes = await savePrompt({
          mode: 'email_generation',
          prompt,
        });
        console.log(promptRes);
        const modelRes = await saveModel({ mode: 'email', model });
        console.log(modelRes);
        return;
      }
      if (subMode === 'update') {
        const promptRes = await savePrompt({
          mode: 'email_refinement',
          prompt,
        });
        console.log(promptRes);
        const modelRes = await saveModel({ mode: 'email', model });
        console.log(modelRes);
        return;
      }
    }
    if (mode === 'banner') {
      const promptRes = await savePrompt({
        mode: 'banner',
        prompt,
      });
      console.log(promptRes);
      const modelRes = await saveModel({ mode: 'banner', model });
      console.log(modelRes);
      return;
    }
  };

  return (
    <div className='space-y-8 mb-4'>
      {/* Notification component */}
      <Notification
        type={notification.type}
        message={notification.message}
        isOpen={notification.isOpen}
        onClose={hideNotification}
      />

      {/* User Input Form */}
      <AnimatePresence mode='wait'>
        {!isLoading ? (
          <motion.div
            key='input-form'
            className='glassmorphism p-4 sm:p-8 rounded-xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className='w-max small:w-full relative mb-6'>
              <div className='flex small:flex-col flex-row gap-4 small:gap-0 items-center justify-between w-full relative'>
                {/* Tabs */}
                <button
                  onClick={() => setSubMode('generate')}
                  className={`relative z-10 px-4 py-2 transition-all duration-300 w-full sm:w-auto text-center ${
                    subMode === 'generate'
                      ? 'text-blue-400 font-semibold'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Generation Prompt
                </button>

                {/* OR separator */}
                <div className='text-gray-500 font-medium select-none'>
                  - OR -
                </div>

                <button
                  onClick={() => setSubMode('update')}
                  className={`relative z-10 px-4 py-2 transition-all duration-300 w-full sm:w-auto text-center ${
                    subMode === 'update'
                      ? 'text-blue-400 font-semibold'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Updation Prompt
                </button>

                {/* Animated underline - only visible on desktop */}
                <div
                  className='absolute bottom-0 h-[2px] bg-blue-400 transition-all duration-300 small:hidden block'
                  style={{
                    left: subMode === 'generate' ? '0%' : 'calc(100% - 154px)',
                    width: subMode === 'generate' ? '175px' : '150px',
                  }}
                ></div>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-4 mb-6'>
              <motion.div
                className='mb-6 relative space-y-6'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.3,
                  height: {
                    duration: 0.3,
                  },
                  opacity: {
                    duration: 0.2,
                  },
                }}
              >
                <div>
                  <Label
                    htmlFor='query'
                    className='block mb-2 font-semibold text-blue-300'
                  >
                    Prompt
                  </Label>
                  <Textarea
                    id='prompt'
                    value={prompt}
                    onChange={handlePromptChange}
                    onKeyDown={handleKeyDown}
                    placeholder={`Enter your prompt`}
                    rows={3}
                    className={`w-full p-4 bg-gray-800 rounded-lg border border-gray-600 transition-all duration-200`}
                  />
                </div>
                <div className='space-y-4'>
                  <div>
                    <Label
                      htmlFor='query'
                      className='block mb-2 font-semibold text-blue-300'
                    >
                      Model
                    </Label>
                    <Select
                      value={model?.model_name}
                      onValueChange={handleModelChange}
                    >
                      <SelectTrigger className='w-full p-3 bg-gray-800 border border-gray-600 text-white'>
                        <SelectValue placeholder='Select model' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='gpt-4o'>gpt-4o</SelectItem>

                        <SelectItem value='gpt-4o-mini'>gpt-4o-mini</SelectItem>
                        <SelectItem value='gpt-3o-mini'>gpt-3o-mini</SelectItem>

                        <SelectItem value='o3-mini'>o3-mini</SelectItem>
                        <SelectItem value='o4-mini'>o4-mini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor='query'
                      className='block mb-2 font-semibold text-blue-300'
                    >
                      Tempurature
                    </Label>
                    <Input
                      id='temperature'
                      type='number'
                      min={0}
                      max={1}
                      step={0.01}
                      value={model?.temperature}
                      onChange={handleTemperatureChange}
                      className='w-full p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={saveNewData}
                disabled={isLoading}
                className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300'
              >
                <Wand2 className='mr-2 h-4 w-4' /> Save Changes
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key='loading'
            className='flex flex-col items-center justify-center my-12'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4'></div>
            <p className='text-xl text-blue-300 [text-shadow:none]'>
              {'Fetching'} data
              <span className='animate-pulse'>.</span>
              <span
                className='animate-pulse'
                style={{ animationDelay: '0.2s' }}
              >
                .
              </span>
              <span
                className='animate-pulse'
                style={{ animationDelay: '0.4s' }}
              >
                .
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
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
                Poof! All your current work will vanish so you can start
                something brand new. Ready to begin again?
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
    </div>
  );
}
