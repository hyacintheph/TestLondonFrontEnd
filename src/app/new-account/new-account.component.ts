import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Utils} from '../utils';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  createAccountForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;
  passwordMatches: boolean;
  loading: boolean;
  data: any;
  message: string;
  showToast: boolean;
  constructor(formBuilder: FormBuilder, private http: HttpClient, @Inject('API_URL') private apiUrl: string, private router: Router) {
    // form group initialisation
    this.createAccountForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Utils.emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.name = this.createAccountForm.controls.name;
    this.email = this.createAccountForm.controls.email;
    this.password = this.createAccountForm.controls.password;
    this.confirmPassword = this.createAccountForm.controls.confirmPassword;
    this.showToast = false;
    this.message = '';
    this.loading = false;
  }

  ngOnInit() {
  }
  // find if passwords matches
  matchPassword(): boolean {
    return this.password.value === this.confirmPassword.value;
  }
  // create new user account
  createAccount(formData: string): void {
    // set headers requests
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    this.passwordMatches = this.matchPassword();
    if (this.createAccountForm.valid && this.passwordMatches) {
        this.loading = true;
        // send post request to create new account
        this.http.post(this.apiUrl + 'users/create', JSON.stringify(formData), {headers}).subscribe(data => {
          this.data = data;
          // if account is create successfully
          if (this.data.result != null && this.data.code !== 5000) {
            this.loading = false;
            this.message = 'Votre compte a été crée avec succès, veuillez vous connecter !';
            this.showToast = true;
            // clear form fields
            this.createAccountForm.clearValidators();
            this.createAccountForm.reset();
          }
          // if user account is not create successfully
          if(this.data.result === null){
            this.message = this.data.message;
            this.showToast = true;
            this.loading = false;
          }
          // if server errors are found
          if(this.data.code === 5000) {
            this.message = 'Erreur de creation du compte !';
            this.showToast = true;
            this.loading = false;
          }
        });
    }
  }
  // close toast info panel
  closeToast(state: boolean){
    this.showToast = state;
  }
}
