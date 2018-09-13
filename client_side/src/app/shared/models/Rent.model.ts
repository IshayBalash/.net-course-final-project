import {CarModel} from "../models/Car.model"
import {UserModel}from "../models/User.model"

export interface RentModel{
 RentID?:number;
 CarInfo:CarModel 
 UserInfo:UserModel;
 StartDate:Date;
 EndDate:Date;
 ReturnDate:Date;
}

