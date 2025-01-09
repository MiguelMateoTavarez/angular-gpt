import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '@interfaces/message.interface';
import { ChatMessageComponent } from "../../presentation/components/chat-bubbles/chatMessage/chatMessage.component";
import { MyMessageComponent } from "../../presentation/components/chat-bubbles/myMessage/myMessage.component";
import { TypingLoaderComponent } from "../../presentation/components/typingLoader/typingLoader.component";
import { TextMessageBoxComponent } from "../../presentation/components/text-boxes/textMessageBox/textMessageBox.component";
import { GeminiAiService } from '@services/gemminiai.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    ReactiveFormsModule,
    TypingLoaderComponent,
    TextMessageBoxComponent
],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public geminiAiService = inject(GeminiAiService);

  handleMessage(prompt: string) {
    console.log(prompt);
  }
}
