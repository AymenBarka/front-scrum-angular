import { ProjectService } from 'src/app/services/project.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Todo } from 'src/app/services/models/todo';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  todos:Todo[]=[];
  doing:Todo[]=[];
  done:Todo[]=[];
  todo:any;
sprintId: any
projectId: any
project: any;
title='';
content='';

  
 
  constructor(private service : ProjectService, private route:ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectId=this.route.snapshot.params["id"]
    this.sprintId=this.route.snapshot.params["idSprint"]
    this.projectService.getProjectById(this.projectId).subscribe(data =>{
      this.project=data;
      console.log(this.project);
    })

    this.service.gettaches(this.projectId, this.sprintId).subscribe(
      (todos)=>{
        this.todos=this.service.filter(todos,'todo');
        this.doing=this.service.filter(todos,'doing');
        this.done=this.service.filter(todos,'done');


      }
     
    );
  }
  drop(event: CdkDragDrop<string[]>) {
        //tester le contenue de event 
        console.log(event);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
     //change state
   const todo=event.item.data;
   console.log(event.item)
   console.log(todo)
   todo.state=event.container.element.nativeElement.classList[0];
  
  //change state on database
  // this.service.updatetaches(todo).subscribe(
    // (response)=>{
     //  console.log(response)
      //   }) 
    }
  }

}
