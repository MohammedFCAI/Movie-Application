import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { error } from 'node:console';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit{

  constructor(private _movieService:MoviesService, private _router:Router, private _authService: AuthService) {

  }


  ngOnInit(): void {
    // Retrieve user details from local storage
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.isAdmin = parsedUser.role === 'ADMIN';
    }
    this._movieService.getAllMovies().subscribe({
      next:(response) => {
        console.log("Response::::");
        console.log(response);
        this.movies = response;
      }
    })
  }


  movies: any[] = []; // Define an array to hold movie data
  isAdmin: boolean = false;
  searchTitle: string = ''; // Title for search
  userRating: number = 0;  // Initial rating value
  movie: any = {};  // Initialize movie as an empty object
  userRatings: { [movieId: number]: number } = {}; // Object to store ratings for each movie
  canDelete: boolean = true;


  searchMovies(): void {
    if (!this.searchTitle.trim()) {
      this._movieService.getAllMovies().subscribe({
        next: (response) => {
          this.movies = response; // Update the movie list with search results
          console.log(response);
          this.canDelete = true;
        },
        error: (err) => {
          console.error('Search failed:', err);
        }
      });
    }

    if(this.isAdmin) {
      if(this.searchTitle != '') {

          this._movieService.getAllFromOMDB(this.searchTitle).subscribe({
            next: (response) => {
              this.movies = response; // Update the movie list with search results
              
              console.log(response);
              this.canDelete = false;
            },
            error: (err) => {
              console.error('Search failed:', err);
            }
          });
      }
    }
    else{
      this._movieService.getAllForUser(this.searchTitle).subscribe({
        next: (response) => {
          this.movies = response; // Update the movie list with search results
          console.log(response)
        },
        error: (err) => {
          console.error('Search failed:', err);
        }
      });
    }
  }

  navigateToCreate(): void {
    this._router.navigate(['/movie']); // Route to the 'movie' component
  }


  handleLogout(): void {
    this._authService.logout();
    // Clear stored user data (e.g., token) from localStorage or sessionStorage
    // localStorage.removeItem('user'); 
    this._router.navigate(['/login']); // Redirect to login page
  }

  clearFilter(): void {
    this.searchTitle = ''; // Clear the search input
    this._movieService.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response; // Update the movie list with search results
        console.log(response)
      },
      error: (err) => {
        console.error('Search failed:', err);
      }
    });

  
    ; // Reset to the original movie list
  }




// Function to round the movie rate to 1 decimal place
getRoundedRate(rate: number): number {
  // Round the rate to 1 decimal place using toFixed
  return parseFloat(rate.toFixed(1)) * 10.0; // Round and return as a number
}

// Function to return an array of 1 (filled star), 0.5 (half star), or 0 (empty star)
getStars(rate: number): number[] {
 // Get the rounded rate
  const fullStars = Math.floor(rate);      // Whole stars
  const hasHalfStar = rate % 1 >= 0.5;     // Check for half star
  const stars = new Array(5).fill(0);             // Create an array of 5 stars

  // Fill full stars
  for (let i = 0; i < fullStars; i++) {
    stars[i] = 1; // Filled star
  }
  
  // Add half star if necessary
  if (hasHalfStar) {
    stars[fullStars] = 0.5; // Half-filled star
  }

  return stars; // Return the array representing the stars
}


submitRating(movieId: number): void {
  const rating = this.userRatings[movieId]; // Get the rating for this specific movie

  if (rating < 0 || rating > 5) {
    return;
  }
  // Send the rating to the backend API
  this._movieService.addRate(movieId, rating).subscribe({
    next: (response) => {
      console.log('Rating submitted successfully:', response);
      window.location.reload();
    },
    error: (err) => {
      console.error('Error submitting rating:', err);
    }
  });
}

onRemoveMovie(movieId: number): void {
  this._movieService.removeMovie(movieId).subscribe({
    next: (response) => {
      console.log('Movie removed successfully:', response);
    },
    error: (err) => {
      window.location.reload();
    }
  });
}

onRemoveMovies(): void {
  this._movieService.removeMovies().subscribe({
    next: (response) => {
      console.log('Movies removed successfully:', response);
      window.location.reload();

    },
    error: (err) => {
      window.location.reload();
    }
  });
}

}

