import { Component } from '@angular/core';
import { FormBuilder, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}
  hide = true;

  registerForm = this._FormBuilder.group({
    id: this._FormBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ])
    ),
    name: this._FormBuilder.control('', Validators.required),
    password: this._FormBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ])
    ),
    email: this._FormBuilder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    gender: this._FormBuilder.control('male'),
    role: this._FormBuilder.control('user'),
    isactive: this._FormBuilder.control(false),
  });

  processRegistertion() {
    if (this.registerForm.valid) {
      this._AuthService
        .processRegistration(this.registerForm.value)
        .subscribe((response) => {
          this._ToastrService.success(
            'Please Call Admin for enable access',
            'Registered Successfully!'
          );
          this._Router.navigate(['login']);
        });
    } else {
      this._ToastrService.warning('Please enter valid data');
    }
  }
}
