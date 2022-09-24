import { Component, VERSION } from '@angular/core';
import {
  map,
  Observable,
  first,
  last,
  filter,
  reduce,
  from,
  interval,
} from 'rxjs';
const observable = new Observable((observer) => {
  observer.next('Observable0');
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      observer.next('Observable' + (i + 1));
    }
    // observer.error(new Error('Error from observable'));
    observer.complete();
  }, 2000);
});

const observable1 = new Observable((observer) => {
  let arrayRes1 = [];
  for (let i = 0; i < 2; i++) {
    arrayRes1.push('ObservableA' + (i + 1));
  }
  let arrayRes2 = [];
  for (let i = 0; i < 2; i++) {
    arrayRes2.push('ObservableB' + (i + 1));
  }
  setTimeout(() => {
    observer.next(arrayRes1);
    observer.next(arrayRes2);
    // observer.error(new Error('Error from observable'));
    observer.complete();
  }, 2000);
});
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  subscription;
  fetch() {
    observable
      .pipe(
        map((x) => x + 'added'),
        reduce((result, currentValue) => {
          return result + ' ' + currentValue;
        }, '')
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }

  fetch1() {
    from([1, 2, 3]).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  fetch2() {
    observable1
      .pipe(
        map((x: string[]) => {
          return x.map((y) => y + 'added');
        }),
        reduce((result, currentValue) => {
          return result + ' ' + currentValue;
        }, '')
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }

  fetch3() {
    this.subscription = interval(1000).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
  unsubscribe() {
    this.subscription.unsubscribe();
  }
}
