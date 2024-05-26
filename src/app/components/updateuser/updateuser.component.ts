import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css'],
})
export class UpdateuserComponent implements OnInit {
  updateUserForm: FormGroup;
  originalUserData: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<UpdateuserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateUserForm = this.fb.group({
      id: [data.userCode, Validators.required],
      name: [''],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      role: [''],
      isactive: [true],
    });
  }
  hide: boolean = true;
  ngOnInit() {
    // Load user data to populate the form
    this.authService.getByCode(this.data.userCode).subscribe((user) => {
      this.originalUserData = user;
      this.updateUserForm.patchValue(user);
    });
  }

  onSubmit() {
    if (this.updateUserForm.valid) {
      const updatedData = this.getUpdatedData();
      if (Object.keys(updatedData).length > 0) {
        this.authService.updateUser(this.data.userCode, updatedData).subscribe(
          (response) => {
            this.dialogRef.close(true); // Close the dialog and pass true to indicate success
          },
          (error) => {
            // Handle error
          }
        );
      } else {
        this.dialogRef.close(false); // Close the dialog without changes
      }
    }
  }

  getUpdatedData() {
    const updatedData: any = {};
    Object.keys(this.updateUserForm.controls).forEach((key) => {
      if (
        this.updateUserForm.controls[key].value !== this.originalUserData[key]
      ) {
        updatedData[key] = this.updateUserForm.controls[key].value;
      }
    });
    return updatedData;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
