import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PlantListComponent} from '../plant-list/plant-list.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-water-plant',
  templateUrl: './water-plant.component.html',
  styleUrls: ['./water-plant.component.css']
})
export class WaterPlantComponent implements OnInit {
  @Input() selectedPlantName: string;
  @Input() selectedPlantImagePath: string;
  @Input() selectedPlantId: string;
  wateringList: Array<object>;
  data: any;
  message: string;
  loading: boolean;
  showToast: boolean;
  showHistory: boolean;
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string,
              private plantListService: PlantListComponent, private router: Router) {
  }

  ngOnInit() {
    // get plant history from injected plantListService
    if(this.plantListService.plants){
      this.wateringList = this.plantListService.plants.filter(plant => plant.id === this.selectedPlantId).watering;
    }
  }
  // save new plant watering
  wateredPlant(){
    // set headers
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    // Authorization headers
    headers = headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    // send put request to save plant watering
    this.http.put(this.apiUrl + `plants/watered?idPlant=${this.selectedPlantId}`, null,{headers}).subscribe(data => {
      this.data = data;
      this.loading = true;
      // when successfully save
      if (this.data.result != null && this.data.code !== 5000) {
        this.loading = false;
        this.message = 'La plante a été arrosé !';
        this.showToast = true;
        this.plantListService.loadUserPlants();
        this.showHistory = false;
      }
      if (this.data.result === null) {
        this.message = this.data.message;
        this.showToast = true;
        this.loading = false;
      }
      if (this.data.code === 5000) {
        this.message = `Erreur lors de l'enregistrement`;
        this.showToast = true;
        this.loading = false;
      }
    }, // unauthorized user
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      });
  }
  // show watering list history
  showWateringHistory(){
    if(this.plantListService.plants){
      this.showHistory = true;
      this.wateringList = this.plantListService.plants.filter(plant => plant.id === this.selectedPlantId)[0].watering;
    }
  }
  // close toast info panel
  closeToast(state: boolean){
    this.showToast = state;
  }
}
