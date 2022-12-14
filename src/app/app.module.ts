import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeComponent } from './tree/tree.component';
import { TreeItemComponent } from './tree/tree-item/tree-item.component';
import { BookmarkEditModalComponent } from './bookmark-edit-modal/bookmark-edit-modal.component';
import { BookmarkDeletionModalComponent } from './bookmark-deletion-modal/bookmark-deletion-modal.component';
import { InvalidFeedbackComponent } from './invalid-feedback/invalid-feedback.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookmarkTreeModalComponent } from './bookmark-tree-modal/bookmark-tree-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    TreeItemComponent,
    BookmarkEditModalComponent,
    BookmarkDeletionModalComponent,
    InvalidFeedbackComponent,
    NavbarComponent,
    BookmarkTreeModalComponent,
    ErrorModalComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PdfViewerModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
