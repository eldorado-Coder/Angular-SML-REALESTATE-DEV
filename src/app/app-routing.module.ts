import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { AgentsComponent } from './agents/agents.component';
import { DetailsComponent } from './details/details.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RealestateListComponent } from './realestate-list/realestate-list.component';
import { HomeComponent } from './home/home.component';
import { ListPropertyComponent } from './list-property/list-property.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';

import { StreetViewComponent } from './street-view/street-view.component';
import { ThreeDViewComponent } from './three-d-view/three-d-view.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'realestate-list/:adtype', component: RealestateListComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'gallery/:id', component: GalleryComponent },
  { path: 'street-view/:id', component: StreetViewComponent },
  { path: 'three-d-view', component: ThreeDViewComponent },
  { path: 'list-property', component: ListPropertyComponent },
  { path: 'agents', component: AgentsComponent },
  { path: 'agent-details', component: AgentDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
