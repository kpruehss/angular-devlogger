import { Injectable } from '@angular/core';
import { Log } from '../models/log.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null,
  });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated Components',
    //     date: new Date('12/26/2017 12:54:23'),
    //   },
    //   {
    //     id: '2',
    //     text: 'Added Bootstrap',
    //     date: new Date('12/27/2017 09:33:13'),
    //   },
    //   {
    //     id: '3',
    //     text: 'Added logs component',
    //     date: new Date('12/27/2017 12:00:23'),
    //   },
    // ];
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    console.log(log.id);
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1, log);
      }
    });
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
  }

  clearState() {
    this.stateSource.next(true);
  }
}
