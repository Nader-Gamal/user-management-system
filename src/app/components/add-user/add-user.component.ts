import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  addUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {
    this.addUserForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      isactive: [true, Validators.required],
    });
  }
  hide: boolean = true;
  onSubmit() {
    if (this.addUserForm.valid) {
      this.authService.processRegistration(this.addUserForm.value).subscribe(
        (response) => {
          this.dialogRef.close(true); // Close the dialog and pass true to indicate success
        },
        (error) => {
          // Handle error
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
