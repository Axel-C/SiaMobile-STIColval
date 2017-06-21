import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { WatchPage } from '../watch/watch';
import { TicketPage} from '../ticket/ticket';
import { GroupPage} from '../group/group';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TicketPage;
  tab2Root: any = HomePage;
  tab3Root: any = GroupPage;
  tab4Root: any = WatchPage;

  constructor() {

  }
}
