import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlantListComponent } from './plant-list/plant-list.component';
import { AddPlantComponent } from './add-plant/add-plant.component';
import { PlantComponent } from './plant/plant.component';
import { WaterNeedComponent } from './water-need/water-need.component';
import { WaterPlantComponent } from './water-plant/water-plant.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToastComponent } from './toast/toast.component';

const routes: Routes = [
  {path: 'signIn', component: NewAccountComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    NewAccountComponent,
    LoginComponent,
    NavbarComponent,
    PlantListComponent,
    AddPlantComponent,
    PlantComponent,
    WaterNeedComponent,
    WaterPlantComponent,
    HomeComponent,
    ToastComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
    ],
  providers: [
    {provide: 'API_URL', useValue: 'http://localhost:8090/api/v1/'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
