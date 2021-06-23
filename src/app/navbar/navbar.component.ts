import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {switchMap,concatMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userservice: UserService) {   }

  loggedInStatus = false;
  registeredStatus = false;

  loggedInUser = "";
  userLoginModel = new User('','','','',false);
  userSUModel = new User('','','','',false); //user signup model

  userRole = this.userservice.isLoggedIn?this.userservice.UserRoleFromSession: "";

  ngOnInit(): void {
    this.loggedInStatus = this.userservice.isLoggedIn;
    this.loggedInUser = this.userservice.isloggedInUserName;
    this.userRole = this.userservice.UserRoleFromSession

  }


  onSubmitLogin(form: any): void {

    if(this.checkLogin()==false){
      this.userSUModel.email = "";
      this.userSUModel.password = "";
    }
    else{
      this.userservice.login(this.userLoginModel)  
      .subscribe((data) => {
            if(data != false){ //if login was succesfull and was able to find user in database
              this.userservice.setLoggedIn(true, data[0].name, data[0].email);
              this.loggedInStatus = this.userservice.isLoggedIn;
              this.loggedInUser = this.userservice.isloggedInUserName;
              (<HTMLInputElement>document.getElementById("invalidLogin_error_msg")).innerHTML = "";
            }else{//if login was unsuccesfull and was not able to find user in database
              this.userservice.setLoggedIn(false, "", "");
              this.loggedInStatus = this.userservice.isLoggedIn;
              (<HTMLInputElement>document.getElementById("invalidLogin_error_msg")).innerHTML = "*Invalid Login Credintials";
            } 

            // get userRole after succesful login
            this.userservice.onLoginGetUserRole();

            // add inital items for Planner from SQL database after succesfull login. Then reload page to update planner session 
            this.userservice.onLoginGetPlannerDataForUser()
            
      }, (error) => {
            console.log('Error during login: ', error);  // An error occurs, handle an error in some way
      })
    }
    
  }

  onSubmitRegister(form: any): void {
    console.log('You submitted value: ', this.userSUModel);
    if(this.checkSignUp()==false){
      this.userSUModel.name = "";
      this.userSUModel.email = "";
      this.userSUModel.password = "";
      this.userSUModel.confirmpassword = "";
      this.userSUModel.requestedAdminAccess = false;
    }
    else{
      this.userservice.createUser(this.userSUModel)
      .subscribe((data) => {
          console.log('Response from backend ', data);
          if(data != false){
            this.userservice.setRegistered(true);
            this.registeredStatus = this.userservice.isRegistered;
          }
          

      }, (error) => {
            console.log('Error ', error);  // An error occurs, handle an error in some way
      })
    }
  }

  onSubmitLogout(){
    this.userservice.logout(this.userLoginModel)
    .subscribe(data=>{
      console.log(data);
      if(data == true){
        this.userservice.destroySession();
        this.loggedInStatus = this.userservice.isLoggedIn;
        document.location.href=document.location.href;
      }
    })
  }

  // Ensures that user is putting in the right inputs for Login
  checkLogin(){
    let valid = true;
    if (this.userLoginModel.email.length <= 0)
    {
      (<HTMLInputElement>document.getElementById("email_error_msg")).innerHTML = "*Please input a email before clicking Login";
      valid = false;
    }   
    else {
      (<HTMLInputElement>document.getElementById("email_error_msg")).innerHTML = "";  
      (<HTMLInputElement>document.getElementById("email")).value = ""
    }
    
    if (this.userLoginModel.password.length <= 0)
    {
      (<HTMLInputElement>document.getElementById("password_error_msg")).innerHTML = "*Please input a password before clicking Login";
      valid = false;
    }   
    else {
      (<HTMLInputElement>document.getElementById("password_error_msg")).innerHTML = "";  
      (<HTMLInputElement>document.getElementById("password")).value = ""
    }
    return valid;


  }

  // Ensures that user is putting in the right inputs for Registering
  checkSignUp(){
    //var usernameInput = (<HTMLInputElement>document.getElementById("usernameSU")); 
    let valid = true;  

    if (this.userSUModel.name.length <= 0)
    {
      (<HTMLInputElement>document.getElementById("nameSU_error_msg")).innerHTML = "*Please enter your name";
      valid = false;
    }   
    else {
      (<HTMLInputElement>document.getElementById("nameSU_error_msg")).innerHTML = "";  
      (<HTMLInputElement>document.getElementById("nameSU")).value = ""
    }



    if (this.userSUModel.email.length <= 0)
    {
      (<HTMLInputElement>document.getElementById("emailSU_error_msg")).innerHTML = "*Please input a email before clicking Login";
      valid = false;
    }   
    else {
      (<HTMLInputElement>document.getElementById("emailSU_error_msg")).innerHTML = "";  
      (<HTMLInputElement>document.getElementById("emailSU")).value = ""
    }

    
    //var passwordInput = (<HTMLInputElement>document.getElementById("passwordSU"));     
    if (this.userSUModel.password.length <= 0)
    {
      (<HTMLInputElement>document.getElementById("passwordSU_error_msg")).innerHTML = "*Please input a password before clicking Sign Up";
      valid = false;
    }   
    else {
      (<HTMLInputElement>document.getElementById("passwordSU_error_msg")).innerHTML = "";  
      (<HTMLInputElement>document.getElementById("passwordSU")).value = ""
    }

   
   
 
    //var confirmpasswordInput = (<HTMLInputElement>document.getElementById("confirmpasswordSU"));   
    if (this.userSUModel.confirmpassword.length<=0)
    {
      (<HTMLInputElement>document.getElementById("confirmpasswordSU_error_msg")).innerHTML = "*Please input a password before clicking Sign Up";
      valid = false;
    }
    else if (this.userSUModel.confirmpassword!=this.userSUModel.password ){
      (<HTMLInputElement>document.getElementById("confirmpasswordSU_error_msg")).innerHTML = "*Password does not match";
      (<HTMLInputElement>document.getElementById("confirmpasswordSU")).value = ""
      valid = false;
    }   
    else {
      (<HTMLInputElement>document.getElementById("confirmpasswordSU_error_msg")).innerHTML = "";  
      (<HTMLInputElement>document.getElementById("confirmpasswordSU")).value = ""
    }

    return valid;

  }

}
