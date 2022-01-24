// Vendor
import {
  Component,
  OnInit,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

// Service
import { CommonService } from '@app/services/common.service';

// Models
import {
  WorkersResponseModel,
  FlightsResponseModel
} from '@app/models/index';

// Global constants
import * as AppGlobals from '@app/app-globals';

/**
 * Flights component.
 *
 * @author Nenad Stojković <nenstojkovic@gmail.com>
 */
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
})
export class FlightsComponent implements OnInit {
  // All subscriptions.
  subscriptions = new Subscription();

  // Data
  workers: WorkersResponseModel | any = [];
  flightsData: FlightsResponseModel | any = [];

  // Active row
  selectedId: number | any = null;
  selectedDetails: number | any = null;

  // Flight details
  showDetails: boolean = false;
  planeNumber: any;
  duration: any;
  originGate: any;
  destinationGate: any;

  /**
   * Class constructor.
   */
  constructor(
    private commonService: CommonService
  ) {
    // Get flights every 60 seconds
    const time = interval(AppGlobals.TIME_INTERVAL);
    this.subscriptions = time.subscribe(ev => this.getFlights(this.selectedId));
  }

  /**
   * OnInit lifecycle hook.
   */
  ngOnInit(): void {
    this.getWorkers();
  }

  /**
   * Its get workers data.
   *
   * @author Nenad Stojković <nenstojkovic@gmail.com>
   */
  getWorkers() {
    this.subscriptions.add(
      this.commonService.getWorkers().subscribe({
        next: (response: WorkersResponseModel) => {
          this.workers = response;
          this.getFlights(this.workers[0].id);
        },
        error: (error) => {
          console.log('DEBUG: getWorkers() -> Error --> ', error);
        },
      })
    );
  }

  /**
   * Its get flights data.
   *
   * @author Nenad Stojković <nenstojkovic@gmail.com>
   */
  getFlights(id: number) {
    // Set active class.
    this.selectedId = id;

    this.subscriptions.add(
      this.commonService.getFlights(id).subscribe({
        next: (response: FlightsResponseModel) => {
          this.flightsData = response;
          this.flightsDetails(this.flightsData[0]);
        },
        error: (error) => {
          console.log('DEBUG: getFlights() -> Error --> ', error);
        },
      })
    );
  }

  /**
   * Its shows flights details.
   *
   * @author Nenad Stojković <nenstojkovic@gmail.com>
   */
  flightsDetails(selectedFlight: any) {
    // Set active class.
    this.selectedDetails = selectedFlight.num;

    let time = selectedFlight.duration / 60;
    time.toFixed(2);

    this.showDetails = true;
    this.planeNumber = selectedFlight.num;
    this.duration = time;
    this.originGate = selectedFlight.from_gate;
    this.destinationGate = selectedFlight.to_gate;
  }

  /**
   * OnDestroy lifecycle hook.
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
