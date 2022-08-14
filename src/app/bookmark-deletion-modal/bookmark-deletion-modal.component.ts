import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookmark-deletion-modal',
  templateUrl: './bookmark-deletion-modal.component.html',
  styleUrls: ['./bookmark-deletion-modal.component.scss']
})
export class BookmarkDeletionModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
