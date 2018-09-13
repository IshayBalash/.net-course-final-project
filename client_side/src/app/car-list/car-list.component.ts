import { Component, OnInit } from '@angular/core';
import { CarsModel } from '../shared/models/Cars.model';
import { CarService } from '../shared/services/CarService.service';
import { CarModel } from '../shared/models/Car.model';
import { UsersModel } from '../shared/models/Users.model';
import { UserService } from '../shared/services/UserService.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  LocalCarsManager:CarsModel={AllCars:undefined,SingleCar:undefined}
  LocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined}

  SearchCarsArry:CarModel[]=[];

  TransferCarToService(carparam:CarModel):void{
    this.LocalCarsManager.SingleCar=carparam;
  }


  //Search Section

  //boolean_parameter
  ShowAllCars:boolean
  SearchAcoordingTo:Array<string>=["gear","year","Manufacturer","full list"]
  OptionSelected:string;
 

  
  SetSearchParameters():void{
    if(this.OptionSelected=="gear"){
      this.ShwoGearOptions=true;
      this.ShowYearOption=false;
      this.ShwoManufacturerOption=false;
    }
    if(this.OptionSelected=="year"){
      this.YearsAsArry=[]
      for(let i of this.LocalCarsManager.AllCars){
        if(this.YearsAsArry.indexOf(i.CarType.Year)==-1){
          this.YearsAsArry.push(i.CarType.Year)
        }
      }
      this.ShwoGearOptions=false;
      this.ShwoManufacturerOption=false;
      this.ShowYearOption=true;
    }
    if(this.OptionSelected=="Manufacturer"){
      this.ManufacturerAsArry=[]
      for(let i of this.LocalCarsManager.AllCars){
        if(this.ManufacturerAsArry.indexOf(i.CarType.Manufacturer)==-1){
          this.ManufacturerAsArry.push(i.CarType.Manufacturer)
        }
      }
      this.ShwoGearOptions=false;
      this.ShowYearOption=false;
      this.ShwoManufacturerOption=true;
    }
  }




  //search acording to gear
  ShwoGearOptions:boolean;
  GearOptions:Array<string>=["otomati","manul"]
  ChosenGear:string;
  GearHandler(event:any){
    this.ChosenGear=event.target.value
  }
////////////////////


//search acording to year
YearsAsArry:number[]=[]
ChosenYear:number;
ShowYearOption:boolean;

//search acording to Manufacturer
ManufacturerAsArry:string[]=[]
chosenManufacture:string;
ShwoManufacturerOption:boolean;


//search
SearchForCars():void{
  this.ShowAllCars=false
  this.SearchCarsArry=[]
  if(this.OptionSelected=="full list"){
    this.ShwoGearOptions=false;
    this.ShowYearOption=false;
    this.ShwoManufacturerOption=false;
    this.ShowAllCars=true;
  }
  else if(this.OptionSelected=="gear"){
    if(this.ChosenGear=="otomati"){
      for(let i of this.LocalCarsManager.AllCars){
        if(i.CarStatus && i.CarType.IsAutomatic){
          this.SearchCarsArry.push(i)
        }
      }
    }
    else{
      for(let i of this.LocalCarsManager.AllCars){
        if(i.CarStatus && !i.CarType.IsAutomatic){
          this.SearchCarsArry.push(i)
        }
      }
    }
  }
  else if(this.OptionSelected=="year"){
    for(let i of this.LocalCarsManager.AllCars){
      if(i.CarStatus && i.CarType.Year==this.ChosenYear){
        this.SearchCarsArry.push(i)
      }
    }
  }
  else if(this.OptionSelected=="Manufacturer"){
    for(let i of this.LocalCarsManager.AllCars){
      if(i.CarStatus && i.CarType.Manufacturer==this.chosenManufacture){
        this.SearchCarsArry.push(i);
      }
    }
  }
}


  
 
  

    

  
  constructor(private myCarService:CarService,private myUserService:UserService) {
    this.LocalCarsManager=myCarService.CarManager;
    this.LocalUserManager=myUserService.UserManager;
    myCarService.InitCars()
    this.ShowAllCars=true;
   }

  ngOnInit() {
  }

}
