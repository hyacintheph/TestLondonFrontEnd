import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {PlantListComponent} from '../plant-list/plant-list.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data: any;
  user: any;
  authUser: any;
  message: string;
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string, private router: Router) { }

  ngOnInit() {
    this.getAuthUser();
  }
  logout(){
    // set headers
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    this.http.post(this.apiUrl+ 'users/logout', null, {headers}).subscribe(data => {
      this.data = data;
        if (this.data.result !== null && this.data.code !== 5000) {
          this.router.navigate(['login']);
        }
        if (this.data.code === 5000) {
          alert('Erreur de deconnexion au compte !');
        }
      },
      // unauthorized user
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      });
  }
  // get auth user
  getAuthUser(){
    // set headers
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    this.http.get(this.apiUrl + 'users/auth', {headers}).subscribe(data => {
      this.user = data;
      if (this.user.result !== null && this.user.code !== 5000) {
        this.authUser = this.user.result;
        console.log(this.authUser);
      }
      if (this.user.result === null) {
        this.message = this.user.message;
        alert(this.message);
      }
      if (this.user.code === 5000) {
        this.message = 'Erreur de chargement des plantes !';
        alert(this.message);
      }
    },
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      });
  }
}
