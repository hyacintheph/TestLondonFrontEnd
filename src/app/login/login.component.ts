import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../utils';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  loading: boolean;
  data: any;
  message: string;
  showToast: boolean;
  constructor(formBuilder: FormBuilder, private http: HttpClient, @Inject('API_URL') private apiUrl: string, private router: Router) {
    // form login initialisation
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Utils.emailValidator])],
      password: ['', Validators.required]
    });
    this.email = this.loginForm.controls.email;
    this.password = this.loginForm.controls.password;
    this.loading = false;
    this.message = '';
    this.showToast = false;
  }

  ngOnInit() {
  }
  // to login
  login(form: string) {
    // header initialisation
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    if (this.loginForm.valid) {
      this.loading = true;
      // send post request for login
      this.http.post(this.apiUrl + 'users/login', JSON.stringify(form), {headers}).subscribe(data => {
        this.data = data;
        // if credentials are valid
        if (this.data.result != null && this.data.code !== 5000) {
          this.loading = false;
          // set or update JWT Token on localstorage
          localStorage.setItem('accessToken', this.data.result['access-token']);
          // navigate to home
          this.router.navigate(['']);
        }
        // if user credentials are invalid
        if (this.data.result === null) {
          this.message = this.data.message;
          this.showToast = true;
          this.loading = false;
        }
        // server error
        if (this.data.code === 5000) {
          this.message = 'Erreur de connexion au compte !';
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
