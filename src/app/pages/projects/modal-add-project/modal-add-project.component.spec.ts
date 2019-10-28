import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddProjectComponent } from './modal-add-project.component';

describe('ModalAddProjectComponent', () => {
  let component: ModalAddProjectComponent;
  let fixture: ComponentFixture<ModalAddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
