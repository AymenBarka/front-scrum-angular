import { ProjectService } from './../../services/project.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
form: FormGroup;
id:any;
  constructor( private router : Router , private fb:FormBuilder,private projet: ProjectService) {
    // this.form = fb.group({
    //   'name': new FormControl(''),
    //   'description': new FormControl(''),
    //   'technologies': new FormControl(''),
    //   'user': fb.array([])
    // });
   }
  ngOnInit(): void {
    this.form = new FormGroup({
      name : new FormControl(''),
      description : new FormControl(''),
      technologies : new FormControl(''),
      user : new FormArray([]),

    })
  }
  get user() {return this.form.get('user') as FormArray; }


  addUserStory(user?: any){
    //this.user.push(this.ques());
    let fg = this.fb.group({
      'description': [user ? user.description : '', Validators.compose([Validators.required])],


      'tasks': this.fb.array([]),
      
  });

  (<FormArray>this.form.get('user')).push(fg);
  let userIndex = (<FormArray>this.form.get('user')).length - 1;
  if (!user) {
      this.addTask(userIndex);
  }
  else {
      user.tasks.forEach(task => {
          this.addTask(userIndex, task);
      });
  }
  }
  deleteUserStory(index: number){
    if(index>=1)
    (<FormArray>this.form.get('user')).removeAt(index);
  }
  addTask(userIndex: number, data?: any){
  //this.tasks.push(this.task());
  let fg = this.fb.group({
    'task': [data ? data : '', Validators.compose([Validators.required])],
});
(<FormArray>(<FormGroup>(<FormArray>this.form.controls['user'])
    .controls[userIndex]).controls['tasks']).push(fg);

  }
  deleteTask(userIndex: number, index: number){
    if(index>=1)
    (<FormArray>(<FormGroup>(<FormArray>this.form.controls['user'])
        .controls[userIndex]).controls['tasks']).removeAt(index);
  }
 
  addProject(){

    if(this.form.status==='VALID' && this.form.controls['user'].touched===true){
      this.projet.addProject(this.form.value).subscribe( data =>{
        console.log(this.form.value)
        this.id = data;
        this.form.value.user.map(userStory =>{
          let idUserStory;
          this.projet.addUserStory(userStory.description, this.id).subscribe( data =>{
            idUserStory = data;
            userStory.tasks.map( task =>{
              this.projet.addTasks(idUserStory, task).subscribe()
            })
          })
        })
        this.router.navigateByUrl("/scrum/project/" +this.id + "/list-sprints")
        })
    }

  
  }
 
}
