import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThingListComponent } from './thing-list/thing-list.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CuComponent } from './auth/cu/cu.component';
import { RgComponent } from './auth/rg/rg.component';
import { LgComponent } from './auth/lg/lg.component';

@NgModule({
  declarations: [
    AppComponent,
    ThingListComponent,
    AuthComponent,
    CuComponent,
    RgComponent,
    LgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
