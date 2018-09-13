import { Component, OnInit, trigger } from '@angular/core';
import { UserService } from '../shared/services/UserService.service';
import { UsersModel } from '../shared/models/Users.model';
import { UserModel } from '../shared/models/User.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  

  MyLocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined};


  ///////Boolena members/////
  OpenRegisterPage:boolean=false;
  




  MoveToRegister():void{
   this.OpenRegisterPage=true;
  }

  BackToLogIn():void{
    this.OpenRegisterPage=false;
  }



  ////////////LogIn////////////////////////////////////
  Username:string;
  UserPassword:string;
  ShwoUsername:boolean=false;
  Message:string;

  LogIn():void{
    if(this.Username==undefined||this.Username==""){
      this.Message="Must Enter User name"
      return;
    }
    else if(this.UserPassword==undefined||this.UserPassword==""){
      this.Message="Must Enter password"
      return;
    }
    this.myUserService.GetSpesificUser(this.Username,this.UserPassword);
  }



  ////////////////Register///////

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
  UplodeUserImg() {
    this.myUserService.UploudUserImg(this.UserNameParam,this.fileToUpload)
      .subscribe(data => { console.log('done'); });
  }
  ////////////////////////////

  //UserInfo section
  UserFullNameParam:string;
  UserIdNumberParam:string;
  UserNameParam:string;
  UserPasswordParam:string;
  UserBirthDateParam:Date;
  UserEmailParam:string;

  UserSexParam:boolean
  UserSexAsAstring:string
  UserGenderOption=["Male","Female"]
  RadioChangeHanndler(event:any){
    this.UserSexAsAstring=event.target.value;
    this.UserSexParam=(this.UserSexAsAstring=="Male")?true:false
  }
  
  

  DidRegisterWorked:string;
  SubmitNewUser():void{
    if(this.UserFullNameParam==null||this.UserIdNumberParam==null||this.UserNameParam==null
    ||this.UserPasswordParam==null||this.UserSexAsAstring==null){
      alert("must insert user full name, ID, User name,UserSex, user password in order to register")
      return;
    }
    let NewUser:UserModel={FullName:this.UserFullNameParam,
      UserIdNumber:this.UserIdNumberParam
      ,UserName:this.UserNameParam
      ,UserBirthDate:this.UserBirthDateParam
      ,UserEmail:this.UserEmailParam
      ,UserPassword:this.UserPasswordParam
      ,UserSex:this.UserSexParam
      ,UserAuthorization:0
      ,UserImg:(this.fileToUpload)?`${this.UserNameParam}.jpg`:undefined
    }
    if(!this.myUserService.UserValidation(NewUser)){
      return
    }
    let callback=(bool:boolean)=>{this.DidRegisterWorked=(bool)?`Welcome ${this.UserFullNameParam}`:"Something went wrong please try again later"};
    this.myUserService.AddNewUser(NewUser,callback);
    if(this.fileToUpload){
       this.UplodeUserImg();
    }
  }


  


    


    
    
    
    
    

  

  constructor(private myUserService:UserService) { 
    this.MyLocalUserManager=myUserService.UserManager;
  }

  ngOnInit() {
  }

}
