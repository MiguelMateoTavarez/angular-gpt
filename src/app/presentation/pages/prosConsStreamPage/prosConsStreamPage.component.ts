import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { GeminiAiService } from '@services/gemminiai.service';
import { TypingLoaderComponent } from "../../components/typingLoader/typingLoader.component";
import { MyMessageComponent } from "../../components/chat-bubbles/myMessage/myMessage.component";
import { ChatMessageComponent } from "../../components/chat-bubbles/chatMessage/chatMessage.component";
import { TextMessageBoxComponent } from "../../components/text-boxes/textMessageBox/textMessageBox.component";

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    TypingLoaderComponent,
    MyMessageComponent,
    ChatMessageComponent,
    TextMessageBoxComponent
],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public geminiAiService = inject(GeminiAiService);

  async handleMessage(prompt: string) {

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      },
      {
        isGpt: true,
        text: 'Comparando...'
      }
    ]);

    this.isLoading.set(true);
    const stream =this.geminiAiService.consultProsConsStream(prompt);
    this.isLoading.set(false);

    console.log(stream);

    for await (const text of stream) {
      this.handleStreamResponse(text);
    }

  }

  handleStreamResponse(message: string) {
    this.messages().pop();

    const messages = this.messages();

    this.messages.set([...messages, {
      isGpt: true,
      text: message
    }])
  }
}
