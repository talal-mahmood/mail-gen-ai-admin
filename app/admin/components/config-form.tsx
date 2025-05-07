// import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

type Config = {
  placeholder: string;
  heading: string;
  subheading: string;
  styleheading: string;
  boldstyle: string;
  cozystyle: string;
  urlheading: string;
};

interface ConfigFormProps {
  config: Config;
  activeTab: string;
  isLoading: boolean;
  handleConfigChange: (val: Config) => void;
  saveNewData: () => void;
}

const ConfigForm = ({
  config,
  activeTab,
  isLoading,
  handleConfigChange,
  saveNewData,
}: ConfigFormProps) => {
  // const [inputText, setInputText] = useState('');

  // const replaceCurlyBraces = (text: string) => {
  //   return text
  //     .replace(/(?<!\{)\{(?!\{)/g, '{{') // Single { → {{
  //     .replace(/(?<!\})\}(?!\})/g, '}}'); // Single } → }}
  // };

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleConfigChange({ ...config, heading: e.target.value });
  };
  const handleSubHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleConfigChange({ ...config, subheading: e.target.value });
  };
  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleConfigChange({ ...config, placeholder: e.target.value });
  };
  const handleStyleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleConfigChange({ ...config, styleheading: e.target.value });
  };
  const handleButtonUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleConfigChange({ ...config, urlheading: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveNewData();
    }
  };

  return (
    <>
      <div>
        <h1 className='text-2xl mb-6 font-semibold text-blue-300'>
          Heading{activeTab !== 'banner' && 's'} and Placeholder
        </h1>
      </div>
      <div className='grid grid-cols-1 gap-4 mb-6 px-2'>
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
          {/* <div style={{ margin: '20px 0' }}>
            <Label htmlFor='test-input'>Input Text:</Label>
            <Input
              id='test-input'
              type='text'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '8px',
                border: '1px solid #ccc',
              }}
              placeholder='Type text with curly braces...'
            />
          </div>
          <div style={{ margin: '20px 0' }}>
            <Label>Transformed Output:</Label>
            <div
              style={{
                padding: '12px',
                marginTop: '8px',
                border: '1px solid #ddd',
                minHeight: '50px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {replaceCurlyBraces(inputText)}
            </div>
          </div> */}
          <div>
            <Label
              htmlFor='query'
              className='block mb-2 font-semibold text-blue-300'
            >
              {activeTab === 'banner' ? 'Heading' : 'With Textarea'}
            </Label>
            <Input
              id='prompt'
              value={config.heading}
              onChange={handleHeadingChange}
              onKeyDown={handleKeyDown}
              placeholder={`Enter heading for mode with textarea`}
              className={`w-full p-4 bg-gray-800 rounded-lg border border-gray-600 transition-all duration-200`}
            />
          </div>
          {activeTab !== 'banner' && (
            <div>
              <Label
                htmlFor='query'
                className='block mb-2 font-semibold text-blue-300'
              >
                Url Only
              </Label>
              <Input
                id='prompt'
                value={config.subheading}
                onChange={handleSubHeadingChange}
                onKeyDown={handleKeyDown}
                placeholder={`Enter heading for mode without textarea`}
                className={`w-full p-4 bg-gray-800 rounded-lg border border-gray-600 transition-all duration-200`}
              />
            </div>
          )}
          <div>
            <Label
              htmlFor='query'
              className='block mb-2 font-semibold text-blue-300'
            >
              Placeholder
            </Label>
            <Input
              id='prompt'
              value={config.placeholder}
              onChange={handlePlaceholderChange}
              onKeyDown={handleKeyDown}
              placeholder={`Enter placeholder`}
              className={`w-full p-4 bg-gray-800 rounded-lg border border-gray-600 transition-all duration-200`}
            />
          </div>
          <div>
            <Label
              htmlFor='query'
              className='block mb-2 font-semibold text-blue-300'
            >
              Style Type
            </Label>
            <Input
              id='prompt'
              value={config.styleheading}
              onChange={handleStyleTypeChange}
              onKeyDown={handleKeyDown}
              placeholder={`Enter style type`}
              className={`w-full p-4 bg-gray-800 rounded-lg border border-gray-600 transition-all duration-200`}
            />
          </div>
          <div>
            <Label
              htmlFor='query'
              className='block mb-2 font-semibold text-blue-300'
            >
              Bold Style
            </Label>
            <Input
              id='prompt'
              value={config.boldstyle}
              onChange={handleStyleTypeChange}
              onKeyDown={handleKeyDown}
              placeholder={`Enter bold style type`}
              className={`w-full p-4 bg-gray-800 rounded-lg border border-gray-600 transition-all duration-200`}
            />
          </div>
          <div>
            <Label
              htmlFor='query'
              className='block mb-2 font-semibold text-blue-300'
            >
              Cozy Style
            </Label>
            <Input
              id='prompt'
              value={config.cozystyle}
              onChange={handleStyleTypeChange}
              onKeyDown={handleKeyDown}
              placeholder={`Enter cozy style type`}
              className={`w-full p-4 bg-gray-800 rounded-lg border border-gray-600 transition-all duration-200`}
            />
          </div>
          <div>
            <Label
              htmlFor='query'
              className='block mb-2 font-semibold text-blue-300'
            >
              Button Url
            </Label>
            <Input
              id='prompt'
              value={config.urlheading}
              onChange={handleButtonUrlChange}
              onKeyDown={handleKeyDown}
              placeholder={`Enter button url`}
              className={`w-full p-4 bg-gray-800 rounded-lg border border-gray-600 transition-all duration-200`}
            />
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
    </>
  );
};

export default ConfigForm;
