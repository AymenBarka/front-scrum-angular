import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from 'src/app/modules/update-profile/update-profile.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  id: number;
  data: any;

  photo = null;
  addUserForm: FormGroup
  img: any
  users: any;


  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private tokenStorage: TokenStorageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.users = {}
    this.img = {}

    // this.addUserForm=new FormGroup({
    //   photo: new FormControl('')
    // })

    let users: any = this.tokenStorage.getUser();

    this.userService.getUser(users.id).subscribe(data => {
      this.users = data;

      this.img = { src: 'https://bescrum.herokuapp.com/user/photo/' + users.id }
    })

  }
  editProfile() {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.position ={right: '180px','top':'200px'};
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(UpdateProfileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.users = data
      }
    )
  }



}



