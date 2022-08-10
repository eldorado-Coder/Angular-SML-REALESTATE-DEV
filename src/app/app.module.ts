import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Header1Component } from './header1/header1.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { ExporeComponent } from './expore/expore.component';
import { RealestateListComponent } from './realestate-list/realestate-list.component';
import { Header2Component } from './header2/header2.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { DetailsComponent } from './details/details.component';
import { RecFooterComponent } from './rec-footer/rec-footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { StreetViewComponent } from './street-view/street-view.component';
import { ThreeDViewComponent } from './three-d-view/three-d-view.component';
import { ListPropertyComponent } from './list-property/list-property.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { Header3Component } from './header3/header3.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Header1Component,
    FooterComponent,
    NavComponent,
    ExporeComponent,
    RealestateListComponent,
    Header2Component,
    RecommendationsComponent,
    DetailsComponent,
    RecFooterComponent,
    GalleryComponent,
    StreetViewComponent,
    ThreeDViewComponent,
    ListPropertyComponent,
    AgentsComponent,
    AgentDetailsComponent,
    Header3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDQRqRozL-HBOpgBgOt2hxyXo9l3Tc4LCY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
