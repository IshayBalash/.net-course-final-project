import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CarsModel } from "../models/Cars.model";
import {CarModel} from "../models/Car.model";
import { UsersModel } from "../models/Users.model";
import { UserService } from "./UserService.service";


@Injectable()
export class CarService{
    Url="http://localhost:54743/api/Cars"
    ImgUrl="http://localhost:54743/api/CarImg"//for the car img controler

    CarManager:CarsModel=new CarsModel();
    LocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined}
    
       
    constructor(private myHttpClient:HttpClient,private myUserService:UserService){
        this.LocalUserManager=myUserService.UserManager;
    }

    InitCars():void{
        this.myHttpClient.get(`${this.Url}`).subscribe((x:Array<CarModel>)=>{this.CarManager.AllCars=x;}
        )}   
    

    GetSpesificCar(CarLicenceNumberParam:string):void{
        this.myHttpClient.get(`${this.Url}?carLicenceNumber=${CarLicenceNumberParam}`).subscribe((x:CarModel)=>{this.CarManager.SingleCar=x})
    }

    AddNewCar(CarParam:CarModel,callback:(bool:boolean)=>void):void{
        this.myHttpClient.post<boolean>(`${this.Url}`,JSON.stringify(CarParam),{headers:{"content-type":"application/json",Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }

    EditCar(CarLicenceNumberParam:string,CarParam:CarModel,callback:(bool:boolean)=>void):void{
        this.myHttpClient.put<boolean>(`${this.Url}?licencenumber=${CarLicenceNumberParam}`,JSON.stringify(CarParam),{headers:{"content-type":"application/json",Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }

    DeleteCar(CarLicenceNumberParam:string,callback:(bool:boolean)=>void):void{
        this.myHttpClient.delete<boolean>(`${this.Url}?licencenumber=${CarLicenceNumberParam}`,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }



    UploudCarImg(caption: string, fileToUpload: File){
        const formData: FormData = new FormData();
        formData.append('Image', fileToUpload, fileToUpload.name);
        formData.append('ImageCaption', caption);
        return this.myHttpClient.post(`${this.ImgUrl}?ImgNameparam=${caption}`,formData,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}})
        }
        
}
