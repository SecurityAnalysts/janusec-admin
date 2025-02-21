import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }            from '@angular/router';
import { ApplicationService } from '../application.service';
import { VipApp } from '../models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vip-apps',
  templateUrl: './vip-apps.component.html',
  styleUrls: ['./vip-apps.component.css']
})
export class VipAppsComponent implements OnInit {
  //selectedVipApp: VipApp;

  appDataSource: MatTableDataSource<VipApp>;
  displayedColumns = ['id', 'is_tcp', 'listen_port', 'name', 'description'];
  appLength: number;
  keyword: string;

  @ViewChild('appPaginator') appPaginator: MatPaginator;

  constructor(public applicationService: ApplicationService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.applicationService.auth_user.logged==false) {
        this.router.navigate(['/']);
        return
    } 
    this.applicationService.getVipApps();
    setTimeout(() => 
    {
      this.appDataSource = new MatTableDataSource<VipApp>(this.applicationService.vip_apps);
      this.appLength = this.applicationService.vip_apps.length;
    },500); 
  }

  addVipApp() {
    this.router.navigate(['/vip/0']);
  }
  
  /*
  onSelect(vip_app: VipApp):void {
    this.selectedVipApp = vip_app;
    this.router.navigate(['/vip/'+ this.selectedVipApp.id]);
  }
  */

  applyFilter(filterValue: string) {
    this.appDataSource.filter = filterValue.trim().toLowerCase();
  }

}
