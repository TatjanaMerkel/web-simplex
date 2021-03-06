import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'

import * as math from 'mathjs'
import {Observable, throwError} from 'rxjs'
import {catchError, tap} from 'rxjs/operators'

import {Exercise} from '../models/exercise'
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${environment.API_URL}/exercises`).pipe(
      tap(exercises => console.debug(exercises)),
      catchError(ExerciseService.handleError)
    )
  }

  getExercise(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${environment.API_URL}/exercise/${id}`).pipe(
      tap(exercise => console.debug(exercise)),
      catchError(ExerciseService.handleError)
    )
  }

  postExercise(exercise: Exercise): Observable<Exercise> {
    const replacer = (math as any).replacer

    const dbExercise = {
      ...exercise,
      targetVars: JSON.stringify(exercise.targetVars, replacer),
      constraintVars: JSON.stringify(exercise.constraintVars, replacer),
      constraintVals: JSON.stringify(exercise.constraintVals, replacer)
    }

    return this.http.post<Exercise>(`${environment.API_URL}/exercise`, dbExercise, this.httpOptions).pipe(
      tap(exercise => console.debug(exercise)),
      catchError(ExerciseService.handleError)
    )
  }

  putExercise(exercise: Exercise): Observable<any> {
    const replacer = (math as any).replacer

    const dbExercise = {
      ...exercise,
      targetVars: JSON.stringify(exercise.targetVars, replacer),
      constraintVars: JSON.stringify(exercise.constraintVars, replacer),
      constraintVals: JSON.stringify(exercise.constraintVals, replacer)
    }

    return this.http.put(`${environment.API_URL}/exercise/${exercise.id}`, dbExercise, this.httpOptions).pipe(
      tap(exercise => console.debug(exercise)),
      catchError(ExerciseService.handleError)
    )
  }

  deleteExercise(id: number): Observable<Exercise> {
    return this.http.delete<Exercise>(`${environment.API_URL}/exercise/${id}`, this.httpOptions).pipe(
      tap(exercise => console.debug(exercise)),
      catchError(ExerciseService.handleError)
    )
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
