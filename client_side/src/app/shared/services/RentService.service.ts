import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { RentModel } from "../models/Rent.model";
import { RentsModel } from "../models/Rents.model";
import { UsersModel } from "../models/Users.model";
import { UserService } from "./UserService.service";


@Injectable()
export class RentsService{
        RentManager:RentsModel=new RentsModel();
        LocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined};
        Url="http://localhost:54743/api/Rents"
    
    constructor(private myHttpClient:HttpClient, private myUserService:UserService){
        this.LocalUserManager=myUserService.UserManager
    }

    InitAllRents():void{
        this.myHttpClient.get(`${this.Url}`,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe((x:Array<RentModel>)=>{this.RentManager.AllRents=x;}
        )}   
    

    GetSpesificRentById(RentId:number):void{
        this.myHttpClient.get(`${this.Url}?RentIdParam=${RentId}`).subscribe((x:RentModel)=>{this.RentManager.SingleRent=x})
    }

    GetSpesificRentsByCarLicence(LicenceNumber:string):void{
        this.myHttpClient.get(`${this.Url}?StringParam=${LicenceNumber}`,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe((x:Array<RentModel>)=>{this.RentManager.SpeseficRent=x})
    }

    GetSpesificRentsByUserName(Username:string):void{
        this.myHttpClient.get(`${this.Url}?StringParam=${Username}`,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe((x:Array<RentModel>)=>{this.RentManager.SpeseficRent=x})
    }
    
    AddNewRent(RentParam:RentModel,callback:(bool:boolean)=>void):void{
        this.myHttpClient.post<boolean>(`${this.Url}`,JSON.stringify(RentParam),{headers:{"content-type":"application/json",Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }

    EditRent(RentId:Number,Rentparam:RentModel,callback:(bool:boolean)=>void):void{
        this.myHttpClient.put<boolean>(`${this.Url}?RentIdParam=${RentId}`,JSON.stringify(Rentparam),{headers:{"content-type":"application/json",Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }

    DeleteRent(RentId:number,callback:(bool:boolean)=>void):void{
        this.myHttpClient.delete<boolean>(`${this.Url}?RentIdParam=${RentId}`,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }

        
}
