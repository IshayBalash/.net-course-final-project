import { Component, OnInit } from '@angular/core';
import { CarsModel } from '../shared/models/Cars.model';
import { CarService } from '../shared/services/CarService.service';
import { CarTypseMode } from '../shared/models/CarTypes.model';
import { CarTypeService } from '../shared/services/CarTypeService.service';
import { BranchesModel } from '../shared/models/Branches.model';
import { BranceService } from '../shared/services/BrancheService.service';
import { CarModel } from '../shared/models/Car.model';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-car-manager-page',
  templateUrl: './car-manager-page.component.html',
  styleUrls: ['./car-manager-page.component.css']
})
export class CarManagerPageComponent implements OnInit {
 
  LocalCarManager:CarsModel={AllCars:undefined,SingleCar:undefined}
  LocalCarTypeManager:CarTypseMode={AllCarTypes:undefined,SingleCarType:undefined}
  LocalBrancheManager:BranchesModel={AllBranches:undefined,SingleBranch:undefined}



  //boolen parameters
  ShowCarTable:boolean
  ShwoAddSection:boolean;
  DistincBetweenAddAndEdit:boolean//true for add false for edit

  //client message parameters
  AddMessage:string;
  EditMessage:string;
  DeleteMessage:string;

  //Set Car Reference varibleles
  SetCarType():void{
    for(let i of this.LocalCarTypeManager.AllCarTypes){
      if(this.CarTypeModelAsString==i.Model){
        this.LocalCarTypeManager.SingleCarType=i;
        break;
      }
    }
  }
  SetBranche():void{
    for(let i of this.LocalBrancheManager.AllBranches){
      if(this.CarBrancheAsString==i.BranceName){
        this.LocalBrancheManager.SingleBranch=i;
        break;
      }
    }
  }

////////////////////////Add section///////////////////////////

private cleanVaribles():void{
  this.AddMessage=undefined;
  this.EditMessage=undefined;
  this.DeleteMessage=undefined;
  this.NewCarKilometer=undefined;
  this.NewCarLicenceNumber=undefined;
  this.NewCarStatus=undefined;
  this.NewCarStatusAsString=undefined;
  this.CarTypeModelAsString=undefined;
  this.CarBrancheAsString=undefined;
  this.LocalCarManager.SingleCar=undefined;
  this.LocalCarTypeManager.SingleCarType=undefined;
  this.LocalBrancheManager.SingleBranch=undefined;
}


OpenAddSection():void{
    this.cleanVaribles();
    this.myBrancheService.InitBranches();
    this.myCarTypeService.InitCarTypes();
    this.ShowCarTable=false;
    this.ShwoAddSection=true;
    this.DistincBetweenAddAndEdit=true;
  }

  OpenEditSection(carparam:CarModel):void{
    this.OpenAddSection()
    this.DistincBetweenAddAndEdit=false;
    this.LocalCarManager.SingleCar=carparam;
  }

  BackToTable():void{
  if(this.AddMessage=="New car have been added"||this.EditMessage=="the car has been edited"||this.DeleteMessage=="car has been deleted"){
      this.myCarService.InitCars()
  }
   this.cleanVaribles();
   this.ShowCarTable=true;
   this.ShwoAddSection=false;
   this.DistincBetweenAddAndEdit=undefined;
   }
  

  EditCar():void{
    //save the old car licence for the server
    let oldCarLicenceNumber=this.LocalCarManager.SingleCar.CarlicenseNumber;
    
    //check if there was cahnge in the car type or branche
    if(this.CarTypeModelAsString){
      this.SetCarType();
    }
    if(this.CarBrancheAsString){
      this.SetBranche()
    }


    this.LocalCarManager.SingleCar.CarlicenseNumber=(this.NewCarLicenceNumber)?this.NewCarLicenceNumber:this.LocalCarManager.SingleCar.CarlicenseNumber;
    this.LocalCarManager.SingleCar.CarKilometer=(this.NewCarKilometer)?this.NewCarKilometer:this.LocalCarManager.SingleCar.CarKilometer;
    this.LocalCarManager.SingleCar.CarStatus=(this.NewCarStatus!=undefined)?this.NewCarStatus:this.LocalCarManager.SingleCar.CarStatus;
    this.LocalCarManager.SingleCar.CarType=(this.LocalCarTypeManager.SingleCarType)?this.LocalCarTypeManager.SingleCarType:this.LocalCarManager.SingleCar.CarType;
    this.LocalCarManager.SingleCar.CarLocation=(this.LocalBrancheManager.SingleBranch)?this.LocalBrancheManager.SingleBranch:this.LocalCarManager.SingleCar.CarLocation
    
    let callback=(bool:boolean)=>{this.EditMessage=(bool)?"the car has been edited" : "Something went wrong please try again later"};
    this.myCarService.EditCar(oldCarLicenceNumber,this.LocalCarManager.SingleCar,callback);
  }

  //new car varibles//
  NewCarLicenceNumber:string;
  NewCarKilometer:number;
  //car status
  RadioOptionsForCarStatus:Array<string>=["in order","out of order"]
  NewCarStatusAsString:string;
  NewCarStatus:boolean
  RadioChangeHandlerForCarStatus(event:any){
    this.NewCarStatusAsString=event.target.value;
    this.NewCarStatus=(this.NewCarStatusAsString=="in order")?true:false
  }
  CarTypeModelAsString:string;
  CarBrancheAsString:string;


  //ImgSection////
  imageUrl: string = "";
  fileToUpload: File = null;
  handleFileInput(file: FileList) {
    //Save image to the class property
    this.fileToUpload = file.item(0);
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => { this.imageUrl = event.target.result; }
    reader.readAsDataURL(this.fileToUpload);
  }
  UplodeCarImg() {
    this.myCarService.UploudCarImg(this.NewCarLicenceNumber,this.fileToUpload)
      .subscribe(data => { console.log('done'); });
  }


  AddNewCar():void{
    //insert a validation functions
    this.SetBranche();
    this.SetCarType();
    let NewCar:CarModel={
      CarKilometer:this.NewCarKilometer,
      CarlicenseNumber:this.NewCarLicenceNumber,
      CarImg:`${this.NewCarLicenceNumber}.jpg`,
      CarLocation:this.LocalBrancheManager.SingleBranch,
      CarType:this.LocalCarTypeManager.SingleCarType,
      CarStatus:this.NewCarStatus
    }
    let callback=(bool:boolean)=>{this.AddMessage=(bool)?"New car have been added" : "Something went wrong please try again later"};
    this.UplodeCarImg();
    this.myCarService.AddNewCar(NewCar,callback);
  }

  DeleteCar(Carparam:CarModel):void{
    alert("if there are orders with the this car you cant delte this car.")
    alert("if you wish to remove him from the list gust go the edit and put him out of use")
    let callback=(bool:boolean)=>{this.DeleteMessage=(bool)?"car has been deleted":"Something went wrong please try again later"};  
    this.myCarService.DeleteCar(Carparam.CarlicenseNumber,callback);
  }





  constructor(private myCarService:CarService,private myCarTypeService:CarTypeService,private myBrancheService:BranceService) {
    this.ShowCarTable=true;
    this.ShwoAddSection=false;
    this.LocalCarManager=myCarService.CarManager;
    this.LocalCarTypeManager=myCarTypeService.CarTypeManager;
    this.LocalBrancheManager=myBrancheService.BrancheManager
    this.myCarService.InitCars();
   }

  ngOnInit() {
  }

}
