import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { FirstComponent } from './pages/first/first.component';
import { SecondComponent } from './pages/second/second.component';
import { ThirdComponent } from './pages/third/third.component';
import { FourthComponent } from './pages/fourth/fourth.component';
import { FifthComponent } from './pages/fifth/fifth.component';
import { LightboxModule } from 'ngx-lightbox';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SearchComponent } from './shared/components/search/search.component';  


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    FourthComponent,
    FifthComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LightboxModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
