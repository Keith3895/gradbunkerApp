import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentModal } from './student-modal';

@NgModule({
  declarations: [
    StudentModal,
  ],
  imports: [
    IonicPageModule.forChild(StudentModal),
  ],
  exports: [
    StudentModal
  ]
})
export class StudentModalModule {}
