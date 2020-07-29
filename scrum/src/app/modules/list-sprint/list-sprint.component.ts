import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditSprintComponent } from '../edit-sprint/edit-sprint.component';

@Component({
  selector: 'app-list-sprint',
  templateUrl: './list-sprint.component.html',
  styleUrls: ['./list-sprint.component.css']
})
export class ListSprintComponent implements OnInit {
  listSprint: any
  sprintForm: FormGroup
  tasks: FormArray

  projectId: any
  project: any
  constructor(private service: ProjectService, private dialog: MatDialog, private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.params["id"]
    this.service.getProjectById(this.projectId).subscribe(
      data => {
        this.project = data

      })
  }

  ngOnInit(): void {
    this.service.getAllSprints(this.projectId).subscribe(
      data => {
        this.listSprint = data
      }
    );

    this.sprintForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      tasks: new FormArray([]),
    })
  }
  addTask() {
    this.tasks = this.sprintForm.get('tasks') as FormArray;
    this.tasks.push(this.createTask());
  }

  createTask(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  deleteTask(i) {
    this.tasks = this.sprintForm.get('tasks') as FormArray;
    this.tasks.removeAt(i);
  }

  removeSprint(i, idSprint) {
    this.listSprint.splice(i, 1)
    this.service.deleteSprint(idSprint).subscribe()
  }

  editSprint(i) {
    this.sprintForm = new FormGroup({
      name: new FormControl(this.listSprint[i].name, Validators.required),
      description: new FormControl(this.listSprint[i].description),
      tasks: new FormArray(this.listSprint.tasks),
    })
  }

  openDialog_edit(i) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { right: '130px', 'top': '100px' };
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      "name": this.listSprint[i].name, "description": this.listSprint[i].description,
      "tasks": this.listSprint[i].tasks
    }

    const dialogRef = this.dialog.open(EditSprintComponent, dialogConfig);



  }
}
