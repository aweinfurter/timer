import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDark = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDark.asObservable();

  constructor() {
    this.loadTheme();
  }

  private async loadTheme() {
    const { value } = await Preferences.get({ key: 'darkMode' });
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = value ? value === 'true' : prefersDark;
    
    this.setTheme(isDark);
  }

  async toggleTheme() {
    const newValue = !this.isDark.value;
    this.setTheme(newValue);
    await Preferences.set({
      key: 'darkMode',
      value: newValue.toString()
    });
  }

  private setTheme(isDark: boolean) {
    this.isDark.next(isDark);
    document.documentElement.setAttribute('color-theme', isDark ? 'dark' : 'light');
  }
} 