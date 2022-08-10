import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporeComponent } from './expore.component';

describe('ExporeComponent', () => {
  let component: ExporeComponent;
  let fixture: ComponentFixture<ExporeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExporeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExporeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
