import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {catchError, tap} from 'rxjs/operators'

import {Exercise} from '../models/exercise'

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {
  }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>('http://localhost:3000/exercises').pipe(
      tap(exercises => console.debug(exercises)),
      catchError(this.createErrorHandler<Exercise[]>())
    )

  }

  getExercise(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`http://localhost:3000/exercise/${id}`).pipe(
      tap(exercise => console.debug(exercise)),
      catchError(this.createErrorHandler<Exercise>())
    )

  }

  private createErrorHandler<T>() {
    return (error: any, caught: Observable<T>): Observable<T> => {
      console.error(error)

      return caught
    }
  }
}
