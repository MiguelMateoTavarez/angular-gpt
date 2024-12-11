import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent } from '@components/index';
import { TypingLoaderComponent } from "@components/typingLoader/typingLoader.component";
import { TextMessageBoxComponent } from "@components/text-boxes/textMessageBox/textMessageBox.component";
import { Message } from '@interfaces/message.interface';
import { GeminiAiService } from '@services/gemminiai.service';
import { GptMessageOrthographyComponent } from "../../components/chat-bubbles/gptMessageOrthography/gptMessageOrthography.component";


@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    GptMessageOrthographyComponent
],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

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

    this.geminiAiService.checkOrthography( prompt )
      .subscribe((resp) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
            info: resp,
          }
        ]);
      });
  }
}
