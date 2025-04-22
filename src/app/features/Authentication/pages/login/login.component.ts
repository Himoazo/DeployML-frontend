import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LogIn, Token } from '../../types/auth.type';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router)
  auth = inject(AuthService)
  errorDiv: string = "";

  loginForm = this.fb.nonNullable.group({
    email: new FormControl<string>("", {
      validators: [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(25)],
      nonNullable: true
    }),
    password: new FormControl<string>("", {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
      nonNullable: true
    })
  });
  
  login(): void{
    if (this.loginForm.invalid) return;

    const loginInfo = this.loginForm.value;
    
    this.auth.login(loginInfo as LogIn).subscribe({
      next: (response: Token) => {
        localStorage.setItem("token", response.access_token);
        this.router.navigate(["/"]);
      },
      error: (error)=>{
        this.errorDiv = "Felaktigt användarnamn/lösenord";
        console.log(error)
      }
    });
  }
}
