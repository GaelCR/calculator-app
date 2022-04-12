import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShopComponent } from './components/shop/shop.component';
import { CalculatorHttpRepositoryService } from './core/http/calculator-http-repository.service';
import { CalculatorHttpService } from './core/http/calculator-http.service';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CalculatorHttpRepositoryService,
    CalculatorHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
