import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SignUp } from '../types/auth.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  fb = inject(FormBuilder);
  router = inject(Router)
  auth = inject(AuthService)
  errorDiv: string = "";

  signUpForm = this.fb.nonNullable.group({
    email: new FormControl<string>("", {
      validators: [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(25)],
      nonNullable: true
    }),
    password: new FormControl<string>("", {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
      nonNullable: true
    })
  });

  register(): void{
    if (this.signUpForm.valid) {
     const registerInfo = this.signUpForm.value;

      this.auth.register(registerInfo as SignUp).subscribe({
        next: response => {
          this.router.navigate(["/"]);
        },
        error: err => {
          this.errorDiv = "Felaktigt lösenord/Användarnamn"
          console.log(err);
        }
      });
    } else {
      this.errorDiv = "Felaktigt lösenord/Användarnamn"
    }
  }
}
