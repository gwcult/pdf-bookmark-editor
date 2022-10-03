import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookmark-deletion-modal',
  template: `
    <app-modal title="Confirmation">
      <ng-template #body>
        <p>Are you sure you want to delete the bookmark?</p>
      </ng-template>
      <ng-template #footer>
        <button type="button" class="btn btn-outline-dark" (click)="modal.dismiss()">Cancel</button>
        <button type="button" class="btn btn-outline-dark" (click)="modal.close()">Confirm</button>
      </ng-template>
    </app-modal>
  `,
  styles: [],
})
export class BookmarkDeletionModalComponent implements OnInit {
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
