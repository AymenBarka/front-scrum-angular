import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  msg: String;
  isLoginFailed = false;
  hide: boolean;
  constructor(private service: AuthService, private router: Router, private tokenStorage: TokenStorageService, private dialogRef: MatDialogRef<LoginComponent>,) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),

    });
    this.hide = true

  }
  login() {

    this.service.login(this.loginForm.value).pipe(first())

      .subscribe(
        data => {


          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false
          this.close()


          this.router.navigate(['/scrum/Dashboard']);

        },
        err => {
          if (err.error['message'] == 'Unauthorized') {
            this.isLoginFailed = true
            // this.notification.showNotification('Please check your informations !!','danger','top','right')}
          }
        });
  }
  close() {
    this.dialogRef.close();
  }

}

