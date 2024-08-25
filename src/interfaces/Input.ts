import { Component, Ref } from 'vue';
import { InputTypes } from '@/types/Input';

export interface InputProps {
  label?: string;
  placeholder: string;
  value: Ref<string | number>;
  isDisabled?: boolean;
  isRequired?: boolean;
  isError?: boolean;
  type?: InputTypes;
  icon?: Component;
}
