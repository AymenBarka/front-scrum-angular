import { TaskManagerComponent } from './../../modules/task-manager/task-manager.component';
import { ListSprintComponent } from './../../modules/list-sprint/list-sprint.component';
import { EditSprintComponent } from './../../modules/edit-sprint/edit-sprint.component';
import { CreateSprintComponent } from './../../modules/create-sprint/create-sprint.component';
import { ProjectComponent } from './../../modules/project/project.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './../../modules/dashboard/dashboard.component';
import { ScrumComponent } from './scrum.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProfileComponent } from 'src/app/modules/update-profile/update-profile.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';






@NgModule({
  declarations: [
    ScrumComponent,
    DashboardComponent, 
    ProjectComponent,
    UpdateProfileComponent,
    CreateSprintComponent,
    EditSprintComponent,
    ListSprintComponent,
    TaskManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MatDialogModule,
    DragDropModule,
    MatListModule


  ],
  entryComponents: [ UpdateProfileComponent]
})
export class ScrumModule { }
