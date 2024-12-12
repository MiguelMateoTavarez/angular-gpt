import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [
    MarkdownModule
  ],
  templateUrl: './chatMessage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  text = input.required<string>();
}
