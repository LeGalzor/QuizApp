import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerModalComponent } from './answer-modal.component';

describe('AnswerModalComponent', () => {
  let component: AnswerModalComponent;
  let fixture: ComponentFixture<AnswerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
