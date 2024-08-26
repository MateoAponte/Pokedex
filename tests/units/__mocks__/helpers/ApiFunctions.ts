import { expect } from 'vitest';
import { CODES_RESPONSE } from '@/constants/code';
import axios from 'axios';
import axiosMocked from '../axiosMocked';

class ApiFunctions {
  shouldShowErrorWhenParamIsInvalid = async (callback) => {
    const auth = await callback();
    expect(auth).toEqual({ code: CODES_RESPONSE.CODE_ERROR, error: true });
  };

  shouldShowErrorWhenEndpointsFail = async (message: string) => {
    axiosMocked.get.mockRejectedValueOnce(new Error(message));
    await expect(axios.get).rejects.toThrowError(message);
    expect(axios.get).toHaveBeenCalledTimes(1);
  };
}

export default new ApiFunctions();
