import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {
  details:any;
  imgUrl:any;
  originalEstimateTime:any;
  constructor(public dialogRef: MatDialogRef<ViewdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.details = this.data;
    this.imgUrl = this.details.fields.reporter.avatarUrls["24x24"];
    this.originalEstimateTime = Math.floor(this.details.fields.timetracking.originalEstimateSeconds / 3600);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
