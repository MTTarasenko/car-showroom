import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private subject = new Subject<any>();

  constructor() {
  }

  updateCarsList(): void {
    this.subject.next(null);
  }

  onCarsListUpdate(): Observable<any> {
    return this.subject.asObservable();
  }
}
