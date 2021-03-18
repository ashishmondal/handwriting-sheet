import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

type Table = Record<string, Record<string, string>>;

@Injectable({
  providedIn: 'root'
})
export class JoinerService {

  private readonly joinList$: Observable<Table>;

  constructor(http: HttpClient) {
    this.joinList$ = http.get<Table>('assets/join-list.json').pipe(shareReplay());
  }

  join(text: string): Observable<string> {
    return this.joinList$.pipe(
      map(list => text.split(' ').map(w => this.joinWord2(w, list)).join(' '))
    );
  }

  joinWord(word: string, list: string[]): string {
    return word.split('').map((letter, index) => {
      if (index === word.length - 1) {
        return letter;
      }

      const regex = new RegExp(`${letter}.${word[index + 1]}`);

      return list.find(i => i.match(regex))?.substring(0, 2) || letter;

    }).join('');
  }

  joinWord2(word: string, list: Table): string {
    return word.split('').map((letter, index) => {
      if (index === word.length - 1) {
        return letter;
      }

      const joiner = (list[letter] && list[letter][word[index + 1]]) || '';

      return letter + joiner;

    }).join('');
  }
}
