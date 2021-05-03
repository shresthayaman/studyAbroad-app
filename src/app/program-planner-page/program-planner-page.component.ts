import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import {UserService} from "../user.service";
import { plannerObject } from '../plannerObject';
import { ChildActivationStart } from '@angular/router';

@Component({
  selector: 'app-program-planner-page',
  templateUrl: './program-planner-page.component.html',
  styleUrls: ['./program-planner-page.component.css']
})
export class ProgramPlannerPageComponent implements OnInit {

  constructor(private http: HttpClient, private userservice: UserService) { }
  
  ngOnInit(): void {}

  //selected fields for input
  selectedMajor = "";
  selectedTerm = "";
  selectedProgram = "";

  selectedCountry = ""; 

  majors = [
    "Any",
    "Aerospace Engineering", 
    "Biomedical Engineering", 
    "Chemical Engineering", 
    "Civil Engineeirng", 
    "Computer Engineering", 
    "Computer Science", 
    "Electrical Engineering", 
    "Engineering Science", 
    "Mechanical Engineering", 
    "Systems Engineering",
  ]
  terms = [
    "Any",
    "Spring",
    "Summer",
    "Fall",
    "J-term",
  ]


  programs= [];

  data = [];

  approvedCourses= [];
  
  addedCourses = []

  selectedCourses = [];

  planner = this.userservice.isLoggedIn?this.userservice.PlannerFromSession: [];

  //add course to array of courses that user inputed and clear input and also do error validation
  addCourse(){
    var input = (<HTMLInputElement>document.getElementById("addCourseInput"));   
    if (input.value.length <= 0)
    {
        (<HTMLInputElement>document.getElementById("error_msg")).innerHTML = "*Please input a course before adding";
    }   
    else {
        (<HTMLInputElement>document.getElementById("error_msg")).innerHTML = "";  
        let course = (<HTMLInputElement>document.getElementById("addCourseInput")).value;
        this.addedCourses.push(course);
        (<HTMLInputElement>document.getElementById("addCourseInput")).value = ""
    }


    

  };

  //if user checks box, add to array of selectedCourses so can display in selected course contianer
  handleCheckApproved(e){
    if( (<HTMLInputElement>document.getElementById(e.target.id)).checked ){
      this.selectedCourses.push({
        course: e.target.labels[0].innerText,
        approved: true,
      });
    }
    else{
      this.selectedCourses.splice(this.selectedCourses.indexOf({course: e.target.labels[0].innerText, approved: true}),1);
    }
  
  }

  handleCheckUnapproved(e){
    if( (<HTMLInputElement>document.getElementById(e.target.id)).checked ){
      this.selectedCourses.push({
        course: e.target.labels[0].innerText,
        approved: false,
      });
    }
    else{
      this.selectedCourses.splice(this.selectedCourses.indexOf({course: e.target.labels[0].innerText, approved: false}),1);
    }
  }

  onChangeSelection(){ 
    let params = {
      major: this.selectedMajor,
      term: this.selectedTerm,
    }
    let stringParams = JSON.stringify(params);
    let baseUrl = 'https://engineersabroad.uvacreate.virginia.edu/sqlDatabasePHP'; //change based on local or server

    this.http.get(baseUrl+'/getProgramsAndClasses.php?str='+stringParams)
      .subscribe((data)=>{
        //console.log(Object.keys(data).length);
        if(data==false || Object.keys(data).length == 0){ //if nothing could be found make the data equal to empty and the programs displayed to empty
          this.data = [];
          this.programs = [];
        }
        else{
          console.log(data)
          this.data = this.convertToWantedFormat(data);
          let arrOfPrograms = [];
          for(let i =0; i<this.data.length; i++){
            arrOfPrograms.push(this.data[i].program);
          }
          this.programs = arrOfPrograms;
        }
      }, (error)=>{
        console.log('Error ', error);  // An error occurs, handle an error in some way
      })
      
  }


  onSubmitFindCourses(form: any):void{
    if( this.checkFindCourses() ){ //if from is submited with valid info, then look through data for progams with same name as user selected and create an array of courses for it
      
      this.approvedCourses = []; //reset approved courses to be empty
      this.selectedCourses = []; //reset selected courses

      for(let i =0; i<this.data.length; i++){
        if(this.data[i].program == this.selectedProgram){ //if the selected program is found in data
          this.selectedCountry = this.data[i].country
          for(let j = 0; j< this.data[i].courses.length; j++){
             this.approvedCourses.push(this.data[i].courses[j].HostCourse)
          }
        }

      }
    }
    else{
      console.log('Invalid submission: ', form);
    }
    
  }

