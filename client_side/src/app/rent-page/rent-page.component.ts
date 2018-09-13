import { Component, OnInit } from '@angular/core';
import { CarsModel } from '../shared/models/Cars.model';
import { CarService } from '../shared/services/CarService.service';
import { RentsService } from '../shared/services/RentService.service';
import { RentsModel } from '../shared/models/Rents.model';
import { UsersModel } from '../shared/models/Users.model';
import { UserService } from '../shared/services/UserService.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CarModel } from '../shared/models/Car.model';
import { UserModel } from '../shared/models/User.model';
import { RentModel } from '../shared/models/Rent.model';


@Component({
  selector: 'app-rent-page',
  templateUrl: './rent-page.component.html',
  styleUrls: ['./rent-page.component.css']
})
export class RentPageComponent implements OnInit {

  LocalCarsManager:CarsModel={AllCars:undefined,SingleCar:undefined}
  LocalRentService:RentsModel={AllRents:undefined,SingleRent:undefined,SpeseficRent:undefined}
  LocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined}



  
  ShowRentInfo:boolean=false;
  ShwoSoryMaasege:boolean=false;

  
  StartDate:Date;
  EndDate:Date;
  Today:Date=new Date()
  NumOfDays:number


  DidPostWorkForRent:string;;


  CalculateRent():void{
    //validate Dates
    if(this.StartDate==undefined||this.EndDate==undefined){
      alert("please enter start and end dates");
      return ;
    }
    let Start:any = new Date(this.StartDate);
    let end:any = new Date(this.EndDate);
    let Today:any=new Date(Date.now());
    if(Start<Today||end<Today){
      alert("Start date or end date is in the past")
      return
    }
    if(this.StartDate>this.EndDate){
      alert("End date must be after start date")
      return;
    }
    
    this.NumOfDays=((end -Start) / (24 * 3600 * 1000))+1;
    if(this.CheckIfCarAvaleble()){
      this.ShowRentInfo=true;
    }
    else{
      this.ShwoSoryMaasege=true;
    }
  }

  
  
  
  HideSoryMaasege():void{
    this.ShwoSoryMaasege=false;
  }
 

  



  private CheckIfCarAvaleble():boolean{
    for(let i of this.LocalRentService.SpeseficRent){
      if(this.StartDate>i.StartDate && i.EndDate>this.StartDate){
        return false;
      }
      if(this.EndDate>i.StartDate && i.EndDate>this.EndDate){
        return false
      }
      if(i.StartDate>this.StartDate && this.EndDate>i.EndDate){
        return false;
      }     
    }
    return true;
  }

  AddNewRent():void{
    let NewRent:RentModel={CarInfo:this.LocalCarsManager.SingleCar,UserInfo:this.LocalUserManager.SingleUser,StartDate:this.StartDate,EndDate:this.EndDate,ReturnDate:new Date("2100-01-01") };
    let callback=(bool:boolean)=>{this.DidPostWorkForRent=(bool)?"We recived your rent":"your rent was not submited";}
    this.myRentService.AddNewRent(NewRent,callback)

  }


  constructor(private myCarService:CarService,private myRentService:RentsService,private myUserService:UserService) {
    this.LocalCarsManager=myCarService.CarManager;
    this.LocalRentService=myRentService.RentManager;
    this.LocalUserManager=myUserService.UserManager;
    this.myRentService.GetSpesificRentsByCarLicence(this.LocalCarsManager.SingleCar.CarlicenseNumber);

  
  }
  ngOnInit() {
  }

}
