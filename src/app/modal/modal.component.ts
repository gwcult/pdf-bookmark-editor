import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ContentChild('title') titleTemplate!: TemplateRef<void>;
  @ContentChild('body') bodyTemplate!: TemplateRef<void>;
  @ContentChild('footer') footerTemplate?: TemplateRef<void>;
  @Input() title = '';
  @Input() dark = false;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close() {
    this.modal.close();
  }
}
