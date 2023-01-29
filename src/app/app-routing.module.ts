import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindProgramPageComponent } from './find-program-page/find-program-page.component';
import { TransferDatabasePageComponent } from './transfer-database-page/transfer-database-page.component';
import { ProgramPlannerPageComponent } from './program-planner-page/program-planner-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { InternshipResearchPageComponent } from './internship-research-page/internship-research-page.component';



const routes: Routes = [
  { // insures that when naviagting to the page it redirect to the Homepage instead of an empty screen
    path:'',
    redirectTo: 'Homepage',
    pathMatch: 'full' 
  },
  {path: 'Homepage', component: HomepageComponent},
  // {path: 'FindProgramPage', component: FindProgramPageComponent},
  {path: 'TransferDatabasePage', component: TransferDatabasePageComponent},
  {path: 'ProgramPlannerPage', component: ProgramPlannerPageComponent},
  {path: 'FeedbackPage', component: FeedbackPageComponent},
  {path: 'InternshipResearchPage', component: InternshipResearchPageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

