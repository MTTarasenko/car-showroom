import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private subject = new Subject<any>();

  constructor() { }

  setSubj(value): void {
    this.subject.next(value);
  }

  updateCarsList(): Observable<any>{
    return this.subject.asObservable();
  }
}
