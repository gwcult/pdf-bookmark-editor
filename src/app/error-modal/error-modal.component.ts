import { Component, OnInit } from '@angular/core';
import { EncryptedPDFError } from 'pdf-lib';

@Component({
  selector: 'app-error-modal',
  template: `
    <app-modal title="PDF Loading Error" #modal>
      <ng-template #body>
        <p>
          The document could not be loaded.
          <ng-container [ngSwitch]="error" ]>
            <ng-template ngSwitchCase="encrypted">Encrypted documents are not supported.</ng-template>
            <ng-template ngSwitchDefault>An unknown error has occurred.</ng-template>
          </ng-container>
        </p>
      </ng-template>
      <ng-template #footer>
        <button type="button" class="btn btn-outline-dark" (click)="modal.close()">Close</button>
      </ng-template>
    </app-modal>
  `,
  styles: [],
})
export class ErrorModalComponent implements OnInit {
  constructor() {}
  error: 'encrypted' | 'unknown' = 'unknown';

  ngOnInit(): void {}

  setError(error: Error) {
    try {
      if (error.message.includes('is encrypted')) {
        this.error = 'encrypted';
      }
    } catch {
      this.error = 'unknown';
    }
  }
}
