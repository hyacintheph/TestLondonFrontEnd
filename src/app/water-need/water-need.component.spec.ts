import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterNeedComponent } from './water-need.component';

describe('WaterNeedComponent', () => {
  let component: WaterNeedComponent;
  let fixture: ComponentFixture<WaterNeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterNeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
