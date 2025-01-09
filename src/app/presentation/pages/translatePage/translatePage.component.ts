import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from "../../components/chat-bubbles/chatMessage/chatMessage.component";
import { MyMessageComponent } from "../../components/chat-bubbles/myMessage/myMessage.component";
import { TypingLoaderComponent } from "../../components/typingLoader/typingLoader.component";
import { Message } from '@interfaces/message.interface';
import { Option, TextMessageBoxEvent, TextMessageBoxSelectComponent } from "../../components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component";
import { GeminiAiService } from '@services/gemminiai.service';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './translatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public geminiAiService = inject(GeminiAiService);

  public languages = signal<Option[]>([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);

  handleMessageWithSelected(event: TextMessageBoxEvent) {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: `Traduce este texto: ${event.prompt} a este lenguage: ${event.selectedOption}`
      }
    ]);

    this.geminiAiService.translateText(event.prompt, event.selectedOption)
      .subscribe((resp) => {
        this.isLoading.set(false);

        this.messages.update((prev) => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
          }
        ]);
      });
  }
}
