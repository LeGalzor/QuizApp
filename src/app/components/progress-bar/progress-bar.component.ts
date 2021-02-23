import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Question } from 'src/app/model/question';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  
  @Input() questions: Question[];

  constructor(public quizService: QuizService) { }

  ngOnInit(): void {
    this.subscribeToCurrentQuestion();
  }
  subscribeToCurrentQuestion() {
    this.quizService.currentQuestion$.subscribe(currentQuestionNumber => {
      setTimeout(() => {
        this.progress(currentQuestionNumber);
      }, 100);
    })
  }
  isCurrentElement(elementId: string, stepNum: number): boolean{
    const stepNumber = stepNum - 1;
    return elementId === stepNumber.toString()
  }

 progress(stepNum, answer?) {
  let els = document.getElementsByClassName('step');
  let steps = [];
  Array.prototype.forEach.call(els, (e) => {
    steps.push(e);
  });
  steps.forEach((e) => {
    if (e.id === stepNum.toString()) {
      e.classList.add('selected');
    }
    if (e.id < stepNum.toString()) {
      e.classList.remove('selected');
      if (answer === true && this.isCurrentElement(e.id, stepNum)){
        e.classList.add('correct')
      }else{
        e.classList.add('wrong');
      }
    }
    if (e.id > stepNum.toString()) {
      if (answer === true && this.isCurrentElement(e.id, stepNum)){
        e.classList.remove('selected');
        e.classList.add('wrong')
      }
      e.classList.remove('selected');
    }
  });
}
}
