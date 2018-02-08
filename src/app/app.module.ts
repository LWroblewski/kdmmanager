import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home.component';
import {ListPage} from '../pages/list/list.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MobxAngularModule} from "mobx-angular";
import {HeaderComponent} from "./core/components/header/header.component";
import {IonicStorageModule} from "@ionic/storage";
import {SettlementStore} from "./core/stores/settlement.store";
import {DetailPage} from "../pages/detail/detail.component";
import {PopulationPage} from "../pages/detail/population/population.component";
import {TimelinePage} from "../pages/detail/timeline/timeline.component";
import {HttpClientModule} from "@angular/common/http";
import {UserStore} from "./core/stores/user.store";
import {UsersPage} from "../pages/users/users.component";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    UsersPage,
    HeaderComponent,
    PopulationPage,
    TimelinePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    MobxAngularModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    UsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SettlementStore,
    UserStore,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
