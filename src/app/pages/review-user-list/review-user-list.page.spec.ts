import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewUserListPage } from './review-user-list.page';

describe('ReviewUserListPage', () => {
  let component: ReviewUserListPage;
  let fixture: ComponentFixture<ReviewUserListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewUserListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewUserListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
