import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';
import { ChatMessageComponent } from "../../presentation/components/chat-bubbles/chatMessage/chatMessage.component";
import { MyMessageComponent } from "../../presentation/components/chat-bubbles/myMessage/myMessage.component";
import { TypingLoaderComponent } from "../../presentation/components/typingLoader/typingLoader.component";
import { TextMessageBoxComponent } from "../../presentation/components/text-boxes/textMessageBox/textMessageBox.component";

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
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    console.log(prompt);
  }
}
