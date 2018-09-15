import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/UserService.service';
import { UsersModel } from '../shared/models/Users.model';
import { UserModel } from '../shared/models/User.model';

@Component({
  selector: 'app-user-manager-page',
  templateUrl: './user-manager-page.component.html',
  styleUrls: ['./user-manager-page.component.css']
})
export class UserManagerPageComponent implements OnInit {

  ServerImgLink="http://localhost:54743/UsersImages"
  LocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined}
  UserForEdit:UserModel;//this parameter will get his value only if the admin press edit user


  //boolen members//
  ShwoUserTable:boolean
  ShowEditSection:boolean
  ShwoAddSection:boolean

  DistincBetweenAddAndEdit:boolean=true//true for Add false For edit



   //resulte messages///
   DeleteMessage:string;
   AddMessage:string;
   EditMessage:string;



  constructor(private myUserService:UserService) {
    this.LocalUserManager=myUserService.UserManager
    this.myUserService.InitUsers()
    this.ShwoUserTable=true;
    this.ShowEditSection=false
    this.ShwoAddSection=false;
   }


   BackToList():void{
     if(this.DeleteMessage=="User has been deleted"||this.AddMessage=="User has been added"||this.EditMessage=="User has been edit"){
      this.myUserService.InitUsers()
      this.DeleteMessage=null;
      this.AddMessage=null;
      this.EditMessage=null;
      this.myUserService.InitUsers();
    }
    //set all user parameters to undefine
       this.ShwoUserTable=true;
       this.ShowEditSection=false;
       this.ShwoAddSection=false;
       this.DeleteMessage=null;
       this.UserFullNameParam=undefined;
       this.UserFullNameParam=undefined;
       this.UserIdNumberParam=undefined;
       this.UserNameParam=undefined
       this.UserPasswordParam=undefined;
       this.UserEmailParam=undefined;
       this.UserSexParam=undefined;
       this.UserSexAsAstring=undefined;
       this.UserForEdit=undefined;
       this.UserBirthDateParam=undefined;
       this.imageUrl = "";
       this.fileToUpload = null;
       
   }

   OpenAddSection():void{
     this.ShwoAddSection=true;
     this.ShwoUserTable=false;
     this.DistincBetweenAddAndEdit=true;
   }


   ////////edit section////////
   //for edit i will use the same parameter as the add section
   OpenEditSections(UserEditParam:UserModel):void{
     this.OpenAddSection()
     this.UserForEdit=UserEditParam;
     this.DistincBetweenAddAndEdit=false;
   }
   EditUser():void{
    this.UserForEdit.FullName=(this.UserFullNameParam)?this.UserFullNameParam:this.UserForEdit.FullName;
    this.UserForEdit.UserBirthDate=(this.UserBirthDateParam)?this.UserBirthDateParam:this.UserForEdit.UserBirthDate;
    this.UserForEdit.UserIdNumber=(this.UserIdNumberParam)?this.UserIdNumberParam:this.UserForEdit.UserIdNumber;
    this.UserForEdit.UserEmail=(this.UserEmailParam)?this.UserEmailParam:this.UserForEdit.UserEmail;
    this.UserForEdit.UserPassword=(this.UserPasswordParam)?this.UserPasswordParam:this.UserForEdit.UserPassword;
    this.UserForEdit.UserSex=(this.UserSexAsAstring)?this.UserSexParam:this.UserForEdit.UserSex
    this.UserForEdit.UserAuthorization=(this.UserAuthorizationAsAString)?this.UserAuthorizationParam:this.UserForEdit.UserAuthorization;
    if(!this.myUserService.UserValidation(this.UserForEdit)){
      return;
    }
    let callback=(bool:boolean)=>{this.EditMessage=(bool)?"User has been edit":"something went wrong";}
    this.myUserService.EditUser(this.UserForEdit.UserName,this.UserForEdit,callback)
  }
      
   




   //////Add User Section//////

   UserFullNameParam:string;
   UserIdNumberParam:string;
   UserNameParam:string;
   UserPasswordParam:string;
   UserEmailParam:string;


  UserSexParam:boolean
  UserSexAsAstring:string
  UserGenderOption=["Male","Female"]
  RadioChangeHanndler(event:any):void{
    this.UserSexAsAstring=event.target.value;
    this.UserSexParam=(this.UserSexAsAstring=="Male")?true:false
  }

  UserAuthorizationParam:number
  UserAuthorizationAsAString:string;
  UserAuthorizationOptions=["Admin","Employ","Client"]
  RadioChangeHandlerForAuthorization(event:any):void{
    this.UserAuthorizationAsAString=event.target.value;
    if(this.UserAuthorizationAsAString=="Admin"){
      this.UserAuthorizationParam=2;
    }
    else if(this.UserAuthorizationAsAString=="Employ"){
      this.UserAuthorizationParam=1;
    }
    else if(this.UserAuthorizationAsAString=="Client"){
      this.UserAuthorizationParam=0;
    }
  }

  UserBirthDateParam:Date

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
  UplodeUserImg() {
    this.myUserService.UploudUserImg(this.UserNameParam,this.fileToUpload)
      .subscribe(data => { console.log('done'); });
  } 

  AddNewUser():void{
    let NewUser:UserModel={FullName:this.UserFullNameParam,
    UserIdNumber:this.UserIdNumberParam,
    UserBirthDate:this.UserBirthDateParam,
    UserAuthorization:this.UserAuthorizationParam,
    UserEmail:this.UserEmailParam,
    UserName:this.UserNameParam,
    UserSex:this.UserSexParam,
    UserPassword:this.UserPasswordParam,
    UserImg:`${this.UserNameParam}.jpg`
    };
    if(!this.myUserService.UserValidation(NewUser)){
      return;
    }
    let callback=(bool:boolean)=>{this.AddMessage=(bool)?"User has been added":"something went wrong";}
    this.myUserService.AddNewUser(NewUser,callback)
    if(this.fileToUpload){
      this.UplodeUserImg();
    }
  }






   ///delete section///
   DeleteUser(UserParam:UserModel):void{
     alert("in order to delete user, admin must delete all rent of that user")
     let callback=(bool:boolean)=>{this.DeleteMessage=(bool)?"User has been deleted":"something went wrong";}
     this.myUserService.DeleteUser(UserParam.UserName,callback)
   }

  ngOnInit() {
  }

}
