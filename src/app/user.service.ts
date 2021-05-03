import { Injectable, ɵɵpureFunction1 } from '@angular/core';
import { User } from './user';
import { plannerObject } from './plannerObject';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUserName = sessionStorage.getItem('loggedInUserName') ? sessionStorage.getItem('loggedInUserName') : "";
  private loggedInStatus = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  private registerStatus = false;
  private  loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') ? sessionStorage.getItem('loggedInUserEmail') : "";


  private userRole: BehaviorSubject<string> = new BehaviorSubject<string>("");
  userRole$: Observable<string> = this.userRole.asObservable();

  constructor(private http: HttpClient) { }

  baseUrl = 'https://engineersabroad.uvacreate.virginia.edu/sqlDatabasePHP';

  createUser(user: User): Observable<any>{
    return this.http.post(this.baseUrl + '/register.php', user);
  }

  login(user: User): Observable<any>{
    return this.http.post(this.baseUrl + '/login.php', user);
  }

  logout(user: User){
    let params = JSON.stringify(user);
    console.log(params);
    return this.http.get(this.baseUrl+ '/logout.php?str='+params);
  }

  setLoggedIn(value : boolean, name : string, email: string){
    this.loggedInStatus = value;
    sessionStorage.setItem('loggedIn', value.toString());

    this.loggedInUserName = name;
    sessionStorage.setItem('loggedInUserName', name);

    this.loggedInUserEmail = email;
    sessionStorage.setItem('loggedInUserEmail', email)
  }

  get isLoggedIn(){
    return JSON.parse(sessionStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  get isloggedInUserName(){
    return this.loggedInUserName;
  }

  get isloggedInUserEmail(){
    return this.loggedInUserEmail;
  }

  

  destroySession(){
    sessionStorage.clear();
    this.loggedInStatus =  false;
    this.loggedInUserName = "";
  }

  setRegistered(value: boolean){
    this.registerStatus = value;
  }
  get isRegistered(){
    return this.registerStatus;
  }

  // Get all role specifcally for the user (search sql roles table for useremail)
  getUserRole(email){
    let params = {
      email: email
    }
    let stringParams = JSON.stringify(params);
    let baseUrl = 'https://engineersabroad.uvacreate.virginia.edu/sqlDatabasePHP'; //change based on local or server

    return this.http.get(baseUrl+'/getUserRole.php?str='+stringParams) 
      
  }

  onLoginGetUserRole(){
    console.log("isLoggedIN when getting role: ", this.isLoggedIn);
    if(this.isLoggedIn == true){
      this.getUserRole(this.isloggedInUserEmail)
      .subscribe((data)=>{ 
        this.setUserRole(data[0].AuthorizationLevel);
        sessionStorage.setItem('userRole', data[0].AuthorizationLevel);
      }, (error)=>{
        console.log('Error getting user role', error);  // An error occurs, handle an error in some way
      })
    }
  }

  setUserRole(value: string){
    this.userRole.next(value);
  }
  get isUserRole(){
    return this.userRole;
  }

  get UserRoleFromSession(){
    return sessionStorage.getItem('userRole');
  }

  setSessionForPlanner(plannerItems){
    sessionStorage.setItem('planner', JSON.stringify(plannerItems))
  }

  get PlannerFromSession(){
    
    return JSON.parse(sessionStorage.getItem('planner')) == null? [] : JSON.parse(sessionStorage.getItem('planner'));
  }

  //add planner object to SQL database
  addPlanerObjToDatabase(plannerObj: plannerObject): Observable<any>{
    return this.http.post(this.baseUrl + '/addToPlanner.php', plannerObj)
  }

  // Get all planner object specifcally for the user (search sql planner table for useremail)
  getUserPlannerObjects(email){

    let params = {
      email: email
    }
    let stringParams = JSON.stringify(params);
    let baseUrl = 'https://engineersabroad.uvacreate.virginia.edu/sqlDatabasePHP'; //change based on local or server

    return this.http.get(baseUrl+'/getUserPlannerObjects.php?str='+stringParams)
      
  }

  // once logged in call this function to get planner items from SQL
  onLoginGetPlannerDataForUser(){
    if(this.isLoggedIn == true){
      this.getUserPlannerObjects(this.isloggedInUserEmail)
      .subscribe((data)=>{
        this.addFromSQLToPlanner(data)
        window.location.reload();
      }, (error)=>{
        console.log('Error geeting planner data', error);  // An error occurs, handle an error in some way
      })
    }
  }

  addFromSQLToPlanner(userPlannerData){
    if(userPlannerData==false || Object.keys(userPlannerData).length == 0){ //if nothing could be found make the data equal to empty and the programs displayed to empty
      console.log("No planner data for user")
    }
    else{
      let initialPlanner = [];
      try{
        for(let i = 0; i<userPlannerData.length; i++){
          console.log()
          let plannerObj = {
            program: userPlannerData[i].program,
            courses: JSON.parse(userPlannerData[i].transferredCourses), //convert string stored in sql back to object
            country: userPlannerData[i].country
          }
          initialPlanner.push(plannerObj);
        }
        this.setSessionForPlanner(initialPlanner); //update planner in session
      }catch(e){
        console.error(e);
      }
    }
  }


  //delete planner object from SQL database
  deletePlanerObjFromDatabase(plannerObj: plannerObject): Observable<any>{
    return this.http.post(this.baseUrl + '/deleteFromPlanner.php', plannerObj)
    
  }

}
