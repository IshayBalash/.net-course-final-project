import { Component, OnInit } from '@angular/core';
import { RentsModel } from '../shared/models/Rents.model';
import { RentsService } from '../shared/services/RentService.service';
import { RentModel } from '../shared/models/Rent.model';
import { UsersModel } from '../shared/models/Users.model';
import { CarsModel } from '../shared/models/Cars.model';
import { UserService } from '../shared/services/UserService.service';
import { CarService } from '../shared/services/CarService.service';
import { UserModel } from '../shared/models/User.model';
import { CarModel } from '../shared/models/Car.model';

@Component({
  selector: 'app-rent-manager-page',
  templateUrl: './rent-manager-page.component.html',
  styleUrls: ['./rent-manager-page.component.css']
})
export class RentManagerPageComponent implements OnInit {

  LocalRentManager:RentsModel={AllRents:undefined,SpeseficRent:undefined,SingleRent:undefined}
  LocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined};
  LocalCarsManager:CarsModel={AllCars:undefined,SingleCar:undefined};


  ShowRentList:boolean=true;
  ShowEditSection:boolean=false;
  ShowDateOptionParam:boolean=false


  DeleteMessage:string;
  DeleteRent(rent:RentModel):void{
  if(confirm("are you sure you want to delete this rent?")){
    let callback=(bool:boolean)=>{this.DeleteMessage=(bool)?"Rent Was deleted":"Somthing went wrong";}
    this.myRentService.DeleteRent(rent.RentID,callback);
    this.myRentService.InitAllRents();
    }  
  }

  
  OpenRentForEdit(rent:RentModel){
    this.myUserService.InitUsers()
    this.myCarService.InitCars();
    this.LocalRentManager.SingleRent=rent;
    this.ShowEditSection=true;
    this.ShowRentList=false;
    this.ShowDateOptionParam=false;

  }



  //EditParameters///////////////////////////

  //First section:
  username:string="";
  carlicencnumber:string=""

  //Second Section
  NewStartDate:Date;
  NewEndDate:Date;
  NewReturnDate:Date  
  DidEditWork:string;
  /////////////////////////////////////////////////////
  
  
  


  ShowDateOption():void{
    if(!this.username || !this.carlicencnumber){
      alert("must pic car licnece number and user name")
      return;
    }
    else{
      this.myRentService.GetSpesificRentsByCarLicence(this.carlicencnumber) 
      this.ShowDateOptionParam=true;  
    }
  }


  SubmitEdit():void{
   //set the User object
   let User:UserModel;   
     for(let i of this.LocalUserManager.AllUsers){
       if(this.username==i.FullName){
         User=i;
         alert(User.FullName)
         break;
       }
      }
   //set the car object
   let Car:CarModel;
     for(let i of this.LocalCarsManager.AllCars){
       if(this.carlicencnumber==i.CarlicenseNumber){
         Car=i;
         alert(Car.CarlicenseNumber);
         break;
       }
    }
   let StartDate:Date=(this.NewStartDate)?this.NewStartDate:this.LocalRentManager.SingleRent.StartDate
   let EndDate:Date=(this.NewEndDate)?this.NewEndDate:this.LocalRentManager.SingleRent.EndDate;
   let ReturnDate:Date=(this.NewReturnDate)?this.NewReturnDate:this.LocalRentManager.SingleRent.ReturnDate
   let IfCarAvailable:boolean=this.CheckIfCarAvaleble();
   if(!IfCarAvailable){
     alert("this car is not availble in this dates");
     return;
   } 
   let Rent:RentModel={CarInfo:Car,UserInfo:User,StartDate:StartDate,EndDate:EndDate,ReturnDate:ReturnDate}
   let callback=(bool:boolean)=>{this.DidEditWork=(bool)?"the Rent was changed":"something went wrong";}
   this.myRentService.EditRent(this.LocalRentManager.SingleRent.RentID,Rent,callback);
  }



  BackToList():void{
    this.ShowDateOptionParam=false;
    this.ShowEditSection=false;
    this.myRentService.InitAllRents();
    this.ShowRentList=true;
  }

  CheckIfCarAvaleble():boolean{
    if(this.NewStartDate>this.NewEndDate){
      alert("end date must by after start date")
      return false;
    }
    if(this.NewStartDate>this.NewReturnDate){
      alert("return date must by after end date")
      return false;
    }
    if(this.NewStartDate>this.NewReturnDate){
      alert("return date must by after start date")
      return false;
    }
    for(let i of this.LocalRentManager.SpeseficRent){
      if(this.NewStartDate>i.StartDate && i.EndDate>this.NewEndDate){
        return false;
      }
      if(this.NewEndDate>i.StartDate && i.EndDate>this.NewEndDate){
        return false
      }
      if(i.StartDate>this.NewStartDate && this.NewEndDate>i.EndDate){
        return false;
      }     
    }
    return true;
  }



  constructor(private myRentService:RentsService,private myUserService:UserService,private myCarService:CarService) {
    this.LocalRentManager=myRentService.RentManager;
    this.myRentService.InitAllRents();
    this.LocalUserManager=myUserService.UserManager;
    this.LocalCarsManager=myCarService.CarManager;
    
   }

  ngOnInit() {
  }

}
