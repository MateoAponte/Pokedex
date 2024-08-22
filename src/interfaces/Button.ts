import { ButtonsColors, ButtonSize } from '../types/Button';

export interface ButtonProps {
  text: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  color: ButtonsColors;
  size: ButtonSize;
}
