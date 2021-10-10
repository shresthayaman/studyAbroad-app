import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-transfer-database-page',
  templateUrl: './transfer-database-page.component.html',
  styleUrls: ['./transfer-database-page.component.css']
})
export class TransferDatabasePageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  majors = [
    "Any",
    "Aerospace Engineering", 
    "Biomedical Engineering", 
    "Chemical Engineering", 
    "Civil Engineering", 
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

  // values of the input fields in the transfer database that dynamically change
  selectedMajor = "";
  selectedTerm = "";
  freeSearchEntry = "";

  data = []; //array that holds the converted data
  empty = true; //boolean that states if the search result had any results

  mockdata = [
    {
      program: "UVA Echange: Universidad de Rio de Janerio",
      courses: [
        {
          UVAcourse: "SYS 3062 - Discrete Event Simulation",
          HostCourse: "ESA 1065-0 Perquisa Operational Research II",
          Semester: "Spring",
        },
        {
          UVAcourse: "SYS 4021 - Linear Statistical Models",
          HostCourse: "EST 1116-9 Generalized Linear Models",
          Semester: "Spring",
        },
        {
          UVAcourse: "ENGR 2595- Specia; Topics in Engineeirng",
          HostCourse: "EE 1426- Engineering of Work",
          Semester: "Fall",
        },
        {
          UVAcourse: "APMA 3081- Linear Algebra",
          HostCourse: "MATH 2121 Linear Algebra",
          Semester: "Spring",
        }
      ]
    },
    {
      program: "UVA Echange: Univeristy of Edinburgh",
      courses: [
        {
          UVAcourse: "SYS 3062 - Discrete Event Simulation",
          HostCourse: "ESA 1065-0 Perquisa Operational Research II",
          Semester: "Spring",
        },
        {
          UVAcourse: "SYS 4021 - Linear Statistical Models",
          HostCourse: "EST 1116-9 Generalized Linear Models",
          Semester: "Spring",
        },
        {
          UVAcourse: "ENGR 2595- Specia; Topics in Engineeirng",
          HostCourse: "EE 1426- Engineering of Work",
          Semester: "Fall",
        },
        {
          UVAcourse: "APMA 3081- Linear Algebra",
          HostCourse: "MATH 2121 Linear Algebra",
          Semester: "Spring",
        }
      ]
    },
    {
      program: "UVA Echange: The Hong Kiong University of Science & Technology",
      courses: [
        {
          UVAcourse: "SYS 3062 - Discrete Event Simulation",
          HostCourse: "ESA 1065-0 Perquisa Operational Research II",
          Semester: "Spring",
        },
        {
          UVAcourse: "SYS 4021 - Linear Statistical Models",
          HostCourse: "EST 1116-9 Generalized Linear Models",
          Semester: "Spring",
        },
        {
          UVAcourse: "ENGR 2595- Specia; Topics in Engineeirng",
          HostCourse: "EE 1426- Engineering of Work",
          Semester: "Fall",
        },
        {
          UVAcourse: "APMA 3081- Linear Algebra",
          HostCourse: "MATH 2121 Linear Algebra",
          Semester: "Spring",
        }
      ]
    },

  ]

  /**
   * This method will loop through the array of transferred courses obtained from the database and make objects for for each program 
   * and add it an array of objects. This ensures that there is no duplicates in programs and that each program contains all the transferred courses 
   * for that specific program. The form of the data is the same as the mock data format.
   * @param arr The array of transferred courses that match the criterias from the search. Each transferred course is an element in this array
   * @returns Returns array of objects. This object contains the following fields: program (string, courses(array of objects), country(string)
   */
  convertToWantedFormat(arr){
    let arrayOfObj= [];
    for(let i=0; i<arr.length; i++ ){ //loop through array from database
      if(arrayOfObj.length == 0){ //if its the first item being added then create an object to add
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
   * Gets the values of all the fields in the transfer database page (major, semester, and free search value)
   * and sends a request to the backend SQL database to get all the transferred courses that match those criteria.
   * Then populate it in this.data in its converted form.
   * @param form 
   */
  onSubmit(form: any):void{
    console.log('You submitted value: ', form);
    let params = JSON.stringify(form);
    //let baseUrl = 'http://localhost/CS4640/studyAbroad';
    let baseUrl = 'https://engineersabroad.uvacreate.virginia.edu/sqlDatabasePHP';
    this.http.get(baseUrl+'/getTransferedCourses.php?str='+params)
      .subscribe((data)=>{
        console.log(Object.keys(data).length);
        if(data==false || Object.keys(data).length == 0){
          this.data = [];
          this.empty = true;
        }
        else{
          this.data = this.convertToWantedFormat(data);
          this.empty = false;
        }
      }, (error)=>{
        console.log('Error ', error);  // An error occurs, handle an error in some way
      })
    
  }


}
