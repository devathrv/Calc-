export enum ButtonVariant {
  DEFAULT = 'default',
  ACTION = 'action',
  OPERATOR = 'operator',
  EQUALS = 'equals',
  SPECIAL = 'special' // For AI or Clear
}

export interface CalculatorState {
  currentInput: string;
  previousValue: string | null;
  operator: string | null;
  isResult: boolean;
  history: string[];
}

export type MathOperator = '+' | '-' | '×' | '÷' | '%';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}