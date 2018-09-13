import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/UserService.service';
import { UsersModel } from '../shared/models/Users.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  MyLocalUserManager:UsersModel={AllUsers:undefined,SingleUser:undefined};

  constructor(private myUserService:UserService) { 
    this.MyLocalUserManager=myUserService.UserManager;
  }

  ngOnInit() {
  }

}
