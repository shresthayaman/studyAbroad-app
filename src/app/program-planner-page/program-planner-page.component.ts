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

  //selected fields for input. They dynamically get set to a specific value based on the input
  selectedMajor = "";
  selectedTerm = "";
  selectedProgram = "";
  selectedCountry = ""; 

  // all the majors for selection
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

  // all the majors for selection
  terms = [
    "Any",
    "Spring",
    "Summer",
    "Fall",
    "J-term",
  ]


  data = []; // array of objects genereated by convertToWantedForm()

  programs= []; // array of all the programs only

  approvedCourses= []; // array of approved host courses for a specific program
  
  addedCourses = [];  // array of all the courses added by the user mnaually in the "Add Your Own Course" section"

  selectedCourses = []; // array of courses that were checked in either the "Approved Host Courses" section or "Add Your Own Class" section

  planner = this.userservice.isLoggedIn?this.userservice.PlannerFromSession: []; //if user is logged in then get planner items from session which is updated from SQL when the user logs in. If not make this empty

  /** 
   * When an user inputs thier own course that they found in their own research in the text input 
   * field (by eihter clicking the plus button or pressing enter on the keyboard), it will add 
   * the inputed text field into the addedCourses array. 
   * It will aslo clear the input and also do error validation (ex: when user enters nothing)
   **/
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

  /**
   * Check if the course being deleted is not selected. if it is display error messaage. 
   * If not selected, then it will delete the course from checklist
   * @param course The course that was selected to be delted
   */
  deleteAddedCourse(course){
    
    let isCourseSelected = false;
    for(let i = 0; i<this.selectedCourses.length; i++){
      if(this.selectedCourses[i].course == course){
        isCourseSelected = true;
      }
    }
    if(isCourseSelected){
      (<HTMLInputElement>document.getElementById("error_msg")).innerHTML = "*Please unselect the added course before delteing it";
    }
    else{
      this.addedCourses = this.addedCourses.filter(function (c) { return c != course });
      (<HTMLInputElement>document.getElementById("error_msg")).innerHTML = "";
    }

  }

  /**
   * If the user checks the box of a particular course from the "Approved Host Courses" section, 
   * it will be add it to the selectedCourses array. This action will display the check course 
   * into the Selected Courses section. The color of this will be green. 
   * 
   * (Logic displaying in the "Selected Course" section and for color is in the html section)
   **/
  handleCheckApproved(e){
    if( (<HTMLInputElement>document.getElementById(e.target.id)).checked ){
      this.selectedCourses.push({
        id: e.target.id,
        course: e.target.labels[0].innerText,
        approved: true,
      });
    }
    else{
      //removes the unchecked item from the selectedCourses list  by filtering out the unchecked value from the list
      //solution from: https://stackoverflow.com/questions/41865366/how-do-i-remove-an-object-from-an-array-with-a-matching-property
      this.selectedCourses = this.selectedCourses.filter(({ id }) => id !== e.target.id);  
    }
  
  }

  /**
   * If the user checks the box of a particular course from the "Add Your Own Class" section, 
   * it will be add it to the selectedCourses array. This action will display the check course 
   * into the Selected Courses section. The color of this will be red.
   * 
   * (Logic displaying in the "Selected Course" section and for color is in the html section)
   **/
  handleCheckUnapproved(e){
    if( (<HTMLInputElement>document.getElementById(e.target.id)).checked ){
      this.selectedCourses.push({
        id: e.target.id,
        course: e.target.labels[0].innerText,
        approved: false,
      });
    }
    else{
      //removes the unchecked item from the selectedCourses list  by filtering out the unchecked value from the list
      //solution from: https://stackoverflow.com/questions/41865366/how-do-i-remove-an-object-from-an-array-with-a-matching-property
      this.selectedCourses = this.selectedCourses.filter(({ id }) => id !== e.target.id);
    }
  }


  /**
   * This method is called whenever the major or term selection is changes. Everytime it changes, it makes a call to the SQL database 
   * and obtains all the transferred courses that match the selection. This data then gets converted to specifc format so that all the
   * courses are grouped by the specific program. Once it does that, we show only the prorgams that match the criteria of major and 
   * term selected.
   **/
  onChangeSelection(){ 
    let params = {
      major: this.selectedMajor,
      term: this.selectedTerm,
      country: this.selectedCountry

    }
    let stringParams = JSON.stringify(params);
    let baseUrl = 'https://engineersabroad.uvacreate.virginia.edu/sqlDatabasePHP'; //change based on local (http://localhost/CS4640/studyAbroad) or server
    //let baseUrl = 'http://localhost/CS4640/studyAbroad';
    this.http.get(baseUrl+'/getProgramsAndClasses.php?str='+stringParams)
      .subscribe((data)=>{
        //console.log(Object.keys(data).length);
        if(data==false || Object.keys(data).length == 0){ //if nothing could be found make the data equal to empty and the programs displayed to empty
          this.data = [];
          this.programs = [];
        }
        else{
          this.data = this.convertToWantedFormat(data);
          let arrOfPrograms = [];
          for(let i =0; i<this.data.length; i++){
            // when selecting programs frop menu each program will be formated "[Country] Program name"
            arrOfPrograms.push(this.data[i].program); 
          }
          this.programs = arrOfPrograms;
        }
      }, (error)=>{
        console.log('Error ', error);  // An error occurs, handle an error in some way
      })
      
  }

  /**
   * This method will loop through the array of transferred courses obtained from the database and make objects for for each program 
   * and add it an array of objects. This ensures that there is no duplicates in programs and that each program contains all the transferred courses 
   * for that specific program
   * @param arr The array of transferred courses that match the criterias from the search. Each transferred course is an element in this array
   * @returns Returns array of objects. This object contains the following fields: program (string, courses(array of objects), country(string)
   */
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

  /**
   * This method is called when the Get Transferred Courses button is clicked. 
   * This method will loop through the this.data variable (array of program objects created by convertToWantedFormat method)
   * and set approvedCourses (array of approved courses HostCourse) for the selected program
   */
  onSubmitFindCourses(form: any):void{
    if( this.checkFindCourses() ){ //if from is submited with valid info, then look through data for progams with same name as user selected and create an array of courses for it
      
      this.approvedCourses = []; //reset approved courses to be empty
      this.selectedCourses = []; //reset selected courses

      for(let i =0; i<this.data.length; i++){
        if(this.data[i].program == this.selectedProgram){ //if the selected program is found in data
          this.selectedCountry = this.data[i].country
          for(let j = 0; j< this.data[i].courses.length; j++){
             this.approvedCourses.push(this.data[i].courses[j].HostCourse )
          }
        }

      }
    }
    else{
      console.log('Invalid submission: ', form);
    }
    
  }

  /**
   * Check to insure proper fields are selected when the "Get Transferred Courses" button is clicked. If not then presents error message
   * @returns valid which is a boolean that states if the information was valid or not for obtaining transferred courses
   */
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

  
  /**
   * This method creates a planner object with the items in the "Selected Courses" section and adds it to the planner section.
   * If the user is logged it, it will also add the planner object into the SQL databse under the users account, so when they 
   * log back in the programs they made will still be displayed.
   */
  addToPlanner(){
    // First obtian information of UVA Course and the semester it was taken in based on the program name and Host Course.
    // To do this, loop through selected courses and if approved is true then loop through this.data (data from database that was converted 
    // into an array of objects) to find corresponding program and then find corresponding UVA course
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
    
    // creates a planner Object with all the infomration (program, selected transferred courses, and country)
    let plannerObj = {
      program: this.selectedProgram,
      courses: modifiedSelectedCourses,
      country: this.selectedCountry
      
    }

    //if user is not logged in add to planner
    if(this.userservice.isLoggedIn == false){
      this.planner.push(plannerObj);
    }
    

    // planner Object for SQL databse
    let plannerSQL = new plannerObject(this.userservice.isloggedInUserEmail, this.selectedProgram, JSON.stringify(modifiedSelectedCourses), this.selectedCountry);

    //if the user is logged in add to planner and save it
    if(this.userservice.isLoggedIn == true){
      //add planner object to SQL database
      this.userservice.addPlanerObjToDatabase(plannerSQL).subscribe((data) => {
        console.log('Response from backend ', data); 
        this.planner.push(plannerObj);  //if user is logged in and no error occurs when adding to database, add to planner
        }, (error) => {
              console.log('Error ', error);  // An error occurs, handle an error in some way
        }); 
      

        //add Planer to session
        this.userservice.setSessionForPlanner(this.planner); 
    }
    
  }

  
  /**
   * Removes a program from planner by specifc index. If the user is also logged in then, it also removes the planner object 
   * from SQL database and current session
   */ 
  removeProgram(i){
    let removedPlannerObject = new plannerObject(this.userservice.isloggedInUserEmail, this.planner[i].program, JSON.stringify(this.planner[i].courses), this.planner[i].country)

    this.userservice.deletePlanerObjFromDatabase(removedPlannerObject)
      .subscribe((data)=>{
        console.log('Response From backend: ', data);
      }), (error)=>{
        console.log("Error: ", error);
      }

    this.planner.splice(i,1);

    // if user is logged in, remove planner item from session and SQL databse
    if(this.userservice.isLoggedIn == true){
      this.userservice.setSessionForPlanner(this.planner);
    }

  }


  

  

 

    


}
