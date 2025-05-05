// import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

type Model = {
  model_name: string;
  temperature: number;
};

interface PromptFormProps {
  model: Model;
  prompt: string;
  isLoading: boolean;
  handlePromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleModelChange: (val: string) => void;
  handleTemperatureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveNewData: () => void;
}

const PromptForm = ({
  model,
  prompt,
  isLoading,
  handlePromptChange,
  handleKeyDown,
  handleModelChange,
  handleTemperatureChange,
  saveNewData,
}: PromptFormProps) => {
  // const [inputText, setInputText] = useState('');

  // const replaceCurlyBraces = (text: string) => {
  //   return text
  //     .replace(/(?<!\{)\{(?!\{)/g, '{{') // Single { → {{
  //     .replace(/(?<!\})\}(?!\})/g, '}}'); // Single } → }}
  // };
  return (
    <>
      <div>
        <h1 className='text-2xl mb-6 font-semibold text-blue-300'>
          Prompt and Model
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
              Prompt
            </Label>
            <Textarea
              id='prompt'
              value={prompt}
              onChange={handlePromptChange}
              onKeyDown={handleKeyDown}
              placeholder={`Enter your prompt`}
              rows={5}
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
                <SelectContent className='bg-gray-800 text-white'>
                  {/* <SelectItem value='gpt-4o'>OpenAI - gpt-4o</SelectItem>
                  <SelectItem value='gpt-4o-mini'>
                    OpenAI - gpt-4o-mini
                  </SelectItem>
                  <SelectItem value='o3-mini'>OpenAI - o3-mini</SelectItem>
                  <SelectItem value='o4-mini'>OpenAI - o4-mini</SelectItem> */}
                  {/* OpenAI Models */}
                  <SelectItem value='gpt-4o'>OpenAI - gpt-4o</SelectItem>
                  <SelectItem value='gpt-4o-mini'>
                    OpenAI - gpt-4o-mini
                  </SelectItem>
                  <SelectItem value='gpt-4-turbo'>
                    OpenAI - gpt-4-turbo
                  </SelectItem>
                  <SelectItem value='gpt-4'>OpenAI - gpt-4</SelectItem>
                  <SelectItem value='gpt-3.5-turbo'>
                    OpenAI - gpt-3.5-turbo
                  </SelectItem>
                  {/* <SelectItem value='text-davinci-003'>
                    OpenAI - text-davinci-003
                  </SelectItem> */}
                  <SelectItem value='o3-mini'>OpenAI - o3-mini</SelectItem>
                  <SelectItem value='o4-mini'>OpenAI - o4-mini</SelectItem>
                  {/* Anthropic Models */}
                  <SelectItem value='claude-3-7-sonnet-20250219'>
                    Anthropic - Claude 3.7 Sonnet
                  </SelectItem>
                  <SelectItem value='claude-3-5-sonnet-20241022'>
                    Anthropic - Claude 3.5 Sonnet
                  </SelectItem>
                  <SelectItem value='claude-3-5-haiku-20241022'>
                    Anthropic - Claude 3.5 Haiku
                  </SelectItem>
                  <SelectItem value='claude-3-opus-20240229'>
                    Anthropic - Claude 3 Opus
                  </SelectItem>
                  <SelectItem value='claude-3-sonnet-20240229'>
                    Anthropic - Claude 3 Sonnet
                  </SelectItem>
                  <SelectItem value='claude-3-haiku-20240307'>
                    Anthropic - Claude 3 Haiku
                  </SelectItem>

                  {/* DeepSeek Models */}
                  <SelectItem value='deepseek-r1'>DeepSeek - R1</SelectItem>
                  <SelectItem value='deepseek-r1-zero'>
                    DeepSeek - R1-Zero
                  </SelectItem>
                  <SelectItem value='deepseek-coder-1.3b-instruct'>
                    DeepSeek - Coder 1.3B Instruct
                  </SelectItem>
                  <SelectItem value='deepseek-coder-5.7b-instruct'>
                    DeepSeek - Coder 5.7B Instruct
                  </SelectItem>
                  <SelectItem value='deepseek-coder-6.7b-instruct'>
                    DeepSeek - Coder 6.7B Instruct
                  </SelectItem>
                  <SelectItem value='deepseek-coder-33b-instruct'>
                    DeepSeek - Coder 33B Instruct
                  </SelectItem>
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
        className='mb-6'
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

export default PromptForm;
