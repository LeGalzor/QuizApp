import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  
  correctCounter: number = 0;

  constructor(public quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.subscribeToCorrectAnswers();
  }
  subscribeToCorrectAnswers() {
    this.quizService.correctCounter.subscribe( counter => {
      this.correctCounter = counter;
    })
  }
  retry(){
    this.quizService.initSubjectsAfterFinish();
    this.router.navigate(['/']);
  }

}
