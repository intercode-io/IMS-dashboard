import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddActivityComponent } from './modal-add-activity.component';

describe('ModalAddActivityComponent', () => {
  let component: ModalAddActivityComponent;
  let fixture: ComponentFixture<ModalAddActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
