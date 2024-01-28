import {Component, Inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-water-need',
  templateUrl: './water-need.component.html',
  styleUrls: ['./water-need.component.css']
})
export class WaterNeedComponent implements OnInit {
  @Input() selectedPlantName: string;
  @Input() selectedPlantImagePath: string;
  @Input() selectedPlantId: string;

  plantNeedForm: FormGroup;
  quantity: AbstractControl;
  frequency: AbstractControl;
  plant: any;
  message: string;
  showToast: boolean;
  data: any;
  loading: boolean;
  constructor(formBuilder: FormBuilder, private http: HttpClient, @Inject('API_URL') private apiUrl: string, private router: Router) {
    // plantNeedForm initialisation
    this.plantNeedForm = formBuilder.group({
      quantity: ['', Validators.required],
      frequency: ['', Validators.required]
    });
    this.quantity = this.plantNeedForm.controls.quantity;
    this.frequency = this.plantNeedForm.controls.frequency;
  }

  ngOnInit() {
  }
  savePlantNeed(form: any) {
    if (this.plantNeedForm.valid) {
      // set headers
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Accept', 'application/json');
      // set JWT Authorization header
      headers = headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
      // send post request to create new plant need
      this.http.post(this.apiUrl + `plants/plantNeed?idPlant=${this.selectedPlantId}`, JSON.stringify({
        quantity: parseFloat(form.quantity),
        frequency: parseInt(form.frequency, 10)
      }), {headers}).subscribe(data => {
        this.data = data;
        this.loading = true;
        // if plant need is saved successfully
        if (this.data.result != null && this.data.code !== 5000) {
          this.loading = false;
          this.message = 'Besoin enregistrée !';
          this.showToast = true;
          this.plantNeedForm.reset();
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
      },
        // unauthorized user
        error => {
          if (error.status === 401) {
            this.router.navigate(['login']);
          }
        });
    }
  }
  // close toast info panel
  closeToast(state: boolean){
    this.showToast = state;
  }
}
