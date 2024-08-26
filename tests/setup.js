import { vi } from 'vitest';
import axios from './units/__mocks__/axiosMocked';

vi.mock('axios', () => {
  return {
    default: axios,
  };
});
