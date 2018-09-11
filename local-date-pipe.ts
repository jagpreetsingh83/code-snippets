import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';

@Pipe({
  name: 'localizedDate'
})
export class I18N implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  // public transform(value: any, args?: any): Observable<string> {
  //   return this.translateService.onLangChange.pipe(
  //     map(data =>
  //       new DatePipe(this.translateService.getBrowserCultureLang()).transform(value, data.translations.dateFormat)
  //     )
  //   );
  // }

  // public transform(date: any, pattern: string = 'shortDate'): string {
  //   const currentLang = this.translateService.currentLang + '-CA';
  //   return new DatePipe(currentLang).transform(date, pattern);
  // }

  public transform(value: any, args?: any): Subject<string> {
    const translatedDate = new Subject<string>();
    const dateFormat = 'dateFormat';
    const update = format => {
      translatedDate.next(
        new DatePipe(this.translateService.getBrowserCultureLang()).transform(
          value,
          format
        )
      );
    };
    setTimeout(() => {
      update(this.translateService.instant(dateFormat));
    }, 0);
    this.translateService.onLangChange.subscribe(data =>
      update(data.translations[dateFormat])
    );
    return translatedDate;
  }
}
