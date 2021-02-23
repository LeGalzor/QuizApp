import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public isModalOpen = new BehaviorSubject<boolean>(false);
  isModalOpen$ = this.isModalOpen.asObservable()
  
  // public correctCounter = new BehaviorSubject<number>(0);
  // correctCounter$ = this.correctCounter.asObservable();


  //---------------- Helper Methods---------------

  constructor() { }

  ngOnInit() {
  }

  toggleModal(){
    const modalState = this.isModalOpen.value;
    this.isModalOpen.next(!modalState)
  }

}
