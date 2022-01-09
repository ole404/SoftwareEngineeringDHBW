import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  name = '';

  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
    await this.storage.create();
  }

  onLogin() {
    this.storage.set('name', this.name);
    this.router.navigateByUrl('/voting');
  }
}
