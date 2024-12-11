import { Injectable } from '@angular/core';
import { orthographyUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GeminiAiService {

  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

}
