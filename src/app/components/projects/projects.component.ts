import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public url: string;
  changeCols: any;

  constructor(
    private _projectService: ProjectService
    ) { 
    this.url = Global.url;
  }

  ngOnInit(){
    this.getProjects();
    this.changeCols = (window.innerWidth <= 600 ) ? 1 : 3;
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        if(response.projects){
          this.projects = response.projects;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onResize(event){
    this.changeCols = (event.target.innerWidth <= 600) ? 1 : 3; 
  }
}
