import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storage: Storage, public router: Router) {}

  async ngOnInit() {
    // Initialize storage
    await this.storage.create();
    // Try to get name from local storage, redirect to voting page if exists else redirect to login page
    const name = await this.storage.get('name');
    if (!name) this.router.navigateByUrl('/login');
  }
}
