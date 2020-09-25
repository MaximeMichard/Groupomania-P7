import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';

import { AuthGuard} from './services/auth-guard.service';
import { Userservice } from './services/user.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MeComponent } from './auth/me/me.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ForumComponent } from './forum/forum.component';
import { ErrorSearchComponent } from './error-search/error-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumPostComponent } from './forum/forum-post/forum-post.component';
import { ListCommentaireComponent } from './forum/list-commentaire/list-commentaire.component';
import { CommentaireComponent } from './forum/commentaire/commentaire.component';
import { CreatepostComponent } from './forum/createpost/createpost.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/me',canActivate:[AuthGuard],component: MeComponent },
  { path: 'accueil',canActivate:[AuthGuard],component: AccueilComponent },
  { path: 'forum',canActivate:[AuthGuard],component: ForumComponent },
  { path: 'forum/createPost',canActivate:[AuthGuard],component: CreatepostComponent},
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
    ForumPostComponent,
    ListCommentaireComponent,
    CommentaireComponent,
    CreatepostComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
    Userservice
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
