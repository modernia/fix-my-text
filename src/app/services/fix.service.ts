import { Injectable } from '@angular/core';
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FixService {
  private API_KEY = environment.API_KEY;


  constructor() { }


  async fixMyPhrase(phrase: string): Promise<string> {
    const messages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: "You are a helpul assistant that fix the phrase the user give you and between {{}} is the language from that phrase. You can also recive {{auto}} which means that you have to detect the language. You only response the correct phrase not the wrong one and you can use the phrase the user give you to help you fix the phrase."
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: "You has a new phone and you want tell your friend about it {{English}}"
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: "You have a new phone and you want to tell your friend about it"
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: "I am looking for my next carrier opportunity {{English}}"
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: "I am looking for my next career opportunity"
      },
    ]

    const configuration = new Configuration({
      apiKey: this.API_KEY,
    })
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        ...messages,
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: `${phrase} {{English}}`
        }
      ]
    })
    return completion.data.choices[0].message?.content as string;
    
  }
}
