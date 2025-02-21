import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }            from '@angular/router';
import { Application } from '../models';
import { ApplicationService } from '../application.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  
  //selectedApplication: Application;
  appDataSource: MatTableDataSource<Application>;
  displayedColumns = ['id', 'name', 'description', 'waf_enabled'];
  appLength: number;
  keyword: string;

  @ViewChild('appPaginator') appPaginator: MatPaginator;

  constructor(
    public applicationService: ApplicationService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.applicationService.auth_user.logged==false) {
      this.router.navigate(['/']);
      return
    } 
    if (this.applicationService.auth_user.need_modify_pwd) {
      this.router.navigate(['/appuser/'+this.applicationService.auth_user.user_id]);
    }
    this.applicationService.getApplications();
    setTimeout(() => 
    {
      if (this.applicationService.auth_user.logged==false) {
        this.router.navigate(['/login']);
      } 
      this.appDataSource = new MatTableDataSource<Application>(this.applicationService.applications);
      this.appLength = this.applicationService.applications.length;
    },500); 
  }

  /*
  onSelect(application: Application): void {
    this.selectedApplication = application;
    this.router.navigate(['/application/'+this.selectedApplication.id]);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedApplication.id]);
  }
  */

  addApplication():void {
    this.router.navigate(['/application/0']);
  }

  applyFilter(filterValue: string) {
    this.appDataSource.filter = filterValue.trim().toLowerCase();
  }

}
