import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from "../../components/chat-bubbles/chatMessage/chatMessage.component";
import { MyMessageComponent } from "../../components/chat-bubbles/myMessage/myMessage.component";
import { TypingLoaderComponent } from "../../components/typingLoader/typingLoader.component";
import { TextMessageBoxComponent } from "../../components/text-boxes/textMessageBox/textMessageBox.component";
import { Message } from '@interfaces/message.interface';
import { GeminiAiService } from '@services/gemminiai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public geminiAiService = inject(GeminiAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.geminiAiService.consultProsCons(prompt)
      .subscribe((resp) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          {
            isGpt: true,
            text: resp.answer,
          }
        ]);
      });

  }
}
