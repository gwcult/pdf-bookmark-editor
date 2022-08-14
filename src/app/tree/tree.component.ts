import { Component, ContentChild, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { BookmarkTree } from '../pdf-bookmark.model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent<T> implements OnInit, OnChanges {

  @Input() tree!: BookmarkTree;

  @Input() level = 0;

  constructor(private appComponent: AppComponent) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['level']) {
      this.level = Math.min(this.level, 3);
    }
  }

  addFirst() {
    this.appComponent.createBookmark({targetRef: this.tree.ref, relType: 'inside'});
  }

  ngOnInit(): void {
  }

}
