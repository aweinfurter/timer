import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  playOutline, 
  pauseOutline, 
  refreshOutline, 
  checkmarkOutline,
  cameraOutline,
  imagesOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      'play-outline': playOutline,
      'pause-outline': pauseOutline,
      'refresh-outline': refreshOutline,
      'checkmark-outline': checkmarkOutline,
      'camera-outline': cameraOutline,
      'images-outline': imagesOutline
    });
  }
}
