// login.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent{
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Login successful');
          console.log(response.userDetails);

          localStorage.setItem('userDetails', JSON.stringify(response.userDetails));

          this.toastr.success('Login successful');
          if (response.userDetails.role === 'STUDENT') {
            this.router.navigate(['/student']);
          } else if(response.userDetails.role === 'PARENT'){
            this.router.navigate(['/parent']);
          } else if(response.userDetails.role === 'TEACHER'){
            this.router.navigate(['/teacher']);
          } else if(response.userDetails.role === 'ADMIN'){
            this.router.navigate(['/admin']);
          }
        } else {
          this.toastr.error(response.message || 'Login failed');
        }
      },
      error: (err) => {
        this.toastr.error('An error occurred during login');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
