import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle'


import { getDutchPaginatorIntl } from './components/paginatorInt/CustomPaginatorConfiguration';


import { AuthInterceptorService } from './services/auth/auth-interceptor.service'
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Ng9RutModule } from 'ng9-rut';
import { ValidateEqualModule } from 'ng-validate-equal';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { HintDialogComponent, QuestionBarComponent } from './components/question-bar/question-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './views/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent, StartInstructionsComponent } from './views/start/start.component';
import { SearchComponent } from './views/search/search.component';
import { SearchResultComponent } from './views/search-result/search-result.component';
import { EndpointsService } from './services/endpoints/endpoints.service';
import { ViewPageComponent } from './views/view-page/view-page.component';
import { SafeurlPipe } from './services/safeurl/safeurl.pipe';
import { SessionComponent } from './views/session/session.component';
import { PreTestQuestionnaireComponent } from './views/pre-test-questionnaire/pre-test-questionnaire.component';
import { PostTestQuestionnaireComponent } from './views/post-test-questionnaire/post-test-questionnaire.component';
import { ResourceUploadComponent } from './views/resource-upload/resource-upload.component';
import { StudyCreationComponent } from './views/study-creation/study-creation.component';
import { ChallengeCreationComponent } from './views/challenge-creation/challenge-creation.component';
import { CreationComponent } from './views/creation/creation.component';
import { ConsentComponent } from './components/consent/consent.component';
import { SignupComponent } from './views/signup/signup.component';
import { AdminPanelComponent } from './views/admin-panel/admin-panel.component';
import { StudyDisplayComponent } from './views/study-display/study-display.component';
import { StudiesDisplayComponent } from './views/studies-display/studies-display.component';
import { AssentComponent } from './views/assent/assent.component';
import { GameService } from './services/game/game.service';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { AdminSearchResultComponent } from './views/admin-search-results/admin-search-result.component';
import { SummaryComponent } from './views/summary/summary.component';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { RecoveryComponent } from './views/recovery/recovery.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { PlayAgainComponent } from './views/play-again/play-again.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from "@angular/material/table";
import { LoginRedirectComponent } from './views/login-redirect/login-redirect.component';
import { NgxAudioPlayerModule } from "ngx-audio-player";
import { FooterComponent } from './components/footer/footer.component';
import { PlyrModule } from 'ngx-plyr';
import { TriviaHubComponent } from './views/trivia-hub/trivia-hub.component';
import { TriviaHubOpenComponent } from './views/trivia-hub-open/trivia-hub-open.component';
import { ErrorInterceptor } from './helpers/error-interceptor';
import { ForwardComponent } from './views/forward/forward.component';
import { PostStudyQuestionnaireComponent } from './views/post-study-questionnaire/post-study-questionnaire.component';
import { ChallengeUpdateComponent } from './views/challenge-update/challenge-update.component';
import { StudyUpdateComponent } from './views/study-update/study-update.component';
import { StudiesSearchComponent } from './views/studies-search/studies-search.component';
import { StudiesSearchResultsComponent } from './views/studies-search-results/studies-search-results.component';
import { StudySearchDisplayComponent } from './views/study-search-display/study-search-display.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { StaticsStudyComponent } from './views/statics-study/statics-study.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    QuestionBarComponent,
    HeaderComponent,
    LoginComponent,
    StartComponent,
    SearchComponent,
    SearchResultComponent,
    ViewPageComponent,
    SafeurlPipe,
    SessionComponent,
    PreTestQuestionnaireComponent,
    PostTestQuestionnaireComponent,
    ResourceUploadComponent,
    StudyCreationComponent,
    ChallengeCreationComponent,
    CreationComponent,
    SessionComponent,
    ConsentComponent,
    SignupComponent,
    AdminPanelComponent,
    ChallengeUpdateComponent,
    StudyDisplayComponent,
    StudyUpdateComponent,
    StudiesDisplayComponent,
    HintDialogComponent,
    AssentComponent,
    StartInstructionsComponent,
    UserProfileComponent,
    AdminSearchResultComponent,
    SummaryComponent,
    ImageSelectorComponent,
    RecoveryComponent,
    ForgotPasswordComponent,
    PlayAgainComponent,
    LoginRedirectComponent,
    FooterComponent,
    TriviaHubComponent,
    TriviaHubOpenComponent,
    ForwardComponent,
    PostStudyQuestionnaireComponent,
    StudiesSearchComponent,
    StudiesSearchResultsComponent,
    StudySearchDisplayComponent,
    SearchBarComponent,
    StaticsStudyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatCardModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    PdfViewerModule,
    Ng9RutModule,
    ValidateEqualModule,
    CommonModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    NgbModule,
    MatTableModule,
    NgxAudioPlayerModule,
    PlyrModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [EndpointsService,
    GameService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
