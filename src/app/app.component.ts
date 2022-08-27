import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import * as pdfLib from "pdf-lib";
import { readAsArrayBuffer } from 'promise-file-reader';
import { saveAs } from 'file-saver';
import { Bookmark, BookmarkItem, BookmarkTree } from './pdf-bookmark.model';
import { InsertionLocation, PDFBookmarkService } from './pdf-bookmark.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BookmarkEditModalComponent } from './bookmark-edit-modal/bookmark-edit-modal.component';
import { PDFRef } from "pdf-lib";
import { BookmarkDeletionModalComponent } from './bookmark-deletion-modal/bookmark-deletion-modal.component';
import { BookmarkTreeModalComponent } from './bookmark-tree-modal/bookmark-tree-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  service!: PDFBookmarkService;
  pdfSrc!: string;
  page = 1;
  pdf!: pdfLib.PDFDocument;
  bookmarkModal?: NgbModalRef;

  bookmarkTree!: BookmarkTree;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private router: Router,
    private injector: Injector,
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal, 
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      const url = query["url"];
      if (url) {
        this.loadFromUrl(url);
      }
    });
  }

  async loadFromUrl(url: string) {
    const buffer = await firstValueFrom(this.http.get(url, {responseType: 'arraybuffer'}));
    await this.loadFromBuffer(buffer);
  }

  async loadFromUploadEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length) {
      const file = (target.files as FileList)[0] as File;
      target.value = null as any;
      const buffer = await readAsArrayBuffer(file);
      await this.loadFromBuffer(buffer);
    }
  }

  async loadFromBuffer(buffer: ArrayBuffer) {
    this.pdf = await pdfLib.PDFDocument.load(buffer);
    this.pdfSrc = URL.createObjectURL(new Blob([buffer]));
    this.service = new PDFBookmarkService(this.pdf);
    this.bookmarkTree = this.service.getBookmarkTreeRoot();
  }

  async save() {
    const outlinedPdf: Uint8Array = await this.pdf.save();
    const blob = new Blob([outlinedPdf]);
    this.pdfSrc = URL.createObjectURL(blob);
    saveAs(blob, "pdf.pdf");
  }

  createBookmark(location: InsertionLocation) {
    const ref = this.modalService.open(BookmarkEditModalComponent, {injector: this.injector});
    const instance = ref.componentInstance as BookmarkEditModalComponent;
    instance.create();
    ref.closed.subscribe((data: Bookmark) => {
      this.service.createBookmark(location, data);
      this.bookmarkTree = this.service.getBookmarkTreeRoot();
    });
  }

  editBookmark(item: BookmarkItem) {
    const ref = this.modalService.open(BookmarkEditModalComponent, {injector: this.injector});
    const instance = ref.componentInstance as BookmarkEditModalComponent;
    instance.edit(item);
    ref.closed.subscribe((data: Bookmark) => {
      this.service.editBookmark(item.ref, data);
      this.bookmarkTree = this.service.getBookmarkTreeRoot();
    });
  }

  deleteBookmark(ref: PDFRef) {
    const modalRef = this.modalService.open(BookmarkDeletionModalComponent);
    modalRef.closed.subscribe(() => {
      this.service.deleteBookmark(ref);
      this.bookmarkTree = this.service.getBookmarkTreeRoot();
    });
  }

  goPage(page?: number) {
    if (page) {
      if (this.bookmarkModal) {
        this.bookmarkModal.close();
      }
      this.page = page;
      this.changeDetector.detectChanges();
    }
  }

  getPageCount() {
    return this.pdf.getPageCount();
  }

  openBookmarkDialog() {
    this.bookmarkModal = this.modalService.open(BookmarkTreeModalComponent, {injector: this.injector});
  }
}
