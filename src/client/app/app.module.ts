import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
  APP_BASE_HREF, HashLocationStrategy, LocationStrategy, PathLocationStrategy,
  PlatformLocation
} from '@angular/common';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HomeModule} from './home/home.module';
import {SharedModule} from './shared/shared.module';


export function locationFactory(platformLocation: PlatformLocation): LocationStrategy {
  let w: any = window;
  if (w && w.process && w.process.type) {
    return new HashLocationStrategy(platformLocation);
  }
  return new PathLocationStrategy(platformLocation);
}

export function getBaseHref(): String {
  let w: any = window;
  if (w && w.process && w.process.type) {
    return '/';
  }
  return '/';
}





@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, HomeModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useFactory: getBaseHref
  }, {
    provide: LocationStrategy,
    useFactory: locationFactory,
    deps: [PlatformLocation]
  }],
  bootstrap: [AppComponent]

})
export class AppModule {
}
