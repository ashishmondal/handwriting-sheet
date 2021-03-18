import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  text = 'The quick brown fox jumps over the lazy dog.\nSphinx of black quartz, judge my vow.\nAmazingly few discotheques provide jukeboxes.';
  fontSize = 32;
  fontColor = '#000000';
}
