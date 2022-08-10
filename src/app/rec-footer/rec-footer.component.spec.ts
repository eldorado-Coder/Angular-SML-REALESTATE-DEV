import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecFooterComponent } from './rec-footer.component';

describe('RecFooterComponent', () => {
  let component: RecFooterComponent;
  let fixture: ComponentFixture<RecFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
