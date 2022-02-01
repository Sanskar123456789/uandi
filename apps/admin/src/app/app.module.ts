import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import {CardModule} from 'primeng/card';
import {TabMenuModule} from 'primeng/tabmenu';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { ServiceComponent } from './components/service/service.component';
import {TableModule} from 'primeng/table';
import { TagModule } from 'primeng/tag';
import {InputTextModule} from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import {ChartModule} from 'primeng/chart';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewServiceComponent } from './components/new-service/new-service.component';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { BlogsComponent } from './components/blogs/blogs.component';
import { NewBlogsComponent } from './components/new-blogs/new-blogs.component';
import { ApplianceComponent } from './components/appliance/appliance.component';
import { ApplianceNewComponent } from './components/appliance-new/appliance-new.component';
import {CheckboxModule} from 'primeng/checkbox';
import { ContactComponent } from './components/contact/contact.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { OfferComponent } from './components/offer/offer.component';
import { OfferNewComponent } from './components/offer-new/offer-new.component';
import { OrderComponent } from './components/order/order.component';
import { OrderNewComponent } from './components/order-new/order-new.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LoginModule } from '@uandi/login';
import { ShellComponentComponent } from './components/shell-component/shell-component.component';
import {AuthGuardService, JwtinterceptorInterceptor} from '@uandi/service'

const UI = [
  DropdownModule,
  ChartModule,
  ProgressSpinnerModule,
  ConfirmDialogModule,
  CheckboxModule,
  ToastModule,
  InputTextareaModule,
  ButtonModule,
  InputSwitchModule,
  InputTextModule,
  FileUploadModule,
  TabMenuModule,
  CardModule,
  ToolbarModule,
  TableModule,
  TagModule
]

const routes : Routes = 
[
  {
  path:'',
  component:ShellComponentComponent,
  canActivate:[AuthGuardService],
    
  children: [
  {path: 'home',
    component: DashboardComponent,
  },
  {
    path: 'Category',
    component: CategoryComponent
  },
  {
    path: 'newCategory',
    component:CategoryNewComponent
  },
  {
    path:'editCategory/:id',
    component:CategoryNewComponent
  },
  {
    path: 'service',
    component: ServiceComponent
  },
  {
    path : 'newservice',
    component: NewServiceComponent
  },
  {
    path:'editService/:id',
    component:NewServiceComponent
  },
  {
    path:"blogs",
    component:BlogsComponent
  },
  {
    path:"newBlog",
    component:NewBlogsComponent
  },
  {
    path:"editBlog/:id",
    component:NewBlogsComponent
  },
  {
    path:"appliance",
    component:ApplianceComponent
  },
  {
    path:"newAppliance",
    component:ApplianceNewComponent
  },
  {
    path:"editAppliance/:id",
    component:ApplianceNewComponent
  },{
    path:"contact",
    component:ContactComponent
  },
  {
    path:"contact/:id",
    component:ContactEditComponent
  },
  {
    path:"user",
    component:UserComponent
  },
  {
    path:"userDetail/:id",
    component:UserDetailComponent
  },
  {
    path:"Offer",
    component:OfferComponent
  },
  {
    path:"NewOffer",
    component:OfferNewComponent
  },
  {
    path:"EditOffer/:id",
    component:OfferNewComponent
  },
  {
    path:"Order",
    component:OrderComponent
  },
  {
    path:"NewOrder/:id",
    component:OrderNewComponent
  }
  ]
  }
]

@NgModule({
  declarations: [AppComponent, HeaderComponent, ServiceComponent, NewServiceComponent, BlogsComponent, NewBlogsComponent, ApplianceComponent, ApplianceNewComponent, ContactComponent, ContactEditComponent, UserComponent, UserDetailComponent, OfferComponent, OfferNewComponent, OrderComponent, OrderNewComponent, DashboardComponent, CategoryComponent, CategoryNewComponent, ShellComponentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LoginModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ...UI
  ],
  providers: [MessageService,ConfirmationService,
  {
    provide:HTTP_INTERCEPTORS,useClass:JwtinterceptorInterceptor,multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
