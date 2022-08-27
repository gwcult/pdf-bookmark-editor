import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed = false;

  constructor(private app: AppComponent) { }

  ngOnInit(): void {
  }

  save() {
    this.app.save();
  }

  loadFromUploadEvent(event: Event) {
    this.app.loadFromUploadEvent(event);
  }

  openBookmarkDialog() {
    this.app.openBookmarkDialog();
  }

  set page(val: number) {
    this.app.page = val;
  }

  get page() {
    return this.app.page;
  }
}
