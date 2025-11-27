import React from 'react';

interface DisplayProps {
  value: string;
  historyString: string;
  isMagicMode: boolean;
  magicInput: string;
  onMagicInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  magicResponse: string | null;
  isLoading: boolean;
}

const Display: React.FC<DisplayProps> = ({
  value,
  historyString,
  isMagicMode,
  magicInput,
  onMagicInputChange,
  magicResponse,
  isLoading,
}) => {
  return (
    <div className="bg-[#ecfdf5] rounded-3xl p-6 mb-6 shadow-inner border-4 border-white h-48 flex flex-col relative overflow-hidden transition-all duration-300">
      {/* Decorative dots */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-emerald-200"></div>
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-200"></div>

      {isMagicMode ? (
        <div className="flex-1 flex flex-col h-full">
           <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">✨ Magic Mode</span>
          </div>
          {magicResponse ? (
             <div className="flex-1 overflow-y-auto no-scrollbar text-sm text-gray-700 font-medium bg-white/50 p-2 rounded-xl border border-emerald-100">
               {isLoading ? (
                 <div className="flex items-center gap-2 text-emerald-500 animate-pulse">
                   <span>Thinking...</span>
                   <span className="animate-bounce">🌸</span>
                 </div>
               ) : (
                 magicResponse
               )}
             </div>
          ) : (
            <textarea 
              className="flex-1 w-full bg-transparent resize-none outline-none text-gray-600 placeholder-emerald-300 font-medium text-lg leading-snug"
              placeholder="Ask me a math problem! e.g., 'What is 50% of a pizza with 8 slices?'"
              value={magicInput}
              onChange={onMagicInputChange}
              disabled={isLoading}
              autoFocus
            />
          )}
        </div>
      ) : (
        <>
          <div className="h-8 flex justify-end items-center text-emerald-400 font-medium text-sm px-1 overflow-hidden">
             {historyString}
          </div>
          <div className="flex-1 flex justify-end items-end">
            <span 
              className={`font-fredoka font-bold text-gray-700 break-all leading-none ${
                value.length > 10 ? 'text-3xl' : value.length > 7 ? 'text-4xl' : 'text-5xl'
              }`}
            >
              {value}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export { Display };