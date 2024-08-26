import LocalStorageManagement from '@/helpers/LocalStorageManagment';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('The Cookie Management File should works correctly and can write, read and delete Local Storage', () => {
  beforeEach(() => {
    // Resetea los mocks antes de cada test
    vi.clearAllMocks();
  });

  it('Should get an item from localStorage', () => {
    const spy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue('mockedValue');

    const result = LocalStorageManagement.getItem('testKey');

    expect(spy).toHaveBeenCalledWith('testKey');
    expect(result).toBe('mockedValue');
  });

  it('Should set an item in localStorage', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem');

    LocalStorageManagement.setItem('testKey', 'testValue');

    expect(spy).toHaveBeenCalledWith('testKey', 'testValue');
  });

  it('Should remove an item from localStorage', () => {
    const spy = vi.spyOn(Storage.prototype, 'removeItem');

    LocalStorageManagement.removeItem('testKey');

    expect(spy).toHaveBeenCalledWith('testKey');
  });
});
