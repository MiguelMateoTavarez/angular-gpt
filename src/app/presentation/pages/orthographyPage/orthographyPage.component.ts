import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent } from '@components/index';
import { TypingLoaderComponent } from "@components/typingLoader/typingLoader.component";
import { TextMessageBoxComponent } from "@components/text-boxes/textMessageBox/textMessageBox.component";
import { TextMessageBoxFileComponent, TextMessageEvent } from "@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component";


@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent
],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  handleMessage(prompt: string) {
    console.log(prompt);
  }

  handleMessageWithFile({prompt, file}: TextMessageEvent) {
    console.log(prompt, file);
  }
}
