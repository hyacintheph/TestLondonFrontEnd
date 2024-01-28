import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlantListComponent} from '../plant-list/plant-list.component';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit {
  @Input() plant: any;
  @Output() selectedPlantData: EventEmitter<string>;
  constructor() {
    this.selectedPlantData = new EventEmitter<string>();
  }

  ngOnInit() {
  }
  // emit plant data parentList component
  emitPlantData(value: string){
    this.selectedPlantData.emit(value);
  }
}
