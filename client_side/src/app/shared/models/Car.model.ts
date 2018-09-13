import {CarTypeModel} from "../models/CarType.model";
import { BranchModel } from "./Branch.model";

export interface CarModel{

    CarType:CarTypeModel; 
    CarKilometer:number; 
    CarImg:string;  
    CarStatus:boolean;
    CarlicenseNumber:string;
    CarLocation:BranchModel;
}
