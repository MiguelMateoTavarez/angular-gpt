import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-text-message-box',
  standalone: true,
  imports: [],
  templateUrl: './textMessageBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent {
  placeHolder = input<string>('');
  disableCorrections = input<boolean>(false);
  onMessage = output<string>();
}
