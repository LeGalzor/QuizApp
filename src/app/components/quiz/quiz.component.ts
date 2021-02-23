import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuizService } from 'src/app/shared/quiz.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AnswerModalComponent } from '../answer-modal/answer-modal.component';
import { ModalService } from 'src/app/shared/modal.service';

export interface DialogData {
  answerResult: boolean;
  rightAnswer: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizQuestions: Question[] = [];
  quizAnswers: number[] = [];
  qnProgress: number = 0;
  correctCounter: number = 0;

  @ViewChild('appProgressBar') child:ProgressBarComponent;

  constructor(
    public quizService: QuizService,
     private router: Router,
     public dialog: MatDialog,
     public modalService: ModalService) { }

  ngOnInit(): void {
    this.subscribeToQuizQuestions();
    this.subscribeToCurrentQuestion();
  }
  subscribeToCurrentQuestion() {
    this.quizService.currentQuestion.subscribe( index => {
      this.qnProgress = index;
    })
  }

  subscribeToQuizQuestions() {
    this.quizService.getQuestions().subscribe( questions => {
      this.quizQuestions = questions as Question[];
      this.quizService.updateQuestions(this.quizQuestions);
      this.subscribeToQuizAnswers();
    })
  }
  subscribeToQuizAnswers() {
    this.quizService.getAnswers(this.quizQuestions).subscribe( answers => {
      this.quizAnswers = answers as number[];
    })
  }
  subscribeToModalState(){
    this.modalService.isModalOpen.subscribe( modalState => {
    if (this.qnProgress == 10) {
      if (!modalState){
        this.router.navigate(['/result']);
      }
        }
      })
  }

  openDialog(answerResult: boolean, rightAnswer?: String) {
    this.modalService.toggleModal();
    this.dialog.open(AnswerModalComponent , {
      data: {
        answerResult,
        rightAnswer
      }
    });
}
  getFirstQn(qnProgress){
    if (this.quizQuestions && this.quizQuestions.length){
      return this.quizQuestions[qnProgress].Qn;
    }
  }
  
  answer(qID, choice) {
    let hasUpdated = false;
    if (this.quizAnswers[qID] === choice){
      this.openDialog(true);
      this.quizService.countCorrect();
    }else{
      this.openDialog(false, this.findRightAnswer(qID));
    }
    this.dialog.afterAllClosed.subscribe(data => {
      if (!hasUpdated){
        this.qnProgress++;
        hasUpdated = true;
        if (this.quizAnswers[qID] === choice){
          this.child.progress(this.qnProgress, true);
        }
      }
      if (this.qnProgress == 10) {
        this.router.navigate(['/result']);
      }
      this.quizService.nextQuestion(this.qnProgress);
    })

  }

  findRightAnswer(qID: any): String {
    const answerID = this.quizAnswers[qID];
    return this.quizQuestions[qID].Options[answerID];
  }
}
