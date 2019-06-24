import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OaklayPage } from './oaklay.page';

describe('OaklayPage', () => {
  let component: OaklayPage;
  let fixture: ComponentFixture<OaklayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OaklayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OaklayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
