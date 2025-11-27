import React, { useState, useEffect } from 'react';
import { CuteButton } from './CuteButton';
import { Display } from './Display';
import { ButtonVariant } from '../types';
import { askCuteMathHelper } from '../services/geminiService';

const Calculator: React.FC = () => {
  // Calculator State
  const [input, setInput] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState<boolean>(false);
  const [history, setHistory] = useState<string>('');

  // Magic Mode State
  const [isMagicMode, setIsMagicMode] = useState<boolean>(false);
  const [magicInput, setMagicInput] = useState<string>('');
  const [magicResponse, setMagicResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNumClick = (num: string) => {
    if (isMagicMode) return;

    if (resetNext) {
      setInput(num);
      setResetNext(false);
    } else {
      setInput(input === '0' ? num : input + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (isMagicMode) return;

    if (operator && !resetNext && previousValue) {
        // If we chain operators (e.g., 5 + 5 + ...), calculate the intermediate result
        calculate();
        setPreviousValue(null); // Reset after intermediate calc will be handled by calculate's effect effectively
        // Actually, calculate updates input. We need to grab that new input.
        // To keep it simple: just set operator.
    }

    setOperator(op);
    setPreviousValue(input);
    setResetNext(true);
    setHistory(`${input} ${op}`);
  };

  const calculate = () => {
    if (!previousValue || !operator) return;

    const current = parseFloat(input);
    const prev = parseFloat(previousValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) {
            setInput("Error");
            setResetNext(true);
            setHistory("");
            return;
        }
        result = prev / current;
        break;
      case '%':
        result = prev % current;
        break;
    }

    // Format to avoid long decimals
    const resultString = String(Math.round(result * 100000000) / 100000000);
    
    setInput(resultString);
    setHistory(`${previousValue} ${operator} ${input} =`);
    setPreviousValue(null);
    setOperator(null);
    setResetNext(true);
  };

  const handleClear = () => {
    if (isMagicMode) {
        setMagicInput('');
        setMagicResponse(null);
    } else {
        setInput('0');
        setPreviousValue(null);
        setOperator(null);
        setResetNext(false);
        setHistory('');
    }
  };

  const handleDelete = () => {
    if (isMagicMode) return;
    
    if (resetNext) return;
    
    if (input.length === 1 || input === 'Error') {
      setInput('0');
    } else {
      setInput(input.slice(0, -1));
    }
  };

  const handleDecimal = () => {
    if (isMagicMode) return;
    if (resetNext) {
        setInput("0.");
        setResetNext(false);
        return;
    }
    if (!input.includes('.')) {
      setInput(input + '.');
    }
  };

  const handlePlusMinus = () => {
    if (isMagicMode) return;
    if (input === '0') return;
    setInput(String(parseFloat(input) * -1));
  };

  const toggleMagicMode = () => {
    setIsMagicMode(!isMagicMode);
    // Reset magic state when closing
    if (isMagicMode) {
        setMagicResponse(null);
        setMagicInput('');
    }
  };

  const handleMagicAsk = async () => {
    if (!magicInput.trim()) return;
    
    setIsLoading(true);
    setMagicResponse(null); // Clear previous response
    
    // Call Gemini
    const answer = await askCuteMathHelper(magicInput);
    
    setMagicResponse(answer);
    setIsLoading(false);
  };

  // UI Structure
  return (
    <div className="bg-white p-6 rounded-[3rem] shadow-[0px_20px_50px_rgba(0,0,0,0.1)] w-full max-w-sm border-8 border-white ring-4 ring-pink-100 relative">
      
      {/* Cute Character / Header */}
      <div className="absolute -top-16 left-0 right-0 flex justify-center z-10">
          <div className="bg-white px-6 py-2 rounded-t-3xl border-4 border-b-0 border-white shadow-sm ring-4 ring-pink-100">
             <span className="text-4xl filter drop-shadow-sm">🐱</span>
          </div>
      </div>

      <Display 
        value={input}
        historyString={history}
        isMagicMode={isMagicMode}
        magicInput={magicInput}
        onMagicInputChange={(e) => setMagicInput(e.target.value)}
        magicResponse={magicResponse}
        isLoading={isLoading}
      />

      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <CuteButton 
            label={isMagicMode ? "Clear" : "AC"} 
            onClick={handleClear} 
            variant={ButtonVariant.ACTION} 
        />
        <CuteButton 
            label={isMagicMode ? "✨" : "+/-"} 
            onClick={isMagicMode ? toggleMagicMode : handlePlusMinus} 
            variant={isMagicMode ? ButtonVariant.SPECIAL : ButtonVariant.OPERATOR} 
            className={isMagicMode ? "bg-pink-100 ring-2 ring-pink-300" : ""}
        />
        <CuteButton label="%" onClick={() => handleOperatorClick('%')} variant={ButtonVariant.OPERATOR} disabled={isMagicMode} />
        <CuteButton label="÷" onClick={() => handleOperatorClick('÷')} variant={ButtonVariant.OPERATOR} disabled={isMagicMode} />

        {/* Row 2 */}
        <CuteButton label="7" onClick={() => handleNumClick('7')} disabled={isMagicMode} />
        <CuteButton label="8" onClick={() => handleNumClick('8')} disabled={isMagicMode} />
        <CuteButton label="9" onClick={() => handleNumClick('9')} disabled={isMagicMode} />
        <CuteButton label="×" onClick={() => handleOperatorClick('×')} variant={ButtonVariant.OPERATOR} disabled={isMagicMode} />

        {/* Row 3 */}
        <CuteButton label="4" onClick={() => handleNumClick('4')} disabled={isMagicMode} />
        <CuteButton label="5" onClick={() => handleNumClick('5')} disabled={isMagicMode} />
        <CuteButton label="6" onClick={() => handleNumClick('6')} disabled={isMagicMode} />
        <CuteButton label="-" onClick={() => handleOperatorClick('-')} variant={ButtonVariant.OPERATOR} disabled={isMagicMode} />

        {/* Row 4 */}
        <CuteButton label="1" onClick={() => handleNumClick('1')} disabled={isMagicMode} />
        <CuteButton label="2" onClick={() => handleNumClick('2')} disabled={isMagicMode} />
        <CuteButton label="3" onClick={() => handleNumClick('3')} disabled={isMagicMode} />
        <CuteButton label="+" onClick={() => handleOperatorClick('+')} variant={ButtonVariant.OPERATOR} disabled={isMagicMode} />

        {/* Row 5 */}
        <CuteButton 
            label={isMagicMode ? "Back" : "✨"} 
            onClick={toggleMagicMode} 
            variant={ButtonVariant.SPECIAL} 
            className="text-xl"
        />
        <CuteButton label="0" onClick={() => handleNumClick('0')} disabled={isMagicMode} />
        <CuteButton label="." onClick={handleDecimal} disabled={isMagicMode} />
        
        {isMagicMode ? (
             <CuteButton 
                label={isLoading ? "..." : "Ask"} 
                onClick={handleMagicAsk} 
                variant={ButtonVariant.EQUALS} 
                className="text-lg"
             />
        ) : (
            <CuteButton label="=" onClick={calculate} variant={ButtonVariant.EQUALS} />
        )}
      </div>

      {/* Decorative Feet */}
      <div className="absolute -bottom-3 left-10 w-12 h-6 bg-pink-200 rounded-b-full -z-10"></div>
      <div className="absolute -bottom-3 right-10 w-12 h-6 bg-pink-200 rounded-b-full -z-10"></div>
    </div>
  );
};

export { Calculator };