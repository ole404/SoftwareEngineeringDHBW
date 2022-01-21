import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import axios from 'axios';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  passedImage = null;
  imageAsString: string = null;
  treeNameInput: string = null;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.passedImage = this.navParams.get('passedImage');
    this.imageAsString = this.passedImage.base64String;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async uploadItem() {
    const username = await this.storage.get('name');
    const treename = await this.treeNameInput;
    axios
      .post('/trees/upload', {
        userName: username,
        treeName: treename,
        geo: {}, //TODO: try collecting from metadata, otherwise plugin?
        image: this.imageAsString,
      })
      .then((response) => {
        console.log(response);
        this.closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
