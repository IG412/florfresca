import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RseComponent } from './rse.component';

describe('RseComponent', () => {
  let component: RseComponent;
  let fixture: ComponentFixture<RseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
