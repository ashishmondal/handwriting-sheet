import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, debounceTime } from 'rxjs/operators';

import { JoinerService } from '../joiner.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {

  vGrid = new Array(10).fill(0);

  textToRender$: Observable<string[][]>;

  private text$ = new BehaviorSubject<string>('');

  @Input()
  set text(value: string) {
    this.text$.next(value || '');
  }

  @Input()
  fontSize: number;

  @Input()
  fontColor: string;

  constructor(joiner: JoinerService) {
    this.textToRender$ = this.text$.pipe(
      debounceTime(500),
      switchMap(t => joiner.join(t)),
      map(text => text.split('\n')
        .reduce((p, c) => [...p, `:${c}`, `:`], [] as string[])
        .map(t => t.split(';'))
      )
    );
  }

  ngOnInit(): void {
  }

}
