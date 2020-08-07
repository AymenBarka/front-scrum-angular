import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.css']
})
export class CreateSprintComponent implements OnInit {
  sprintForm: FormGroup
  availableTasks: any;
  restTasks = []
  selected = []
  id: any;
  projectId: any;
  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params["id"]

    this.projectService.getNonTakenTasks(this.projectId).subscribe(
      data => {
        console.log(data)

        this.availableTasks = data
      })

    this.sprintForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      project: new FormControl(this.projectId),
    })

  }
  onGroupsChange(options: MatListOption[]) {
    this.selected = []

    options.map(o => {

      this.selected.push(o.value)


    })
  }
  save() {
    if (this.sprintForm.controls['name'].status == 'VALID' && this.selected.length != 0) {

      this.projectService.createSprint(this.sprintForm.value).subscribe(
        data => {
          this.id = data
          this.selected.map(idTask => {

            let i
            for (i = 0; i < this.availableTasks.length; i++) {
              if (this.availableTasks[i].id === idTask) {
                this.availableTasks.splice(i, 1);
              }
            }
            this.projectService.addTaskToSprint(this.id, idTask).subscribe()
          })

          this.sprintForm = new FormGroup({
            name: new FormControl('', Validators.required),
            description: new FormControl(''),
            project: new FormControl(this.projectId),
          })
        })


    }

  }

}


