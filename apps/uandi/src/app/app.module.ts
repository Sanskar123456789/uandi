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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { LoginModule } from '@uandi/login';
import { ApplianceComponent } from './components/appliance/appliance.component';
import { JwtinterceptorInterceptor, UserAuthGuardService } from '@uandi/service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UserComponent } from './components/user/user.component';
import { CartComponent } from './components/cart/cart.component';
import { BlogComponent } from './components/blog/blog.component';
import { CompanyComponent } from './components/company/company.component';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import {BadgeModule} from 'primeng/badge';
import {DialogModule} from 'primeng/dialog';
import {ImageModule} from 'primeng/image';
import { OffersComponent } from './components/offers/offers.component';
import {AccordionModule} from 'primeng/accordion';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {StepsModule} from 'primeng/steps';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { OrderComponent } from './components/order/order.component';
import { ServicesComponent } from './components/services/services.component';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
const UI = [
  StepsModule,
  CalendarModule,
  RatingModule,
  CheckboxModule,
  RadioButtonModule,
  DialogModule,
  AccordionModule,
  ImageModule,
  BadgeModule,
  ToastModule,
  InputTextareaModule,
  DropdownModule,
  AvatarModule,
  AvatarGroupModule,
  TableModule,
  InputTextModule,
  ButtonModule,
  TabMenuModule,
  CardModule,
  ToolbarModule,
  CarouselModule,
  ProgressSpinnerModule,
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
    },{
      path:'service/:id',
      component:ServicesComponent
    },
    {
      path:'wishlist',
      component:WishlistComponent,
      canActivate:[UserAuthGuardService]
    },{
      path:'cart',
      component:CartComponent,
      canActivate:[UserAuthGuardService]
    },
    {
      path:'company',
      component:CompanyComponent,
    },
    {
      path:'blog',
      component:BlogComponent,
    },
    {
      path:'user',
      component:UserComponent,
      canActivate:[UserAuthGuardService]
    },{
      path:'offer',
      component:OffersComponent,
    },{
      path:'Order',
      component:OrderComponent,
      canActivate:[UserAuthGuardService]
    }
  ]
}]


@NgModule({
  declarations: [AppComponent, HeaderComponent, ShellComponent, SidebarComponent, HomepageComponent, ServiceTemplateComponent, FooterComponent, CategoryComponent, ApplianceComponent, WishlistComponent, UserComponent, CartComponent, BlogComponent, CompanyComponent, OffersComponent, OrderComponent, ServicesComponent],
  imports: [BrowserModule,
    RouterModule.forRoot(routes),
    ...UI,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LoginModule,
    SocialLoginModule,
    NgxUiLoaderModule
    // NgxUiLoaderRouterModule.forRoot({ showForeground: false })
    // NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide:HTTP_INTERCEPTORS,useClass:JwtinterceptorInterceptor,multi:true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '797105844993-tso81t951hg5gt7vs76g3omm57slhuuc.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
