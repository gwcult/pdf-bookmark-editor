import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkEditModalComponent } from './bookmark-edit-modal.component';

describe('BookmarkEditModalComponent', () => {
  let component: BookmarkEditModalComponent;
  let fixture: ComponentFixture<BookmarkEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
