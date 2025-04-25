import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonButton, 
  IonIcon, 
  IonContent, 
  IonInput,
  ModalController
} from '@ionic/angular/standalone';
import { TimerService } from '../../services/timer.service';
import { ImageService } from '../../services/image.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { addIcons } from 'ionicons';
import { 
  playOutline, 
  pauseOutline, 
  refreshOutline, 
  cameraOutline, 
  imagesOutline,
  moonOutline,
  sunnyOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonContent,
    IonInput
  ]
})
export class TimerComponent implements OnInit, OnDestroy {
  minutes: number = 1;
  timerState: { currentTime: number; totalTime: number; isRunning: boolean; progress: number } | null = null;
  currentImage: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private timerService: TimerService,
    private imageService: ImageService,
    private modalCtrl: ModalController,
    public themeService: ThemeService
  ) {
    addIcons({
      'play-outline': playOutline,
      'pause-outline': pauseOutline,
      'refresh-outline': refreshOutline,
      'camera-outline': cameraOutline,
      'images-outline': imagesOutline,
      'moon-outline': moonOutline,
      'sunny-outline': sunnyOutline
    });
  }

  ngOnInit() {
    // Inicializa com 1 minuto
    this.timerService.setTime(1);
    
    // Inscreve-se nas atualizações do timer
    this.subscriptions.push(
      this.timerService.state$.subscribe(state => {
        this.timerState = state;
        if (state) {
          this.minutes = Math.ceil(state.totalTime / 60);
        }
      })
    );

    // Inscreve-se nas atualizações da imagem
    this.subscriptions.push(
      this.imageService.currentImage$.subscribe(url => {
        this.currentImage = url;
        if (!url) {
          this.imageService.setRandomImage();
        }
      })
    );

    // Carrega uma imagem aleatória ao iniciar se não houver imagem
    if (!this.currentImage) {
      this.imageService.setRandomImage();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  async openTimePicker() {
    if (this.timerState?.isRunning) return;

    const modal = await this.modalCtrl.create({
      component: TimePickerComponent,
      cssClass: 'time-picker-modal',
      backdropDismiss: true,
      showBackdrop: true
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data !== undefined) {
      this.timerService.setTime(data / 60); // Converte para minutos para compatibilidade
    }
  }

  startTimer() {
    this.timerService.startTimer();
  }

  pauseTimer() {
    this.timerService.pauseTimer();
  }

  resetTimer() {
    this.timerService.resetTimer();
  }

  async takePicture() {
    await this.imageService.takePicture();
  }

  async selectFromGallery() {
    await this.imageService.selectFromGallery();
  }

  clearImage() {
    this.imageService.clearImage();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
