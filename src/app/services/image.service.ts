import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly LAST_IMAGE_KEY = 'lastImage';
  private readonly DEFAULT_IMAGE = 'assets/images/imagem_inicial.png';

  private currentImageSubject = new BehaviorSubject<string | null>(null);
  currentImage$ = this.currentImageSubject.asObservable();

  constructor() {
    this.loadLastImage();
  }

  async loadLastImage(): Promise<void> {
    const { value } = await Preferences.get({ key: this.LAST_IMAGE_KEY });
    if (value) {
      this.currentImageSubject.next(value);
    } else {
      this.setDefaultImage();
    }
  }

  setDefaultImage(): void {
    this.currentImageSubject.next(this.DEFAULT_IMAGE);
    this.saveLastImage(this.DEFAULT_IMAGE);
  }

  setRandomImage(): void {
    this.setDefaultImage();
  }

  clearImage(): void {
    this.setDefaultImage();
  }

  private async saveLastImage(imageUrl: string): Promise<void> {
    await Preferences.set({
      key: this.LAST_IMAGE_KEY,
      value: imageUrl
    });
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      if (image.dataUrl) {
        this.currentImageSubject.next(image.dataUrl);
        await this.saveLastImage(image.dataUrl);
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      this.setDefaultImage();
    }
  }

  async selectFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      if (image.dataUrl) {
        this.currentImageSubject.next(image.dataUrl);
        await this.saveLastImage(image.dataUrl);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      this.setDefaultImage();
    }
  }
}

