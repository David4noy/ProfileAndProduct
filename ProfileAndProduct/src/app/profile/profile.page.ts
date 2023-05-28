import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';
import { FileExtraDataPlugin } from  'file-extra-data-plugin';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  fullName: string;
  email: string;
  imagePath: string;

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'OK',
      handler: (data: { name: any; email: any; }) => {        
        
        this.fullName = data.name;
        this.email = data.email;
        this.saveProfileData();
      },
    },];

   alertInputs = [
    {type: 'text', name: 'name', placeholder: 'Full name',},
    {type: 'text', name: 'email', placeholder: 'Email',},
  ];

  constructor(private storage: Storage, private modalController: ModalController) {
    this.fullName = 'John Doe';
    this.email = 'johndoe@example.com';
    this.imagePath = 'assets/profile_photo.png';
    this.getFileExtraData();
    this.initializeStorage();
   }

   ngOnInit() {}

   async initializeStorage() {
    await this.storage.create();
    const profileData = await this.storage.get('profileData');
    if (profileData) {
      this.fullName = profileData.fullName;
      this.email = profileData.email;
      this.imagePath = profileData.imagePath;
    }
  }

  async changePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });
    if (image?.dataUrl) {
      this.imagePath = image.dataUrl;
      this.saveProfileData()
    } 
    
  }

  async saveProfileData() {
    const profileData = {
      fullName: this.fullName,
      email: this.email,
      imagePath: this.imagePath,
    };
    await this.storage.set('profileData', profileData);
  }

  async getFileExtraData() {
    try {
      const filePath = 'assets/profile_photo.png'; 
      const extraData = await FileExtraDataPlugin.getFileExtraData(filePath)
      console.log('File Extra Data:', extraData);
      
    } catch (error) {
      console.error('Error retrieving file extra data:', error);
    }
  }  

}
