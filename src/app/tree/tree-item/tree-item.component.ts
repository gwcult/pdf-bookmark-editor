import { Component, Input, OnInit } from '@angular/core';
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
  collapsed = true;

  constructor(private appComponent: AppComponent) { }

  ngOnInit(): void {
  }

  goPage(page?: number) {
    this.appComponent.goPage(page);
  }

  add(relType: InsertRelationType) {
    this.appComponent.createBookmark({targetRef: this.item.ref, relType});
  }

  edit() {
    this.appComponent.editBookmark(this.item);
  }

  delete() {
    this.appComponent.deleteBookmark(this.item.ref);
  }
}
