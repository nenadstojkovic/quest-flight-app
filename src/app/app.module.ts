// Vendor
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Module
import { AppRoutingModule } from '@app/app-routing.module';

// Pipe
import { TimeFormatPipe } from '@app/pipe/time-format.pipe';

// Components
import { AppComponent } from '@app/app.component';
import { FlightsComponent } from '@app/components/flights/flights.component';

/**
 * App module.
 */
@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
