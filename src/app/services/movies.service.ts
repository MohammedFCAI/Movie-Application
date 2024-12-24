import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    private baseUrl = 'http://localhost:8080/movie-app/movies';   

   userData:any
    constructor(private _httpClient:HttpClient, private _userService:AuthService) {
      // this.userData = _userService.getUser();
      this.userData = _userService.getUserFormData();
      console.log(this.userData.username + '' + this.userData.password);
    }

    
    private createHeaders(): HttpHeaders {
      this.userData = this._userService.getUserFormData();
      const auth = btoa(`${this.userData.username}:${this.userData.password}`);
      console.log(`In Header: Username: ${this.userData.username}, Password: ${this.userData.password}`)
      this.header = new HttpHeaders({
        Authorization: `Basic ${auth}`,
      });
      return this.header;
    }

    
    header: any;  
    movieData: any;
  
    addMovie(movieData: Object): Observable<any> {
      const headers = this.createHeaders();
      return this._httpClient
        .post(`${this.baseUrl}/add`, movieData, { headers });
    }

    getAllMovies(): Observable<any> {
      const headers = this.createHeaders();
      console.log(headers);
      return this._httpClient
        .get(`${this.baseUrl}/getAllMovies`, { headers });
    }


    getAllFromOMDB(title: string): Observable<any> {
      const headers = this.createHeaders();
      return this._httpClient
        .get(`${this.baseUrl}/fetchMovieListFromOMDb?title=${title}`, { headers });
    }

    getAllForUser(title: string): Observable<any> {
      const headers = this.createHeaders();
      return this._httpClient
        .get(`${this.baseUrl}/search?title=${title}`, { headers });
    }


    addRate2(movieId:number, rate:number):Observable<any> {
      // const headers = this.header;
      const headers = this.createHeaders();
      console.log(headers);
      console.log(`${this.baseUrl}/rateMovie?movieId=${movieId}&rate=${rate}`);
      return this._httpClient
        .post(`${this.baseUrl}/rateMovie?movieId=${movieId}&rate=${rate}`, {  });
    }

    // addRate(movieId:number, rate:number):Observable<any> {
    //   const headers = this.header;
    //   const url = `${this.baseUrl}/rateMovie?movieId=${movieId}&rate=${rate}`;
    //   console.log('Sending request to:', url);
    
    //   return this._httpClient.post(url, {}, { headers });
    // }

    addRate(movieId: number, rate: number): Observable<any> {
      const headers = this.header; // Ensure this is correctly initialized with required headers
      const url = `${this.baseUrl}/rateMovie`;
    
      const body = {
        movie_id: movieId,
        rate: rate,
      };
    
      console.log('Sending request to:', url, 'with body:', body);
    
      return this._httpClient.post(url, body, { headers, responseType: 'text' });
    }


    removeMovie(movieId:number): Observable<any> {
      const headers = this.header;
      return this._httpClient.delete(`${this.baseUrl}/removeMovie/${movieId}`, {headers});
    }


    removeMovies(): Observable<any> {
      const headers = this.header;
      return this._httpClient.delete(`${this.baseUrl}/removeAllMovies/`, {headers});
    }

    
}
