import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterPlantComponent } from './water-plant.component';

describe('WaterPlantComponent', () => {
  let component: WaterPlantComponent;
  let fixture: ComponentFixture<WaterPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
