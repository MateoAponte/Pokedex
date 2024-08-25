import { TextAligns, TextTypes } from '@/types/Text';

export interface TextProps {
  text: string;
  type: TextTypes;
  alignment?: TextAligns;
}
