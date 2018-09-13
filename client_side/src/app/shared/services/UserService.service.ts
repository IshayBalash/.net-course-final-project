import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import {UsersModel} from "../models/Users.model"
import {UserModel} from "../models/User.model"




@Injectable()
export class UserService{
    UserManager:UsersModel=new UsersModel();
    Url="http://localhost:54743/api/Users"
    ImgUrl="http://localhost:54743/api/UserImg"//for the user img controler
    
    constructor(private myHttpClient:HttpClient){
    }

    InitUsers():void{
        this.myHttpClient.get(`${this.Url}`,{headers:{Authorization:`${this.UserManager.SingleUser.UserName} ${this.UserManager.SingleUser.UserPassword}`}}).subscribe((x:Array<UserModel>)=>{this.UserManager.AllUsers=x}
        )}   
    

    GetSpesificUser(usernameparam:string,passwordparam:string):void{
        this.myHttpClient.get(`${this.Url}?Username=${usernameparam}&password=${passwordparam}`).subscribe((x:UserModel)=>{this.UserManager.SingleUser=x})
    }

    AddNewUser(UserParam:UserModel,callback:(bool:boolean)=>void):void{
        this.myHttpClient.post<boolean>(`${this.Url}`,JSON.stringify(UserParam),{headers:{"content-type":"application/json"}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }

    EditUser(Usernameparam:string,Userparam:UserModel,callback:(bool:boolean)=>void):void{
        this.myHttpClient.put<boolean>(`${this.Url}?Username=${Usernameparam}`,JSON.stringify(Userparam),{headers:{"content-type":"application/json",Authorization:`${this.UserManager.SingleUser.UserName} ${this.UserManager.SingleUser.UserPassword}`}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }

    DeleteUser(Usernameparam:string,callback:(bool:boolean)=>void):void{
        this.myHttpClient.delete<boolean>(`${this.Url}?Username=${Usernameparam}`,{headers:{Authorization:`${this.UserManager.SingleUser.UserName} ${this.UserManager.SingleUser.UserPassword}`}}).subscribe(()=>{callback(true);},()=>{callback(false)});
    }



    UploudUserImg(caption: string, fileToUpload: File){
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this.myHttpClient.post(`${this.ImgUrl}?ImgNameparam=${caption}`, formData);
    }




    UserValidation(Userparam:UserModel):boolean{
        //check lenght of user name
        if(Userparam.FullName.length<3){
          alert("User Full name must more than 3 letters")
          return false;
        }
        //check UserIdValidation
        
        if(!this.UserIdValidation(Userparam.UserIdNumber)){
          alert("Id is not valid")
          return false;
        }
    
        //check user name
        if(Userparam.UserName.length<2){
          alert("user name must contain more than 2 leters")
          return false;
        }
        //check user password
        if(Userparam.UserPassword.length<4 || Userparam.UserPassword.length>9 ){
          alert("the password must be from 4 digits/letters to 9")
          return false;
        }
        //check if the password contain both letters and digits
        let IsDigits:boolean=false
        let IsLetters:boolean=false
        for (let i:number=0;i<Userparam.UserPassword.length;i++){
          //check if the input is a letter acording to the hasci table
          let num=Userparam.UserPassword.charCodeAt(i);
          if(num>=99 && num <= 122){
            IsLetters=true
          }
          if(Number(Userparam.UserPassword[i])!=NaN){
            IsDigits=true;
          }
        }
        if(!IsDigits || !IsLetters){
          alert("Password must contain both letters and digits")
          return false;
        }
        return true
      }
    
      
      UserIdValidation(param:string):boolean{
        if(param.length!=9){
          alert("id must include 9 digits")
          return false
        }
         let FirstRow:number[]=new Array<number>();
         for(let i of param){
          FirstRow.push(Number(i));
         }
         let SecondRow:number[]=new Array<number>();
         for(let i=0;i<param.length;i++){
           let num:number=(i%2==0)?1:2;
           SecondRow.push(num);
           }
    
           let ThiredRow:number[]=new Array<number>();
           for(let i:number=0;i<param.length;i++){
             ThiredRow.push(FirstRow[i]*SecondRow[i]);
           }
           
           let FourthRow:number[]=new Array<number>();
           for(let i:number=0;i<param.length;i++){
            if(ThiredRow[i] > 9){    
            let FirstDigit:number=Math.floor(ThiredRow[i]/10);
            let SecondDigit:number=(ThiredRow[i]%10);
            FourthRow.push(FirstDigit+SecondDigit);
            }
            else{
              FourthRow.push(ThiredRow[i])
            }
          }
    
          let Result:number=0;
          for(let i of FourthRow){
            Result +=i;
          }
          if(Result % 10 == 0){
            return true;
          }
          return false
          }
    

        
}

    
