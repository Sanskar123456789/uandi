import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule ,Routes} from '@angular/router';
import {CardModule} from 'primeng/card';
import {TabMenuModule} from 'primeng/tabmenu';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { ShellComponent } from './components/shell/shell.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ServiceTemplateComponent } from './components/service-template/service-template.component';
import {CarouselModule} from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { LoginModule } from '@uandi/login';
import { ApplianceComponent } from './components/appliance/appliance.component';
import { UserAuthGuardService } from '@uandi/service';
const UI = [
  InputTextModule,
  ButtonModule,
  TabMenuModule,
  CardModule,
  ToolbarModule,
  CarouselModule
]

const routes : Routes = [{
  path: '',
  component: ShellComponent,
  children: [
    {
      path:'home',
      component:HomepageComponent
    },
    {
      path:'category/:id',
      component:CategoryComponent
    },
    {
      path:'appliance/:id',
      component:ApplianceComponent
    },
    {
      path:'wishlist',
      component:HomepageComponent,
      canActivate:[UserAuthGuardService]
    }
  ]
}]


@NgModule({
  declarations: [AppComponent, HeaderComponent, ShellComponent, SidebarComponent, HomepageComponent, ServiceTemplateComponent, FooterComponent, CategoryComponent, ApplianceComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes),...UI,HttpClientModule,ReactiveFormsModule,FormsModule,LoginModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
