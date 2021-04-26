import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {CartPageComponent} from './cart-page/cart-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {AuthInterseptor} from './shared/auth.interseptor';
import {ProductComponent} from './product/product.component';
import { SortingPipe } from './shared/sorting.pipe';

@NgModule({ // декоратор без которого мы не сможем создать модуль
  declarations: [ // классы представлений который принадлежит модулю Angular имеет три типа классов представлений:
    // компоненты (components), директивы (directives), каналы (pipes)
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CartPageComponent,
    ProductComponent,
    SortingPipe,
  ],
  imports: [
    BrowserModule, // необходим для работы  с браузером
    AppRoutingModule,
    FormsModule, // необходим для работы с формами
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
  ],
  providers: [ // классы, создающие сервисы используемые модулем
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterseptor
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent] // корневой компонент, который вызывается по умолчанию  при загрузке приложения
})
export class AppModule {
}
