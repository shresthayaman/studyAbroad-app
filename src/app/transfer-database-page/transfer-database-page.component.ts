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

  selectedMajor = "";
  selectedTerm = "";
  freeSearchEntry = "";

  data = [];
  empty = true;

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
             ]

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
              ]
 
            }
          )

        }
      }

    }

    return arrayOfObj;

  }

  onSubmit(form: any):void{
    console.log('You submitted value: ', form);
    let params = JSON.stringify(form);
    let baseUrl = 'http://localhost/CS4640/studyAbroad';
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
