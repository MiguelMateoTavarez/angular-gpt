import { Injectable } from '@angular/core';
import { orthographyUseCase, prosConsStreamUseCase, prosConsUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GeminiAiService {

  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  consultProsCons(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  consultProsConsStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

}
