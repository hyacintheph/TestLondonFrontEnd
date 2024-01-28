import {Component, Inject, Injectable, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
@Injectable()
export class PlantListComponent implements OnInit {
  selectedPlantName: string;
  selectedPlantImagePath: string;
  selectedPlantId: string;
  data: any;
  plants: any;
  loadingForGetPlants: boolean;
  showToast: boolean;
  message: string;
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string, private router: Router) { }

  ngOnInit() {
    this.loadUserPlants();
  }
  // load plant list
  loadUserPlants() {
    // set headers
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    // get list of page 0, so 10 plants, the pagination button are not implemented to show more than 10 plants
    this.http.get(this.apiUrl + 'plants?page=0', {headers}).subscribe(data => {
        this.loadingForGetPlants = true;
        this.data = data;
        if (this.data.result !== null && this.data.code !== 5000) {
          this.loadingForGetPlants = false;
          this.plants = this.data.result;
          this.loadingForGetPlants = true;
        }
        if (this.data.result === null) {
          this.message = this.data.message;
          this.showToast = true;
          this.loadingForGetPlants = false;
        }
        if (this.data.code === 5000) {
          this.message = 'Erreur de chargement des plantes !';
          this.showToast = true;
          this.loadingForGetPlants = false;
        }
      },
      // unauthorized user
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      });
  }
  // set child data to parent
  setSelectedPlantData(value: string){
    this.selectedPlantName = value.split(';')[0];
    this.selectedPlantImagePath = value.split(';')[1];
    this.selectedPlantId = value.split(';')[2];
  }
}
