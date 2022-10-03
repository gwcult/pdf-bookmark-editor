import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-bookmark-tree-modal',
  template: `
    <app-modal title="Bookmarks" [dark]="true">
      <ng-template #body>
        <app-tree [tree]="bookmarkTree"></app-tree>
      </ng-template>
    </app-modal>
  `,
  styles: [],
})
export class BookmarkTreeModalComponent implements OnInit {
  constructor(public modal: NgbActiveModal, private app: AppComponent) {}

  ngOnInit(): void {}

  get bookmarkTree() {
    return this.app.bookmarkTree;
  }
}
