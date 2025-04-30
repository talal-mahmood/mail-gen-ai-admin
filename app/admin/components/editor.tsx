'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification, useNotification } from '@/components/ui/notification';
import useAppStore from '@/lib/store';
import { savePrompt, saveModel, getAllPrompts, getAllModels } from '@/lib/api';
import EditorForm from './editor-form';
import SubTabs from './sub-tabs';

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
  const [activeTab, setActiveTab] = useState<string>(
    mode === 'banner' ? 'blurb' : 'bold'
  );

  const [isLoading, setIsLoading] = useState(true);
  // Notification system
  const { notification, showNotification, hideNotification } =
    useNotification();
  const { models, prompts, setModels, setPrompts } = useAppStore();

  const initializeValues = () => {
    if (mode === 'splash') {
      console.log('---------------here---------------');
      console.log(prompt);
      // console.log(
      //   'mode is: ',
      //   mode,
      //   'subMode is: ',
      //   subMode,
      //   'activeTab is: ',
      //   activeTab
      // );
      if (activeTab === 'bold') {
        console.log('still here');
        console.log(
          'splash_page_casual prompt: ',
          prompts.splash_page_casual || ''
        );
        // console.log(prompts);
        setPrompt(prompts.splash_page_casual || '');
        setModel(
          models.splash_page || {
            model_name: '',
            temperature: 0,
          }
        );
        return;
      }
      if (activeTab === 'cozy') {
        console.log('not there');
        console.log(
          'splash_page_professional prompt: ',
          prompts.splash_page_professional || ''
        );
        // console.log(prompts);
        setPrompt(prompts.splash_page_professional || '');
        setModel(
          models.splash_page || {
            model_name: '',
            temperature: 0,
          }
        );
        return;
      }
    }
    if (mode === 'email') {
      if (activeTab === 'bold') {
        if (subMode === 'generate') {
          console.log(
            'professional_email_generation_prompt: ',
            prompts.professional_email_generation || ''
          );
          setPrompt(prompts.professional_email_generation || '');
          setModel(
            models.professional_email || {
              model_name: '',
              temperature: 0,
            }
          );
          return;
        }
        if (subMode === 'update') {
          console.log(
            'professional_email_refinement_prompt: ',
            prompts.professional_email_refinement || ''
          );
          setPrompt(prompts.professional_email_refinement || '');
          setModel(
            models.professional_email || {
              model_name: '',
              temperature: 0,
            }
          );
          return;
        }
      }
      if (activeTab === 'cozy') {
        if (subMode === 'generate') {
          console.log(
            'casual_email_generation_prompt: ',
            prompts.casual_email_generation || ''
          );
          setPrompt(prompts.casual_email_generation || '');
          setModel(
            models.casual_email || {
              model_name: '',
              temperature: 0,
            }
          );
          return;
        }
        if (subMode === 'update') {
          console.log(
            'casual_email_refinement_prompt: ',
            prompts.casual_email_refinement || ''
          );
          setPrompt(prompts.casual_email_refinement || '');
          setModel(
            models.casual_email || {
              model_name: '',
              temperature: 0,
            }
          );
          return;
        }
      }
    }
    if (mode === 'banner') {
      if (activeTab === 'blurb') {
        if (subMode === 'generate') {
          console.log('banner_prompt: ', prompts.blurb_generation || '');
          setPrompt(prompts.blurb_generation || '');
          setModel(
            models.blurb || {
              model_name: '',
              temperature: 0,
            }
          );
          return;
        }
        if (subMode === 'update') {
          console.log('banner_prompt: ', prompts.blurb_refinement || '');
          setPrompt(prompts.blurb_refinement || '');
          setModel(
            models.blurb || {
              model_name: '',
              temperature: 0,
            }
          );
          return;
        }
      }
      if (activeTab === 'banner') {
        if (subMode === 'generate') {
          console.log('banner_prompt: ', prompts.banner_generation || '');
          setPrompt(prompts.banner_generation || '');
          setModel(
            models.banner || {
              model_name: '',
              temperature: 0,
            }
          );
          return;
        }
        if (subMode === 'update') {
          console.log('banner_prompt: ', prompts.banner_refinement || '');
          setPrompt(prompts.banner_refinement || '');
          setModel(
            models.banner || {
              model_name: '',
              temperature: 0,
            }
          );
          return;
        }
      }
    }
  };

  useEffect(() => {
    console.log('Data in splash: ', models, prompts);
    if (prompts && models) {
      try {
        initializeValues();
      } catch {
        showNotification('error', 'Failed to fetch data from server');
      }
    }
    setIsLoading(false);
  }, [models, prompts]);

  useEffect(() => {
    console.log(
      'mode is: ',
      mode,
      'subMode is: ',
      subMode,
      'activeTab is: ',
      activeTab
    );
    if (prompts && models) {
      try {
        initializeValues();
      } catch {
        showNotification('error', 'Failed to fetch data from server');
      }
    }
  }, [mode, subMode, activeTab]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log('---------------here---------------');
    // console.log(e.target.value, prompt);
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

  const replaceCurlyBraces = (text: string) => {
    return text
      .replace(/(?<!\{)\{(?!\{)/g, '{{') // Single { → {{
      .replace(/(?<!\})\}(?!\})/g, '}}'); // Single } → }}
  };

  const saveNewData = async () => {
    try {
      if (mode === 'splash') {
        if (activeTab === 'bold') {
          const promptRes = await savePrompt({
            mode: 'splash_page_casual',
            prompt: replaceCurlyBraces(prompt),
          });
          console.log(promptRes);
          const modelRes = await saveModel({ mode: 'splash_page', model });
          console.log(modelRes);
          const newPrompts = await getAllPrompts();
          const newModels = await getAllModels();
          setPrompts(newPrompts);
          setModels(newModels);
          showNotification('success', 'Updates were made successfully');
          return;
        }
        if (activeTab === 'cozy') {
          const promptRes = await savePrompt({
            mode: 'splash_page_professional',
            prompt: replaceCurlyBraces(prompt),
          });
          console.log(promptRes);
          const modelRes = await saveModel({
            mode: 'splash_page',
            model,
          });
          console.log(modelRes);
          const newPrompts = await getAllPrompts();
          const newModels = await getAllModels();
          setPrompts(newPrompts);
          setModels(newModels);
          showNotification('success', 'Updates were made successfully');
          return;
        }
      }
      if (mode === 'email') {
        if (activeTab === 'bold') {
          if (subMode === 'generate') {
            const promptRes = await savePrompt({
              mode: 'professional_email_generation',
              prompt: replaceCurlyBraces(prompt),
            });
            console.log(promptRes);
            const modelRes = await saveModel({
              mode: 'professional_email',
              model,
            });
            console.log(modelRes);
            const newPrompts = await getAllPrompts();
            const newModels = await getAllModels();
            setPrompts(newPrompts);
            setModels(newModels);
            showNotification('success', 'Updates were made successfully');
            return;
          }
          if (subMode === 'update') {
            const promptRes = await savePrompt({
              mode: 'professional_email_refinement',
              prompt: replaceCurlyBraces(prompt),
            });
            console.log(promptRes);
            const modelRes = await saveModel({
              mode: 'professional_email',
              model,
            });
            console.log(modelRes);
            const newPrompts = await getAllPrompts();
            const newModels = await getAllModels();
            setPrompts(newPrompts);
            setModels(newModels);
            showNotification('success', 'Updates were made successfully');
            return;
          }
        }
        if (activeTab === 'cozy') {
          if (subMode === 'generate') {
            const promptRes = await savePrompt({
              mode: 'casual_email_generation',
              prompt: replaceCurlyBraces(prompt),
            });
            console.log(promptRes);
            const modelRes = await saveModel({
              mode: 'casual_email',
              model,
            });
            console.log(modelRes);
            const newPrompts = await getAllPrompts();
            const newModels = await getAllModels();
            setPrompts(newPrompts);
            setModels(newModels);
            showNotification('success', 'Updates were made successfully');
            return;
          }
          if (subMode === 'update') {
            const promptRes = await savePrompt({
              mode: 'casual_email_refinement',
              prompt: replaceCurlyBraces(prompt),
            });
            console.log(promptRes);
            const modelRes = await saveModel({
              mode: 'casual_email',
              model,
            });
            console.log(modelRes);
            const newPrompts = await getAllPrompts();
            const newModels = await getAllModels();
            setPrompts(newPrompts);
            setModels(newModels);
            showNotification('success', 'Updates were made successfully');
            return;
          }
        }
      }
      if (mode === 'banner') {
        if (activeTab === 'blurb') {
          if (subMode === 'generate') {
            const promptRes = await savePrompt({
              mode: 'blurb_generation',
              prompt: replaceCurlyBraces(prompt),
            });
            console.log(promptRes);
            const modelRes = await saveModel({ mode: 'blurb', model });
            console.log(modelRes);
            const newPrompts = await getAllPrompts();
            const newModels = await getAllModels();
            setPrompts(newPrompts);
            setModels(newModels);
            showNotification('success', 'Updates were made successfully');
            return;
          }
          if (subMode === 'update') {
            const promptRes = await savePrompt({
              mode: 'blurb_refinement',
              prompt: replaceCurlyBraces(prompt),
            });
            console.log(promptRes);
            const modelRes = await saveModel({ mode: 'blurb', model });
            console.log(modelRes);
            const newPrompts = await getAllPrompts();
            const newModels = await getAllModels();
            setPrompts(newPrompts);
            setModels(newModels);
            showNotification('success', 'Updates were made successfully');
            return;
          }
        }
        if (activeTab === 'banner') {
          if (subMode === 'generate') {
            const promptRes = await savePrompt({
              mode: 'banner_generation',
              prompt: replaceCurlyBraces(prompt),
            });
            console.log(promptRes);
            const modelRes = await saveModel({ mode: 'banner', model });
            console.log(modelRes);
            const newPrompts = await getAllPrompts();
            const newModels = await getAllModels();
            setPrompts(newPrompts);
            setModels(newModels);
            showNotification('success', 'Updates were made successfully');
            return;
          }
          if (subMode === 'update') {
            const promptRes = await savePrompt({
              mode: 'banner_refinement',
              prompt: replaceCurlyBraces(prompt),
            });
            console.log(promptRes);
            const modelRes = await saveModel({ mode: 'banner', model });
            console.log(modelRes);
            const newPrompts = await getAllPrompts();
            const newModels = await getAllModels();
            setPrompts(newPrompts);
            setModels(newModels);
            showNotification('success', 'Updates were made successfully');
            return;
          }
        }
      }
    } catch {
      showNotification('error', 'Unable to make updates at this time');
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
      {(mode === 'email' || mode === 'banner' || true) && (
        <SubTabs
          mode={mode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

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
            {(mode === 'email' || mode === 'banner') && (
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
                      left:
                        subMode === 'generate' ? '0%' : 'calc(100% - 154px)',
                      width: subMode === 'generate' ? '175px' : '150px',
                    }}
                  ></div>
                </div>
              </div>
            )}
            <EditorForm
              model={model}
              prompt={prompt}
              isLoading={isLoading}
              handleModelChange={handleModelChange}
              handleTemperatureChange={handleTemperatureChange}
              handlePromptChange={handlePromptChange}
              handleKeyDown={handleKeyDown}
              saveNewData={saveNewData}
            />
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
    </div>
  );
}
