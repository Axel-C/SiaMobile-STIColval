import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { Login } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { TicketPage } from '../pages/ticket/ticket';
import { OptionPage } from '../pages/option/option';
import { DetailsPage } from '../pages/details/details';
import { GroupPage } from '../pages/group/group';
import { HttpModule }      from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    TabsPage ,
    OptionPage ,
    DetailsPage ,
    TicketPage ,
    GroupPage ,
    Login
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    TabsPage ,
    OptionPage ,
    DetailsPage ,
    TicketPage ,
    GroupPage ,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
