import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkTreeModalComponent } from './bookmark-tree-modal.component';

describe('BookmarkTreeDialogComponent', () => {
  let component: BookmarkTreeModalComponent;
  let fixture: ComponentFixture<BookmarkTreeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkTreeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkTreeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
