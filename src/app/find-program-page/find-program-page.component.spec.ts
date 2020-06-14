import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProgramPageComponent } from './find-program-page.component';

describe('FindProgramPageComponent', () => {
  let component: FindProgramPageComponent;
  let fixture: ComponentFixture<FindProgramPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProgramPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProgramPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