  checkFindCourses(){
    let valid = true;
    if (this.selectedProgram == "")
    {
      (<HTMLInputElement>document.getElementById("program_error_msg")).innerHTML = "*Please select a program first";
      valid = false;
    }   
    else {
      (<HTMLInputElement>document.getElementById("program_error_msg")).innerHTML = "";  
    }
    return valid;

  }

  convertToWantedFormat(arr){
    console.log("convertToWantedForm:" + arr);
    let arrayOfObj= [];
    for(let i=0; i<arr.length; i++ ){ //loop through array from database
      if(arrayOfObj.length == 0){ //if its the first item being added then create an object to add
        console.log("country:"+arr[i].country)
         arrayOfObj.push(
           {
             program: arr[i].program,
             courses: [
               {
                 UVAcourse: arr[i].UVAcourse,
                 HostCourse: arr[i].HostCourse,
                 Semester: arr[i].semester,
               }
             ],
             country: arr[i].country

           }
         )
      }
      else{
        let found = false;
        for(let j=0; j<arrayOfObj.length; j++){ //loop through already added arrayOf obj to check if the arr you are looping through has the same program name
          if(arrayOfObj[j].program == arr[i].program){
            found = true;
            arrayOfObj[j].courses.push(
              {
                UVAcourse: arr[i].UVAcourse,
                HostCourse: arr[i].HostCourse,
                Semester: arr[i].semester,
              }
            )
          }
        }
        if(found == false){
          arrayOfObj.push(
            {
              program: arr[i].program,
              courses: [
                {
                  UVAcourse: arr[i].UVAcourse,
                  HostCourse: arr[i].HostCourse,
                  Semester: arr[i].semester,
                }
              ],
              country: arr[i].country
 
            }
          )

        }
      }

    }

    return arrayOfObj;

  }

  addToPlanner(){
    //loop through selected courses and if approved is true then loop through data to find corresponding program and then find corresponding course
    let modifiedSelectedCourses = [];
    for(let i =0; i<this.selectedCourses.length; i++){
      if(this.selectedCourses[i].approved== true){
        for(let j=0; j<this.data.length; j++){
          if(this.data[j].program ==this.selectedProgram){
            for(let k=0; k<this.data[j].courses.length; k++){
              if(this.data[j].courses[k].HostCourse == this.selectedCourses[i].course){
                modifiedSelectedCourses.push({
                  HostCourse: this.selectedCourses[i].course,
                  UVAcourse: this.data[j].courses[k].UVAcourse,
                  semester: this.data[j].courses[k].Semester
                })
              }
            }
          }
        }
      }
      else{
        modifiedSelectedCourses.push({
          HostCourse: this.selectedCourses[i].course,
          UVAcourse: "[No approved UVA course yet]",
          semester: "-"
        })

      }
    }
    
    // old planner Object
    let plannerObj = {
      program: this.selectedProgram,
      courses: modifiedSelectedCourses,
      country: this.selectedCountry
      
    }

    //if user is not logged in add to planner
    if(this.userservice.isLoggedIn == false){
      this.planner.push(plannerObj);
    }
    

    // new planner Object for SQL databse
    let plannerSQL = new plannerObject(this.userservice.isloggedInUserEmail, this.selectedProgram, JSON.stringify(modifiedSelectedCourses), this.selectedCountry);

    console.log(plannerSQL)

    //if the user is logged in add to planner and save it
    if(this.userservice.isLoggedIn == true){
      //add planner object to SQL database
      this.userservice.addPlanerObjToDatabase(plannerSQL).subscribe((data) => {
        console.log('Response from backend ', data); 
        this.planner.push(plannerObj);  //if user is logged in and no error occurs when adding to database add to planner
        }, (error) => {
              console.log('Error ', error);  // An error occurs, handle an error in some way
        }); 
      

        //add Planer to session
        this.userservice.setSessionForPlanner(this.planner); 
    }
    
  }

  
  //removes a program from planner by specifc index and update session
  removeProgram(i){
    let removedPlannerObject = new plannerObject(this.userservice.isloggedInUserEmail, this.planner[i].program, JSON.stringify(this.planner[i].courses), this.planner[i].country)
    console.log(removedPlannerObject);

    this.userservice.deletePlanerObjFromDatabase(removedPlannerObject)
      .subscribe((data)=>{
        console.log('Response From backend: ', data);
      }), (error)=>{
        console.log("Error: ", error);
      }

    this.planner.splice(i,1);

    // if user is logged in, remove planner item from session and SQL
    if(this.userservice.isLoggedIn == true){
      this.userservice.setSessionForPlanner(this.planner);
    }

  }


  

  

 

    


}
