import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isSignup = true;
  isLoading = false;
  error: string = null;
  authForm: FormGroup;

  constructor(
    private appcomponent: AppComponent,
    private authService: AuthService,
    private router: Router
  ) {}

  onSwitch() {
    this.isSignup = !this.isSignup;
  }

  ngOnInit() {
    this.appcomponent.setShowHeader(false);
    this.initForm();
  }

  PasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const hasNumber = /[0-9]/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasSpecial = /[!@#$%^&*]/.test(control.value);
    const validLength = control.value ? control.value.length >= 6 : false;

    if (!(hasNumber && hasUpper && hasSpecial && validLength)) {
      return { invalidPassword: true };
    }
    return null;
  }

  private initForm() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        this.PasswordValidator,
      ]),
    });
  }

  onSubmit() {
    let email = this.authForm.value['email'];
    let password = this.authForm.value['password'];

    this.isLoading = true;

    let authObservable: Observable<AuthResponseData>;
    if (this.isSignup) {
      authObservable = this.authService.signup(email, password);
    } else {
      authObservable = this.authService.login(email, password);
    }

    authObservable.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.appcomponent.setShowHeader(true);
        this.router.navigate(['/home']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.authForm.reset();
  }
}
