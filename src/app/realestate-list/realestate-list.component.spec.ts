import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestateListComponent } from './realestate-list.component';

describe('HomeLeaseComponent', () => {
  let component: RealestateListComponent;
  let fixture: ComponentFixture<RealestateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealestateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealestateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
