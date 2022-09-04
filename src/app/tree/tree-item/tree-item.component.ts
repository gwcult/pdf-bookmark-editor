import { Component, Inject, Input, OnInit } from '@angular/core';
import { InsertRelationType } from 'src/app/api/pdf-outline';
import { AppComponent } from 'src/app/app.component';
import { BookmarkItem } from 'src/app/pdf-bookmark.model';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent implements OnInit {
  @Input() item!: BookmarkItem;
  @Input() level!: number;

  constructor(private app: AppComponent) { }

  ngOnInit(): void {
  }

  switchCollapsed() {
    this.app.switchBookmarkCollapsing(this.item.ref);
  }

  get collapsed(): boolean {
    return this.app.getBookmarkCollapsing(this.item.ref);
  }

  goPage(page?: number) {
    this.app.goPage(page);
  }

  add(relType: InsertRelationType) {
    this.app.createBookmark({targetRef: this.item.ref, relType});
  }

  edit() {
    this.app.editBookmark(this.item);
  }

  delete() {
    this.app.deleteBookmark(this.item.ref);
  }
}
