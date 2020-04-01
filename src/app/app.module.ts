import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './loginComponents/_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './loginComponents/_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './loginComponents/home';
import { LoginComponent } from './loginComponents/login';
import { RegisterComponent } from './loginComponents/register';
import { AlertComponent } from './loginComponents/_components';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule  } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardComponent } from './dashboard/dashboard-component/dashboard-component.component';
import { ConfirmDialogComponent } from './dashboard/confirm-dialog/confirm-dialog.component';
import { DialogComponent } from './dashboard/dialog/dialog.component';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
    imports: [
BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
        MatPaginatorModule,
        MatSnackBarModule,
        AvatarModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        DashboardComponent,
        DialogComponent,
        ConfirmDialogComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogComponent,
        ConfirmDialogComponent
    ]
})
export class AppModule { };