import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

export interface TimerState {
  currentTime: number;
  totalTime: number;
  isRunning: boolean;
  progress: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private state = new BehaviorSubject<TimerState>({
    currentTime: 0,
    totalTime: 0,
    isRunning: false,
    progress: 0
  });

  private timerId: number | null = null;

  state$ = this.state.asObservable();

  constructor() {
    this.loadLastTimer();
  }

  private async loadLastTimer() {
    const { value } = await Preferences.get({ key: 'lastTimer' });
    if (value) {
      const savedState = JSON.parse(value);
      this.state.next({
        ...savedState,
        isRunning: false,
        currentTime: savedState.totalTime,
        progress: 0
      });
    }
  }

  private async saveTimer(totalTime: number) {
    await Preferences.set({
      key: 'lastTimer',
      value: JSON.stringify({ totalTime })
    });
  }

  setTime(minutes: number): void {
    const totalTime = minutes * 60;
    this.state.next({
      ...this.state.value,
      currentTime: totalTime,
      totalTime: totalTime,
      progress: 0
    });
    this.saveTimer(totalTime);
  }

  startTimer(): void {
    if (this.state.value.currentTime <= 0 || this.state.value.isRunning) {
      return;
    }

    this.state.next({ ...this.state.value, isRunning: true });
    
    this.timerId = window.setInterval(() => {
      const currentState = this.state.value;
      if (currentState.currentTime <= 0) {
        this.pauseTimer();
        return;
      }

      const newTime = currentState.currentTime - 1;
      const progress = 100 - ((newTime / currentState.totalTime) * 100);
      
      this.state.next({
        ...currentState,
        currentTime: newTime,
        progress
      });
    }, 1000);
  }

  pauseTimer(): void {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.state.next({ ...this.state.value, isRunning: false });
  }

  resetTimer(): void {
    this.pauseTimer();
    this.state.next({
      ...this.state.value,
      currentTime: this.state.value.totalTime,
      progress: 0,
      isRunning: false
    });
  }

  stop() {
    this.resetTimer();
  }
}
