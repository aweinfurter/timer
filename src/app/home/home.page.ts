import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { TimerComponent } from '../components/timer/timer.component';
import { ThemeService } from '../services/theme.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>
          Timer
        </ion-title>
        <ion-button slot="primary" fill="clear" (click)="toggleTheme()">
          <ion-icon slot="icon-only" [name]="(themeService.isDark$ | async) ? 'sunny-outline' : 'moon-outline'"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div id="container">
        <app-timer></app-timer>
      </div>
    </ion-content>
  `,
  styles: [`
    #container {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ion-button {
      margin-right: 8px;
    }

    ion-toolbar {
      --padding-end: 8px;
    }
  `],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    TimerComponent,
    AsyncPipe,
    NgIf
  ]
})
export class HomePage {
  constructor(public themeService: ThemeService) {
    addIcons({
      'moon-outline': moonOutline,
      'sunny-outline': sunnyOutline
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
