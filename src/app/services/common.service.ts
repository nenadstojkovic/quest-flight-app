// Vendor
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Models
import {
  WorkersResponseModel,
  FlightsResponseModel
} from '@app/models/index';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  /**
   * Class constructor.
   */
  constructor(
    private http: HttpClient
  ) {}

  /**
   * It gets employee data.
   *
   * @author Nenad Stojković <nenstojkovic@gmail.com>
   * @return `EmployeeResponseModel` Array of objects.
   */
  getWorkers(): Observable<WorkersResponseModel> {
    const data: any = 'https://interview-mock.herokuapp.com/api/workers/';
    return this.http.get<WorkersResponseModel>(data);
  }

  /**
   * It gets employee data.
   *
   * @author Nenad Stojković <nenstojkovic@gmail.com>
   * @return `ShiftsResponseModel` Array of objects.
   */
  getFlights(id: number): Observable<FlightsResponseModel> {
    const data = `https://interview-mock.herokuapp.com/api/workers/${id}`;
    return this.http.get<FlightsResponseModel>(data);
  }
}
