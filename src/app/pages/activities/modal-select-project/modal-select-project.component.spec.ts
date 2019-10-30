import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectProjectComponent } from './modal-select-project.component';

describe('ModalSelectProjectComponent', () => {
  let component: ModalSelectProjectComponent;
  let fixture: ComponentFixture<ModalSelectProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
