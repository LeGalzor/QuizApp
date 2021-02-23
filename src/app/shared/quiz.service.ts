import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../model/question';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class QuizService implements OnInit {
  //---------------- Properties---------------
  readonly rootUrl = 'https://localhost:44356';
  qns: Question[];
  qnProgress: number = 0;

  public currentQuestion = new BehaviorSubject<number>(0);
  currentQuestion$ = this.currentQuestion.asObservable()
  
  public correctCounter = new BehaviorSubject<number>(0);
  correctCounter$ = this.correctCounter.asObservable();

  public questions = new Subject<Question[]>();
  questions$ = this.questions.asObservable();



  //---------------- Helper Methods---------------

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  initSubjectsAfterFinish(){
    this.currentQuestion.next(0);
    this.correctCounter.next(0);
    this.questions.next([]);
  }

  nextQuestion(currentQuestionNumber) {
    this.currentQuestion.next(currentQuestionNumber);
  }

  updateQuestions(questions: Question[]) {
    this.questions.next(questions);
  }

  countCorrect(){
    let newCounter = this.correctCounter.value +1;
    this.correctCounter.next(newCounter)
  }


  //---------------- Http Methods---------------

  getQuestions() {
    return this.http.get(this.rootUrl + '/api/Questions');
  }

  getAnswers(questions: Question[]) {
    let body = questions.map(x => x.QnID)
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }

}
