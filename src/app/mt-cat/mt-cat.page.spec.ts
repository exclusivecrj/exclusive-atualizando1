import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtCatPage } from './mt-cat.page';

describe('MtCatPage', () => {
  let component: MtCatPage;
  let fixture: ComponentFixture<MtCatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtCatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtCatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
