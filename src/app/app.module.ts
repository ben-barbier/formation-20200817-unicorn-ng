import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MagicalNamePipe } from './shared/pipes/magical-name.pipe';
import { AgePipe } from './shared/pipes/age.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavComponent } from './shared/components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UnicornComponent } from './pages/unicorn/unicorn.component';
import { UnicornListComponent } from './pages/unicorn-list/unicorn-list.component';
import { UnicornCardComponent } from './pages/unicorn-list/unicorn-card/unicorn-card.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { ExercicesComponent } from './pages/exercices/exercices.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LOCATION_INITIALIZED } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        UnicornListComponent,
        UnicornCardComponent,
        MagicalNamePipe,
        AgePipe,
        NavComponent,
        UnicornComponent,
        ExercicesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatSnackBarModule,
        FormsModule,
        MatInputModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json'),
                deps: [HttpClient]
            }
        }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: APP_INITIALIZER,
            useFactory: loadTranslations,
            deps: [TranslateService, Injector],
            multi: true,
        },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

export function loadTranslations(translate: TranslateService, injector: Injector): any {
    return () =>
        new Promise<any>((resolve: any) => {
            const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
            locationInitialized.then(() => {
                const langToSet = 'fr';
                translate.setDefaultLang('fr');
                translate.use(langToSet).subscribe(
                    () => console.log(`Successfully initialized '${langToSet}' language.`),
                    () => console.error(`Problem with '${langToSet}' language initialization.`),
                    () => resolve(),
                );
            });
        });
}
