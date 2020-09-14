import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AuthGuard} from './services/auth-guard.service';
import { Routes, RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MeComponent } from './auth/me/me.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ForumComponent } from './forum/forum.component';
import { ErrorSearchComponent } from './error-search/error-search.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/me', component: MeComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'not-found', component: ErrorSearchComponent },
  { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    MeComponent,
    AccueilComponent,
    ForumComponent,
    ErrorSearchComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
