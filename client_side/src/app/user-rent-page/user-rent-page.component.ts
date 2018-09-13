import { Component, OnInit } from '@angular/core';
import { RentsModel } from '../shared/models/Rents.model';
import { UsersModel } from '../shared/models/Users.model';
import { RentsService } from '../shared/services/RentService.service';
import { UserService } from '../shared/services/UserService.service';

@Component({
  selector: 'app-user-rent-page',
  templateUrl: './user-rent-page.component.html',
  styleUrls: ['./user-rent-page.component.css']
})
export class UserRentPageComponent implements OnInit {
  LocalRentService:RentsModel={AllRents:undefined,SingleRent:undefined,SpeseficRent:undefined}
  LocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined}
  


  constructor(private myRentService:RentsService,private myUserService:UserService) { 
    this.LocalRentService=myRentService.RentManager;
    this.LocalUserManager=myUserService.UserManager;
    this.myRentService.GetSpesificRentsByUserName(this.LocalUserManager.SingleUser.UserName);
    
  }


  ngOnInit() {
  }

}
