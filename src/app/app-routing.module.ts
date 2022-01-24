import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';

const routes: Routes = [
  { path: 'home', component: RoadmapComponent },
  { path: '', component: RoadmapComponent },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
