import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-program-page',
  templateUrl: './find-program-page.component.html',
  styleUrls: ['./find-program-page.component.css']
})
export class FindProgramPageComponent implements OnInit {
  constructor() { }
  isShow = false;
  startQuiz(){
    this.isShow = !this.isShow;
  }
  ngOnInit(): void {
    this.buildQuiz();
    this.slides = document.querySelectorAll(".initialDisplay, .slide");
    this.previousButton = document.getElementById("previous");
    this.nextButton = document.getElementById("next");
    this.submitButton = document.getElementById("submit");
    this.showSlide(0);
  }
  ngAfterContentInit(){
    
  }

  programs = [
    {
      favorite: true,
      programName: 'UVA Exchange',
      country: 'Spain',
      programInfo: 'Description of program',
      deadline: 'January 21, 2020'
    },
    {
      favorite: false,
      programName: 'iExperience',
      country: 'Singapore',
      programInfo: 'Description of program',
      deadline: 'March 20, 2020'
    },
    {
      favorite: true,
      programName: 'UVA Exchange',
      country: 'Valencia',
      programInfo: 'Description of program',
      deadline: 'January 21, 2020'
    },
    {
      favorite: true,
      programName: 'UVA Exchange',
      country: 'Spain',
      programInfo: 'Description of program',
      deadline: 'January 21, 2020'
    },
    {
      favorite: false,
      programName: 'iExperience',
      country: 'Singapore',
      programInfo: 'Description of program',
      deadline: 'March 20, 2020'
    },
    {
      favorite: true,
      programName: 'UVA Exchange',
      country: 'Valencia',
      programInfo: 'Description of program',
      deadline: 'January 21, 2020'
    },
    {
      favorite: true,
      programName: 'UVA Exchange',
      country: 'Spain',
      programInfo: 'Description of program',
      deadline: 'January 21, 2020'
    },
    {
      favorite: false,
      programName: 'iExperience',
      country: 'Singapore',
      programInfo: 'Description of program',
      deadline: 'March 20, 2020'
    },
    {
      favorite: true,
      programName: 'UVA Exchange',
      country: 'Valencia',
      programInfo: 'Description of program',
      deadline: 'January 21, 2020'
    },
  ];

  myQuestions = [
    {
      question: "What is your Major",
      value: 'Select a major',
      options: [ 
        "UNDECLARED",
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
      ],
      type: "major",
      isHidden: false,
    },
    {
      question: "Which year do you want to study abroad?",
      value:'Select year',
      options: [
        "First Year",
        "Second Year",
        "Third Year",
        "Fourth Year",
      ],
      type: "year",
      isHidden: true,
    },
    {
      question: "Which season do you want to study abroad?",
      value: 'Select season',
      options: [
        "Fall",
        "Spring",
        "Summer",
        "January-Term"
      ],
      type: "season",
      isHidden: true,
    }
  ];

  major = "";
  year = "";
  season = "";

  previousButton = document.getElementById("previous");
  nextButton = document.getElementById("next");
  submitButton = document.getElementById("submit");
  slides = document.querySelectorAll(".slide");
  currentSlide = 0;

  // generete html components for question for the quiz based on data and add to quiz contiainer
  // reference from https://www.sitepoint.com/simple-javascript-quiz/
  buildQuiz(){
    const output = [];
    output.push(
      `<div id="initialDisplay" class="initialDisplay">
        <h1 class="display-4">Find the program that fits you</h1>
        <p class="lead">Answer a few Questions about yourself and your interests to find the optimal study abroad program</p>
      </div>
      `
    );
    this.myQuestions.forEach((currentQuestion, questionNumber)=>{
        const optionChoices = [];

        for (let choice of currentQuestion.options){
          optionChoices.push(
            `<option>${choice}</option>`
          );
        }
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question}</div>
            <select class="custom-select">
              <option value="">${currentQuestion.value}</option>
              ${optionChoices.join('')}
            </select>
          </div>
          `
        );
    })
    document.getElementById('quiz').innerHTML = output.join('');
  }

  // display the question that the selector is on by modifying css attributes of question
  showSlide(n){
    console.log(this.slides);
    this.slides[this.currentSlide].classList.remove('active-slide');
    this.slides[n].classList.add('active-slide');
    this.currentSlide = n;

    // if at first slide dont display previous button
    if(this.currentSlide === 0){
      this.previousButton.style.display = 'none';
      document.getElementById('initialDisplay').style.display='inline-block';

    }
    else{
      this.previousButton.style.display = 'inline-block';
      document.getElementById('initialDisplay').style.display='none';
    }

    // if at last slide dont display next button
    if(this.currentSlide === this.slides.length-1){
      this.nextButton.style.display = 'none';
      this.submitButton.style.display = 'inline-block';
    }
    else{
      this.nextButton.style.display = 'inline-block';
      this.submitButton.style.display = 'none';
    }

  }

  showPreviousSlide(){
    console.log("about to hit p:"+this.currentSlide)
    this.showSlide(this.currentSlide -1);
  }

  showNextSlide(){
    console.log("about to hit n:"+this.currentSlide)
    this.showSlide(this.currentSlide +1);

  }
  // switch from selcted gold star to unselcted gold star and vice versa
  handleFavorite(i){
    this.programs[i].favorite = !this.programs[i].favorite;
  }

  submitQuiz(){


  }

  

  
}


  