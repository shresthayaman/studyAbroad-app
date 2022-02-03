import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FindProgramPageComponent } from './find-program-page/find-program-page.component';
import { TransferDatabasePageComponent } from './transfer-database-page/transfer-database-page.component';
import { ProgramPlannerPageComponent } from './program-planner-page/program-planner-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
//import { PhotocontestPageComponent } from './photocontest-page/photocontest-page.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FindProgramPageComponent,
    TransferDatabasePageComponent,
    ProgramPlannerPageComponent,
    HomepageComponent,
    FooterComponent,
    FeedbackPageComponent,
    //PhotocontestPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    NgbModule,
    SlickCarouselModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }