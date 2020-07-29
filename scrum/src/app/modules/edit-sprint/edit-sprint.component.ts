import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-edit-sprint',
  templateUrl: './edit-sprint.component.html',
  styleUrls: ['./edit-sprint.component.css']
})
export class EditSprintComponent implements OnInit {
  sprintForm: FormGroup
  information: any
  tasks: FormArray
  name:any
  availableTasks: any

  constructor(private dialogRef: MatDialogRef<EditSprintComponent>,@Inject(MAT_DIALOG_DATA) data ,
  private projectService: ProjectService) { 
    this.information=data
    this.projectService.getNonTakenTasks(2).subscribe(data =>{
                this.availableTasks=data})
  }
 

  ngOnInit(): void {
    this.sprintForm=new FormGroup({
      name: new FormControl(this.information.name),
      description: new FormControl(this.information.description),
      tasks: new FormArray([])})
  }
   
  /** for new tasks */
  addTask(){
    this.tasks=this.sprintForm.get('tasks') as FormArray;
    this.tasks.push(this.createTask());
   }

   createTask(): FormGroup{
    return new FormGroup({
      name:  new FormControl('',Validators.required)
    })
   }

   /** for old tasks already exist in the form */
   addOldTask(name){
    this.tasks=this.sprintForm.get('tasks') as FormArray;
    this.tasks.push(this.initializeTask(name));
   }

   initializeTask(name): FormGroup{
    return new FormGroup({
      name:  new FormControl(name,Validators.required)
    })
   }


  close() { this.dialogRef.close();}

  save(){
    this.information.tasks.map(task =>{
      this.addOldTask(task)
    })
    this.dialogRef.close(this.sprintForm.value)    
    
  }

  ifSelected(task){
    return this.information.tasks.includes(task)
  }

  onGroupsChange(options:  MatListOption[]) {
    this.information.tasks=[]
    options.map(o =>{
      this.information.tasks.push(o.value)
    })
  }
}
