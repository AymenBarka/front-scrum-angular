import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allProjects: any

  constructor(private service: ProjectService) { 
    this.service.getProjects().subscribe( data =>{
      this.allProjects = data ; 
    })
  }

  
  ngOnInit(): void {
  }

}
