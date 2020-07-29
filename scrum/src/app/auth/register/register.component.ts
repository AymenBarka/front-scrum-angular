import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  photo: any = File;


  constructor(private authService: AuthService, private router: Router, private dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      photo: new FormControl(''),

    });
  }
  register() {
    if (this.registerForm.status == 'VALID') {
      this.authService.signUp(this.registerForm.value).subscribe(
        res => {
         
          this.close()
        },


      );
      this.registerForm.reset()
    }

   
  }
  handleImage(event) {
    this.photo = event.target.files[0];
    let formData = new FormData();
    formData.append("file", this.registerForm['controls'].photo.value);
    formData.append("file", this.photo);
    this.registerForm['controls'].photo.setValue(this.photo.name);
  
    this.authService.uploadImage(formData).subscribe(
      //(res) => console.log(res),
      //(err) => console.log(err)
    );

    
  }
  close(){
    this.dialogRef.close()
  }

}
