import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

@NgModule({
            declarations: [
              AppComponent,
            ],
            imports:      [
              BrowserModule,
              BrowserAnimationsModule,
              HttpClientModule,
              FormsModule,
              MatFormFieldModule,
              MatInputModule,
              MatButtonModule,
              MatTableModule,
              MatCardModule,
              MatSelectModule,
              MatSortModule,
              MatExpansionModule,
              MatSnackBarModule
            ],
            providers:    [],
            bootstrap:    [AppComponent]
          })
export class AppModule {
}
