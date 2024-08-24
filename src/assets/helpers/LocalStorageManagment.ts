class LocalStorageManagement {
  public key: string;

  constructor() {
    this.key = 'favorites';
  }

  public getItem(key: string) {
    return localStorage.getItem(key);
  }
  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export default new LocalStorageManagement();
