import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonContent,
  IonButton,
  IonIcon,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  chevronUpOutline, 
  chevronDownOutline,
  checkmarkOutline,
  closeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-time-picker',
  template: `
    <div class="time-picker-container">
      <div class="time-units">
        <div class="time-unit">
          <ion-button fill="clear" (click)="adjustTime('hours', 1)">
            <ion-icon name="chevron-up-outline"></ion-icon>
          </ion-button>
          <span class="time-value">{{ hours.toString().padStart(2, '0') }}</span>
          <ion-button fill="clear" (click)="adjustTime('hours', -1)">
            <ion-icon name="chevron-down-outline"></ion-icon>
          </ion-button>
          <span class="time-label">h</span>
        </div>

        <div class="time-separator">:</div>

        <div class="time-unit">
          <ion-button fill="clear" (click)="adjustTime('minutes', 1)">
            <ion-icon name="chevron-up-outline"></ion-icon>
          </ion-button>
          <span class="time-value">{{ minutes.toString().padStart(2, '0') }}</span>
          <ion-button fill="clear" (click)="adjustTime('minutes', -1)">
            <ion-icon name="chevron-down-outline"></ion-icon>
          </ion-button>
          <span class="time-label">m</span>
        </div>

        <div class="time-separator">:</div>

        <div class="time-unit">
          <ion-button fill="clear" (click)="adjustTime('seconds', 1)">
            <ion-icon name="chevron-up-outline"></ion-icon>
          </ion-button>
          <span class="time-value">{{ seconds.toString().padStart(2, '0') }}</span>
          <ion-button fill="clear" (click)="adjustTime('seconds', -1)">
            <ion-icon name="chevron-down-outline"></ion-icon>
          </ion-button>
          <span class="time-label">s</span>
        </div>
      </div>

      <div class="actions">
        <ion-button color="danger" fill="clear" (click)="cancel()">
          <ion-icon name="close-outline"></ion-icon>
        </ion-button>
        <ion-button color="success" fill="clear" (click)="confirm()">
          <ion-icon name="checkmark-outline"></ion-icon>
        </ion-button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .time-picker-container {
      background: var(--ion-background-color);
      border-radius: 16px;
      padding: 16px;
      width: 280px;
      margin: 0 auto;
      color: var(--ion-text-color);
    }

    .time-units {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    .time-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 60px;

      ion-button {
        --color: var(--ion-text-color);
      }
    }

    .time-value {
      font-size: 1.8rem;
      font-weight: bold;
      color: var(--ion-text-color);
      text-align: center;
    }

    .time-label {
      position: absolute;
      bottom: -20px;
      font-size: 0.8rem;
      color: var(--ion-color-step-500);
    }

    .time-separator {
      font-size: 1.8rem;
      font-weight: bold;
      color: var(--ion-color-step-500);
      margin: 0 2px;
      padding-bottom: 20px;
    }

    ion-button {
      --padding-start: 4px;
      --padding-end: 4px;
      margin: 0;
      height: 32px;
    }

    ion-button::part(native) {
      padding: 0;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 24px;

      ion-button {
        font-size: 1.2rem;
        --padding-start: 12px;
        --padding-end: 12px;
      }

      ion-button::part(native) {
        padding: 6px;
      }
    }
  `],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class TimePickerComponent {
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor(private modalCtrl: ModalController) {
    addIcons({
      'chevron-up-outline': chevronUpOutline,
      'chevron-down-outline': chevronDownOutline,
      'checkmark-outline': checkmarkOutline,
      'close-outline': closeOutline
    });
  }

  adjustTime(unit: 'hours' | 'minutes' | 'seconds', change: number) {
    const maxValues = {
      hours: 23,
      minutes: 59,
      seconds: 59
    };

    this[unit] += change;
    
    if (this[unit] < 0) {
      this[unit] = maxValues[unit];
    } else if (this[unit] > maxValues[unit]) {
      this[unit] = 0;
    }
  }

  confirm() {
    const totalSeconds = (this.hours * 3600) + (this.minutes * 60) + this.seconds;
    this.modalCtrl.dismiss(totalSeconds);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
} 