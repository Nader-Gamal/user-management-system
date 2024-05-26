import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {
    sessionStorage.clear();
  }
  hide: boolean = true;
  logInForm = this._FormBuilder.group({
    id: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
        ),
      ],
    ],
  });

  proceedlogin() {
    if (this.logInForm.valid) {
      this._AuthService
        .login(this.logInForm.value.id!, this.logInForm.value.password!)
        .subscribe({
          next: (response) => {
            if (response.length > 0) {
              const user = response[0];
              if (user.password === this.logInForm.value.password) {
                if (user.isactive) {
                  sessionStorage.setItem('username', user.id);
                  sessionStorage.setItem('role', user.role);
                  this._ToastrService.success('Login successful');

                  if (user.role === 'admin') {
                    this._Router.navigate(['admin']);
                  } else if (user.role === 'user') {
                    this._Router.navigate(['user']);
                  } else {
                    this._Router.navigate(['']); // Default redirect for other roles
                  }
                } else {
                  this._ToastrService.error(
                    'Please contact Admin',
                    'Inactive User'
                  );
                }
              } else {
                this._ToastrService.error('Invalid credentials');
              }
            } else {
              this._ToastrService.error('Invalid credentials');
            }
          },
          error: (error) => {
            console.error('Login error:', error);
            this._ToastrService.error('An error occurred during login.');
          },
        });
    } else {
      this._ToastrService.warning('Please enter valid data.');
    }
  }
}
