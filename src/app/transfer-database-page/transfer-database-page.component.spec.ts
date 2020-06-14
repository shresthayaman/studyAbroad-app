import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDatabasePageComponent } from './transfer-database-page.component';

describe('TransferDatabasePageComponent', () => {
  let component: TransferDatabasePageComponent;
  let fixture: ComponentFixture<TransferDatabasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDatabasePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDatabasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
