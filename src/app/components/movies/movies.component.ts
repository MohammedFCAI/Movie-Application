import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: false,
  
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

  constructor(private _movieService:MoviesService, private _router:Router) {
  }

  errorMessage:any = '';

  movieForm:FormGroup = new FormGroup({
    Title: new FormControl('', Validators.required),
    Year: new FormControl('', Validators.required),
    Plot: new FormControl('', Validators.required),
    Poster: new FormControl('', Validators.required),
  })


  handleMovie():void{
    if(this.movieForm.valid) {
      this._movieService.addMovie(this.movieForm.value).subscribe(
        {
          next:(response) => {
            console.log("Success");
            console.log(response);
            this.navigateToList();
          },

          error:(err) => {
            this.errorMessage = err.error.Message;
            this.errorMessage = "UnExpected Error!!";
            console.log(err);
          }
        }
      )
    }
    console.log(this.movieForm.value);
  }

  navigateToList(): void {
    this._router.navigate(['/movies']); // Route to the 'movie' component
  }
  
}