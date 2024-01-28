import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Plant} from '../Plant';
import {HomeComponent} from '../home/home.component';
import {PlantListComponent} from '../plant-list/plant-list.component';



@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {

  name: AbstractControl;
  species: AbstractControl;
  dateCreation: AbstractControl;
  addPlantForm: FormGroup;
  loading: boolean;
  data: any;
  file!: File;
  message: string;
  showToast: boolean;
  plants: any;
  constructor(formBuilder: FormBuilder, private http: HttpClient, @Inject('API_URL') private apiUrl: string, private router: Router,
              private plantListService: PlantListComponent) {
    // addPlant form initialisation
    this.addPlantForm = formBuilder.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      dateCreation: ['', Validators.required],
    });
    this.name = this.addPlantForm.controls.name;
    this.species = this.addPlantForm.controls.species;
    this.dateCreation = this.addPlantForm.controls.dateCreation;
  }

  ngOnInit() {
  }

  // To add new plant
  addNewPlant(form: string) {
    if (this.addPlantForm.valid && this.file) {
      // create new formData
      const formData: FormData = new FormData();
      // append formData key/value
      formData.append('name', this.name.value);
      formData.append('species', this.species.value);
      formData.append('creationDate', this.dateCreation.value);
      // file for image
      formData.append('file', this.file);
      // set or update header with Authorization
      let headers = new HttpHeaders();
      headers = headers.set('Accept', 'application/json');
      headers = headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
      // send post request to create new plant
      this.http.post(this.apiUrl + 'plants', formData, {headers}).subscribe(data => {
        this.loading = true;
        this.data = data;
        // when plant is create successfully
        if (this.data.result !== null && this.data.code !== 5000) {
          this.loading = false;
          this.message = `La plante ${this.data.result.name} a été enregistrée !`;
          this.showToast = true;
          this.plantListService.loadUserPlants();
        }
        // with errors
        if (this.data.result === null) {
          this.message = this.data.message;
          this.showToast = true;
          this.loading = false;
          this.loading = false;
        }
        // server error
        if (this.data.code === 5000) {
          this.message = 'Erreur de connexion au compte !';
          this.showToast = true;
          this.loading = false;
        }
      },
        error => {
        // Unauthorized user
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        });
    }

  }
  // close toast info panel
  closeToast(state: boolean) {
    this.showToast = state;
  }
  // handle image file selection
  selectFile(event: any) {
    this.file = event.target.files.item(0);
  }
}
