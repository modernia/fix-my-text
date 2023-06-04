import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typing-effect',
  templateUrl: './typing-effect.component.html',
  styleUrls: ['./typing-effect.component.css']
})
export class TypingEffectComponent {
  @Input() text!:string | undefined;
  showCursor:boolean = true
  i: number = 0
  displayText: string = ''
  ngOnChanges() {
    this.typingEffect()
  }
  
  typingEffect = () => {
    if(this.text === undefined) return
    if (this.i < this.text.length) {
      this.displayText += this.text.charAt(this.i);
      this.i++;
      setTimeout(this.typingEffect, 50);
    } else 
      this.showCursor = false;
  }
}
