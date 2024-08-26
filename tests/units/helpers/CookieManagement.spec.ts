import CookieManagement from '@/helpers/CookieManagement';
import { describe, it, expect, afterEach } from 'vitest';

describe('The Cookie Management File should works correctly and can write, read and delete cookies', () => {
  afterEach(() => {
    // Limpia todas las cookies después de cada prueba
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      CookieManagement.deleteCookie(name);
    });
  });

  it('Should set the poke-started cookie', () => {
    CookieManagement.setCookie('poke-started', 'true', 7);

    const result = document.cookie;
    expect(result).toContain('poke-started=true');
  });

  it('Should get a cookie by name', () => { 
    // Configura una cookie de prueba
    document.cookie = 'poke-started=true';

    const result = CookieManagement.getCookie('poke-started');
    expect(result).toBe('true');
  });

  it('Should return null if cookie is not found', () => {
    const result = CookieManagement.getCookie('nonexistentCookie');
    expect(result).toBeNull();
  });

  it('Should delete a cookie', () => {
    document.cookie = 'poke-started=true';

    CookieManagement.deleteCookie('poke-started');
    const result = CookieManagement.getCookie('poke-started');
    expect(result).toBeNull();
  });
});
