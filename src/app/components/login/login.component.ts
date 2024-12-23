import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor( private _authService:AuthService, private _router:Router) {
    
  }

  errorMessage:string = '';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })


  handleLogin2():void{
    if(this.loginForm.valid) {
      this._authService.loginForm(this.loginForm.value).subscribe(
        {
          next:(response) => {
            console.log(response)
          },

          error:(err) => {
            this.errorMessage = err.error.Message;
            console.log(err);
          }
        }
      )
    }

    console.log(this.loginForm.value);
  }

  handleLogin(): void {
    if (this.loginForm.valid) {
      this._authService.loginForm(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);  
            localStorage.setItem('user', JSON.stringify(response));
            this._router.navigate(['/movies']);
        },
        error: (err) => {
          this.errorMessage = 'Invalid username or password!';
          console.log(err);
        }
      });
    }
  }
}
