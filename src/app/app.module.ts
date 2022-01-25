import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ViewdetailsComponent } from './components/shared/viewdetails/viewdetails.component';
import { DataserviceService } from './service/dataservice/dataservice.service';

import { FlexLayoutModule } from '@angular/flex-layout';
import { DaysagoPipe } from './shared/pipes/daysago.pipe';
import { MaterialModule } from './shared/modules/material.module';


@NgModule({
  declarations: [
    AppComponent,
    RoadmapComponent,
    NavbarComponent,
    SidebarComponent,
    NotfoundComponent,
    ViewdetailsComponent,
    DaysagoPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [DataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
