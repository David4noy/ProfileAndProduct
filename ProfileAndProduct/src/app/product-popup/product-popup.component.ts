import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Instrument } from '../products/products.page'; 
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';


@Component({
  selector: 'app-product-popup',
  templateUrl: 'product-popup.component.html',
  styleUrls: ['product-popup.component.scss'],
})
export class ProductPopupComponent {

    @Input() instruments: Instrument[] = []
    @Input() instrument: Instrument = {
      name: 'No input',
      price: '',
      section: '',
      family: '',
      image: '',
      description: ''
    };

  constructor(private modalController: ModalController, private emailComposer: EmailComposer) {}

  closeModal() {
    this.modalController.dismiss();
  }

  shareProduct() {
    
  }

  shareByEmail(instrument: Instrument) {

    let attachments: string[] = [];

    this.convertImageToBase64(instrument.image)
      .then((base64Image) => {
        attachments = [base64Image];
        console.log('Base64 image:', base64Image);
      })
      .catch((error) => {
        console.error('Error converting image to Base64:', error);
      });

      const email = {
        to: '',
        subject: `Check out this instrument: ${instrument.name}`,
        body: `Name: ${instrument.name}\nPrice: ${instrument.price}\nDescription: ${instrument.description}`,
        isHtml: false,
        attachments: attachments,
      };
  
    this.emailComposer.open(email);
  }

  // Function to convert the image source to Base64
 convertImageToBase64(imageSrc: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg'); // Adjust the format if needed
        const base64Image = dataURL.split(',')[1];
        resolve(base64Image);
      } else {
        reject(new Error('Unable to convert image to Base64.'));
      }
    };
    image.onerror = reject;
    image.src = imageSrc;
  });
}

  
}
