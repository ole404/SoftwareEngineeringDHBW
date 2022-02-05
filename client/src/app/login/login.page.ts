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
    // Initialize storage on component. However, this is somewhat bad practice since the method is alrady called in the app.component.
    await this.storage.create();
    // Redirect to voting if name exists
    const name = await this.storage.get('name');
    if (name) this.router.navigateByUrl('/voting');
  }

  onLogin() {
    // Safe name to local storage and redirect user to voting page
    this.storage.set('name', this.name);
    this.router.navigateByUrl('/voting');
  }
}
