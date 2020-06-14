import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramPlannerPageComponent } from './program-planner-page.component';

describe('ProgramPlannerPageComponent', () => {
  let component: ProgramPlannerPageComponent;
  let fixture: ComponentFixture<ProgramPlannerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramPlannerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramPlannerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
