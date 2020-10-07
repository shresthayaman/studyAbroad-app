import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUserName = sessionStorage.getItem('loggedInUserName') ? sessionStorage.getItem('loggedInUserName') : "";
  private loggedInStatus = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  private registerStatus = false;

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost/CS4640/studyAbroad';

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

  setLoggedIn(value : boolean, name : string){
    this.loggedInStatus = value;
    sessionStorage.setItem('loggedIn', value.toString());

    this.loggedInUserName = name;
    sessionStorage.setItem('loggedInUserName', name);
  }
  get isLoggedIn(){
    return JSON.parse(sessionStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  get isloggedInUserName(){
    return this.loggedInUserName;
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

  setSessionForPlanner(plannerItems){
    sessionStorage.setItem('planner', JSON.stringify(plannerItems))
  }

  get PlannerFromSession(){
    
    return JSON.parse(sessionStorage.getItem('planner')) == null? [] : JSON.parse(sessionStorage.getItem('planner'));
  }
}
