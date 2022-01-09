import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Bind to input field
  name = '';

  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
    // Initialize storage on component. However, this is somewhat bad practice since the method is alrady called in the app.component.
    await this.storage.create();
  }

  onLogin() {
    // Safe name to lacal storage and redirect user to voting page
    this.storage.set('name', this.name);
    this.router.navigateByUrl('/voting');
  }
}
