import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule,Routes} from "@angular/router"

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarService } from './shared/services/CarService.service';
import { LogInComponent } from './log-in/log-in.component';
import { UserService } from './shared/services/UserService.service';
import { RentPageComponent } from './rent-page/rent-page.component';
import { RentsService } from './shared/services/RentService.service';
import { UserRentPageComponent } from './user-rent-page/user-rent-page.component';
import { ReturnCarPageComponent } from './return-car-page/return-car-page.component';
import { RentManagerPageComponent } from './rent-manager-page/rent-manager-page.component';
import { CarTypeService } from './shared/services/CarTypeService.service';
import { CarTypeManagerPageComponent } from './car-type-manager-page/car-type-manager-page.component';
import { UserManagerPageComponent } from './user-manager-page/user-manager-page.component';
import { CarManagerPageComponent } from './car-manager-page/car-manager-page.component';
import { BranceService } from './shared/services/BrancheService.service';
import { MainServerUr } from './shared/services/MainServerUrl.service';


const appRoutes:Routes=[
  {path:"home",component:HomePageComponent},
  {path:"CarList",component:CarListComponent},
  {path:"logIn",component:LogInComponent},
  {path:"Rents",component:RentPageComponent},
  {path:"UserRents",component:UserRentPageComponent},
  {path:"ReturnCar",component:ReturnCarPageComponent},
  {path:"RentManager",component:RentManagerPageComponent},
  {path:"CarTypeManager",component:CarTypeManagerPageComponent},
  {path:"UserManager",component:UserManagerPageComponent},
  {path:"CarManager",component:CarManagerPageComponent},
  {path:"" ,redirectTo:"/home",pathMatch:"full"},
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    HomePageComponent,
    CarListComponent,
    LogInComponent,
    RentPageComponent,
    UserRentPageComponent,
    ReturnCarPageComponent,
    RentManagerPageComponent,
    CarTypeManagerPageComponent,
    UserManagerPageComponent,
    CarManagerPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CarService,UserService,RentsService,CarTypeService,BranceService,MainServerUr],
  bootstrap: [AppComponent]
})
export class AppModule { }
