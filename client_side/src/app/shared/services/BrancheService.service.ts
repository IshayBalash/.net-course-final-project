import { BranchesModel } from "../models/Branches.model";
import { HttpClient } from "@angular/common/http";
import { BranchModel } from "../models/Branch.model";
import { Injectable } from "@angular/core";
import { UsersModel } from "../models/Users.model";
import { UserService } from "./UserService.service";



@Injectable()
export class BranceService{
    BrancheManager:BranchesModel={AllBranches:undefined,SingleBranch:undefined}
    LocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined}
    private Url="http://localhost:54743/api/Branches"

    InitBranches():void{
        this.myHttpClient.get(`${this.Url}`,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe((x:Array<BranchModel>)=>{this.BrancheManager.AllBranches=x;}
        )}
    GetSpesificBranche(brancheNameParam:string):void{
        this.myHttpClient.get(`${this.Url}?BranchName=${brancheNameParam}`,{headers:{Authorization:`${this.LocalUserManager.SingleUser.UserName} ${this.LocalUserManager.SingleUser.UserPassword}`}}).subscribe((x:BranchModel)=>{this.BrancheManager.SingleBranch=x;})
    }
    
    constructor(private myHttpClient:HttpClient,private myUserService:UserService){
        this.LocalUserManager=myUserService.UserManager
    }
}