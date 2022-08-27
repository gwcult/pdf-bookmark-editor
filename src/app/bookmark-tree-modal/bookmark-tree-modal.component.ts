import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
import { BookmarkTree } from '../pdf-bookmark.model';

@Component({
  selector: 'app-bookmark-tree-modal',
  templateUrl: './bookmark-tree-modal.component.html',
  styleUrls: ['./bookmark-tree-modal.component.scss']
})
export class BookmarkTreeModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal, private app: AppComponent) { }

  ngOnInit(): void {
  }

  get bookmarkTree() {
    return this.app.bookmarkTree;
  }
}
