import { Component, OnInit } from '@angular/core';
import { RentsModel } from '../shared/models/Rents.model';
import { RentsService } from '../shared/services/RentService.service';
import { RentModel } from '../shared/models/Rent.model';
import { UsersModel } from '../shared/models/Users.model';
import { UserService } from '../shared/services/UserService.service';

@Component({
  selector: 'app-return-car-page',
  templateUrl: './return-car-page.component.html',
  styleUrls: ['./return-car-page.component.css']
})
export class ReturnCarPageComponent implements OnInit {
  LocalRentManager:RentsModel={AllRents:undefined,SingleRent:undefined,SpeseficRent:undefined};
  LocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined}
  OpenRents:Array<RentModel>=[];

  selectedUserName:string;
  UserRents:Array<RentModel>=[]
  
  ShwoAllRents:boolean;
  ShwoSpesificUserRents:boolean;
  ShwoSpesificRentInfo:boolean=false;



  GetAllRentsForUser():void{
    this.UserRents=[];
    for(let i of this.LocalRentManager.AllRents){
      if(i.UserInfo.UserName==this.selectedUserName){
        this.UserRents.push(i)
      }
      this.ShwoAllRents=false;
      this.ShwoSpesificRentInfo=false;
      this.ShwoSpesificUserRents=true;
    }

  }

  openAllRents():void{
    if(this.DidReturnWorks=="Rent is close"){
      this.myRentService.InitAllRents();
    }
    this.ShwoAllRents=true;
    this.ShwoSpesificRentInfo=false;
    this.ShwoSpesificUserRents=false;
  }

  
  
  
  
  

    
  
  DidReturnWorks:string;

  /////////////  spesific rent summary  //////////////
  RentID:number;
  startDate:Date;
  endDate:Date;
  DaysOfRent:number;
  DaysOfDelay:number;
  TotalNumToPay:number;

  Rentsummary(rent:RentModel):void{
    this.DidReturnWorks=undefined;
    this.RentID=rent.RentID;
    this.startDate=rent.StartDate;
    this.endDate=rent.EndDate;
    let Start:any = new Date(this.startDate);
    let end:any = new Date(this.endDate);
    let today:any=new Date();
    this.DaysOfRent=((end -Start) / (24 * 3600 * 1000))+1;
    this.DaysOfDelay=Math.floor((today-end) / (24 * 3600 * 1000));
    this.TotalNumToPay=this.DaysOfRent*rent.CarInfo.CarType.CostPerDay+this.DaysOfDelay*rent.CarInfo.CarType.FinePrice
    let Today:Date=new Date();
    
    this.ShwoSpesificRentInfo=true;
    this.ShwoAllRents=false;
    this.ShwoSpesificUserRents=false; 
  }

  ///////////////////////////////////////////////////////
  
  viewAllOpenRents():void{
    this.OpenRents=[];
    for(let i of this.LocalRentManager.AllRents){
      if(i.ReturnDate.toString()=="2100-01-01T00:00:00"){
            this.OpenRents.push(i);
        }
      }
}


BackToRentList():void{
    this.viewAllOpenRents()
    this.ShwoSpesificRentInfo=false
    this.ShwoSpesificUserRents=false;
    this.selectedUserName=undefined;
    this.ShwoAllRents=true;
  }

CloseRent():void{
    let RentToClose:RentModel;
    for(let i of this.LocalRentManager.AllRents){
      if(i.RentID == this.RentID){
        RentToClose=i;
        break;
      }
    }
      RentToClose.ReturnDate=new Date();
      let callback=(bool:boolean)=>{this.DidReturnWorks=(bool)?"Rent is close":"something went wrong";}
      this.myRentService.EditRent(RentToClose.RentID,RentToClose,callback)
    }

  


    

  constructor(private myRentService:RentsService,private myUserServic:UserService) {
    this.LocalRentManager=myRentService.RentManager;
    this.LocalUserManager=myUserServic.UserManager;
    this.myRentService.InitAllRents();
    this.ShwoAllRents=true;
    this.myUserServic.InitUsers();
    
    }
   


  ngOnInit() {
     }
}
