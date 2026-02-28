import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  texts: string[] = [
    "Reveal Your True Glow – Inside and Out",
    "Confidence Begins With Healthy Skin",
    "Advanced Dermatology and Personalized Care."
  ];

  displayText: string = '';
  textIndex: number = 0;
  charIndex: number = 0;
  isDeleting: boolean = false;

  typingSpeed: number = 80;
  deletingSpeed: number = 40;
  delayAfterTyping: number = 1500;
  router: any;

  ngOnInit(): void {
    this.typeLoop();
  }

  typeLoop() {
    const currentText = this.texts[this.textIndex];

    if (!this.isDeleting) {
      this.displayText = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;

      if (this.charIndex === currentText.length) {
        setTimeout(() => this.isDeleting = true, this.delayAfterTyping);
      }
    } else {
      this.displayText = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.textIndex = (this.textIndex + 1) % this.texts.length;
      }
    }

    setTimeout(() => this.typeLoop(),
      this.isDeleting ? this.deletingSpeed : this.typingSpeed
    );
  }
  
  // routing for contact btn
  goToContact() {
  this.router.navigate(['/contact']);
}
}
