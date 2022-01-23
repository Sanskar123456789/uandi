import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule ,Routes} from '@angular/router';
import {CardModule} from 'primeng/card';
import {TabMenuModule} from 'primeng/tabmenu';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
const UI = [
  ButtonModule,
  TabMenuModule,
  CardModule,
  ToolbarModule
]

const routes : Routes = [{
  path: 'home',
  component: AppComponent,
}]


@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes),...UI],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
