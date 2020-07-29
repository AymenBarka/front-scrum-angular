import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog_login(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position ={right: '180px','top':'200px'};
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=false;
    this.dialog.open(LoginComponent, dialogConfig); 
  }


  openDialog_register(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position ={right: '130px','top':'100px'};
    dialogConfig.width='500px';
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=false;
    this.dialog.open(RegisterComponent, dialogConfig); 
  }

  


}
