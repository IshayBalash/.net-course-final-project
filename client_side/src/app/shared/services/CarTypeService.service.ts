import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CarTypseMode } from "../models/CarTypes.model";
import { CarTypeModel } from "../models/CarType.model";
import { UsersModel } from "../models/Users.model";
import { UserService } from "./UserService.service";
import { MainServerUr } from "./MainServerUrl.service";



@Injectable()
export class CarTypeService{
    private Url=`${this.ServerService.UrlServer}/CarTypes`
    
    CarTypeManager:CarTypseMode=new CarTypseMode();
    LocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined};
    
    
    

    constructor(private myHttpClient:HttpClient,private myUserService:UserService,private ServerService:MainServerUr){
        this.LocalUserManager=myUserService.UserManager
    }

    InitCarTypes():void{
        this.myHttpClient.get(this.Url,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe((x:Array<CarTypeModel>)=>{this.CarTypeManager.AllCarTypes=x;}
        )}   
    

    GetSpesificCarType(cartypemodelparam:string):void{
        this.myHttpClient.get(`${this.Url}?cartypemodel=${cartypemodelparam}`,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe((x:CarTypeModel)=>{this.CarTypeManager.SingleCarType=x})
    }

    AddNewCarType(CartypeParam:CarTypeModel,callback:(bool:boolean)=>void):void{
        this.myHttpClient.post<boolean>(`${this.Url}`,JSON.stringify(CartypeParam),{headers:{"content-type":"application/json",Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`},}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }

    EditCarType(cartypemodelparam:string,CartypeParam:CarTypeModel,callback:(bool:boolean)=>void):void{
        this.myHttpClient.put<boolean>(`${this.Url}?cartypemodel=${cartypemodelparam}`,JSON.stringify(CartypeParam),{headers:{"content-type":"application/json",Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }

    DeleteCarType(cartypemodelparam:string,callback:(bool:boolean)=>void):void{
        this.myHttpClient.delete<boolean>(`${this.Url}?cartypemodel=${cartypemodelparam}`,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }

        
}
