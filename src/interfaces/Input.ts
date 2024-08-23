import { Component } from 'vue';
import { InputTypes } from '../types/Input';

export interface InputProps {
  label?: string;
  placeholder: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isError?: boolean;
  type?: InputTypes;
  icon?: Component;
}
