import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LogIn } from '../types/login.type';
import { CommonModule } from '@angular/common';

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
      next: (response: LogIn) =>{
        if(typeof response === "string")
        localStorage.setItem("token", response);
        this.router.navigate(["/"]);
      },
      error: (error)=>{
        this.errorDiv = "Felaktigt användarnamn/lösenord";
        console.log(error)
      }
    });
  }
}
