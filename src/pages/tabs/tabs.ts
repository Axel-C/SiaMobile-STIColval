import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { OptionPage } from '../option/option';
import { TicketPage} from '../ticket/ticket';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = TicketPage;
  tab3Root: any = OptionPage;

  constructor() {

  }
}
