import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private subject = new Subject<any>();

  constructor() {
  }

  updateCarsList(value?): Observable<any> {
    if (value) {
      this.subject.next(value);
    }
    return this.subject.asObservable();
  }
}
