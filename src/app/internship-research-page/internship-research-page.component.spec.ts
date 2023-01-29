import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipResearchPageComponent } from './internship-research-page.component';

describe('InternshipResearchPageComponent', () => {
  let component: InternshipResearchPageComponent;
  let fixture: ComponentFixture<InternshipResearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipResearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipResearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
