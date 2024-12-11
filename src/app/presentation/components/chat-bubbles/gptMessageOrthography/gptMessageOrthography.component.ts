import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthography',
  standalone: true,
  imports: [],
  templateUrl: './gptMessageOrthography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthographyComponent {
  userScore = input.required<number>();
  errors = input.required<string[]>();
  text = input<string>();
}
