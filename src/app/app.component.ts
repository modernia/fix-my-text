import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
import { FixService } from './services/fix.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'translate-ai';
  phrase!: string;
  fixedPhrase!:string | undefined;
  isTooShort:boolean = false;
  loading:boolean  = false;
  fixService: FixService = inject(FixService);

  dummy:string = "asdsadasasddsasaddsa asdasdds23e1 kjh";

  

  onPhraseChange(e: any) {
    this.phrase = e.target.value;
  }

  async onSubmit() {
    if(this.phrase === undefined || this.phrase.length === 0) {
      return
    }
    if(this.phrase.length < 10) {
      this.isTooShort = true;
      return
    }
    this.loading = true;
    this.fixedPhrase = await this.fixService.fixMyPhrase(this.phrase) as string;
    console.log(this.fixedPhrase)
    this.loading = false;
  }
}
