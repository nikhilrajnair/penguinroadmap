import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataserviceService } from 'src/app/service/dataservice/dataservice.service';
import { DatehelperService } from '../../service/datehelper/datehelper.service';
import { MonthAxis } from '../shared/models/months';
import { ViewdetailsComponent } from '../shared/viewdetails/viewdetails.component';


@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})

export class RoadmapComponent implements OnInit {

  value: any = [];
  temp: any;
  filteredData: any;
  chartPeriodDays: number;
  roadmapLabel: any;
  monthAxis: MonthAxis[];
  colourPallete = ['#7C4DFF', '#81c784', '#e53935', '#FF8A80', '#303F9F', '#40C4FF', '#006064', '#FF8A65','#64b5f6'];

  @Input() startDate: Date = new Date('2019-01-01');
  @Input() endDate: Date = new Date('2019-12-30');


  ngOnInit(): void {
    this.getDataList();
  }

  viewDetails(filteredData:any){
    const dialogRef = this.dialog.open(ViewdetailsComponent, {
      width: '800px',
      data: filteredData,
      autoFocus: false

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getDataList() {
    this.dataservice.getJSON().subscribe(data => {
      this.value = data;
      this.temp = this.value.issues;
      this.roadmapLabel = "Roadmap";
      this.filteredData = this.temp.filter((data: any) => {
        if (data.fields) {
          for (let abc of data.fields.labels) {
            if (abc == this.roadmapLabel) {
              return abc
            }
          }
        }
        return
      });
    });
  }


  constructor(private dataservice: DataserviceService,public dialog: MatDialog) {
    this.chartPeriodDays = DatehelperService.dateDifference(this.endDate, this.startDate, true);
    this.monthAxis = this.getMonths(this.startDate, this.endDate);
    
   
  }


  getColour(rowIndex: number): string {
    if (this.filteredData.length < rowIndex) {
      return '#64b5f6';
    }
    return this.colourPallete[rowIndex];
  }

  /** Given a start and end date return the difference in days */
  static dateDifference(endDate: Date, startDate: Date, inlusiveOfEndDate: boolean = false): number {
    endDate = new Date(endDate);
    startDate = new Date(startDate);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const utc2 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY)) + (inlusiveOfEndDate ? 2 : 1);
  }

  getStartDateBasedOnDueDateAndEstimation(timeoriginalestimate: any, duedate: any) {
    let ed: any = formatDate(duedate, 'yyyy-MM-dd', "en-US");
    let endDate = new Date(ed);
    var days = Math.floor(timeoriginalestimate / (3600 * 24));
    var d = endDate.setDate(endDate.getDate() - days);
    let convertedDate = formatDate(d, 'yyyy-MM-dd', "en-US");;
    return convertedDate

  }

  getEventDurationPercentage(timeoriginalestimate: any, duedate: any) {
    let startDate = this.getStartDateBasedOnDueDateAndEstimation(timeoriginalestimate, duedate);
    const eventDays = DatehelperService.dateDifference(duedate, new Date(startDate));
    return (eventDays / this.chartPeriodDays) * 100;

  }

  /** Given an date the percentage of days over the total gantt chart period */
  getEventOffsetPercentage(timeoriginalestimate: number, eventEndDate: Date): number {
    let startDateValue = this.getStartDateBasedOnDueDateAndEstimation(timeoriginalestimate, eventEndDate);
    const daysPriorToEventStart = DatehelperService.dateDifference(new Date(startDateValue), this.startDate);
    return ((daysPriorToEventStart - 1) / this.chartPeriodDays) * 100;
  }




  getMonths(startDate: Date, endDate: Date): MonthAxis[] {
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();
    const totalDurationDays = DatehelperService.dateDifference(startDate, endDate, true);
    let months: MonthAxis[] = new Array();
    for (var i = 0; i <= endMonth - startMonth; i++) {
      const adjustedStartDate = DatehelperService.addMonths(startDate, i);
      const monthName = DatehelperService.getMonthName(adjustedStartDate);
      const daysInMonth = DatehelperService.daysInMonth(adjustedStartDate);
      const monthDurationPercentage = daysInMonth / totalDurationDays * 100;
      months.push({ monthName: monthName, monthDurationPercentage: monthDurationPercentage });
    }
    return months;
  }
}
