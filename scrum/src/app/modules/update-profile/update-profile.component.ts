import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  users: any
  id: number
  message: any;
  photo = null;
  addUserForm: FormGroup;
  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<UpdateProfileComponent>) { }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      photo: new FormControl(''),
    });


    let users: any = this.tokenStorage.getUser();

    this.userService.getUser(users.id).subscribe(data => {
      this.users = data;
      this.addUserForm.patchValue(data)
      console.log(data)


    });

  }
  updateUser() {
    
    this.userService.updateUser(this.users.id, this.addUserForm.value).subscribe(
      data => {
        this.tokenStorage.saveUser(data)
        this.dialogRef.close(this.addUserForm.value)
      });

      if(this.photo != null && this.photo != undefined)
      {
        let formData = new FormData();
        formData.append("file", this.addUserForm['controls'].photo.value);
        formData.append("file", this.photo);
        this.addUserForm['controls'].photo.setValue(this.photo.name);
        this.authService.uploadImage(formData).subscribe(
          data => {
            this.userService.updatePhoto(this.users.id, this.addUserForm.value.photo).subscribe(
              res => {}
            )
          })
      }

  }
  handleImage(files) {

    if (files == undefined) {
      return;
    }
    if (files.length === 0) {
      return;
    }
    this.photo = files[0];
  }

  close() {
    this.dialogRef.close()
    console.log(this.users)
  }
}
