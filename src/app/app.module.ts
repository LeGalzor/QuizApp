import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { RouterModule } from '@angular/router';
import { QuizService } from './shared/quiz.service';
import { routes } from './app-routing.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AnswerModalComponent } from './components/answer-modal/answer-modal.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ResultComponent,
    ProgressBarComponent,
    AnswerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
