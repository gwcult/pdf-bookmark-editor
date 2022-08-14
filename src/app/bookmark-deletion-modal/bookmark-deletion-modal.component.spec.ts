import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkDeletionModalComponent } from './bookmark-deletion-modal.component';

describe('BookmarkDeletionModalComponent', () => {
  let component: BookmarkDeletionModalComponent;
  let fixture: ComponentFixture<BookmarkDeletionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkDeletionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkDeletionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
