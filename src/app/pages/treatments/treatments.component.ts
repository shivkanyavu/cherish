import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements AfterViewInit {
// BEFORE & AFTER SECTION 
onMove(event: any) {
  const container = event.currentTarget;
  const overlay = container.querySelector('.ba-overlay');
  const divider = container.querySelector('.ba-divider');

  const rect = container.getBoundingClientRect();
  let x = event.clientX - rect.left;

  if (event.touches) {
    x = event.touches[0].clientX - rect.left;
  }

  const percent = (x / rect.width) * 100;

  overlay.style.width = percent + "%";
  divider.style.left = percent + "%";
}

/* ============================= */
  /* HERO STYLE SLIDER */
  /* ============================= */

  currentSlide = 0;
  slideInterval: any;
  slideDuration = 4000; // 4 seconds

  ngAfterViewInit(): void {
    this.showSlide(this.currentSlide);
    this.startAutoSlide();
  }

  startAutoSlide() {
    // ✅ Important: clear existing interval first
    this.stopAutoSlide();

    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideDuration);
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  showSlide(index: number) {
    const slides = document.querySelectorAll('.slide');

    slides.forEach(slide => slide.classList.remove('active'));

    if (slides.length > 0) {
      slides[index].classList.add('active');
    }
  }

  nextSlide() {
    const slides = document.querySelectorAll('.slide');

    if (slides.length === 0) return;

    this.currentSlide = (this.currentSlide + 1) % slides.length;
    this.showSlide(this.currentSlide);
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
  }
  
  prevSlide() {
  this.currentIndex =
    (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
}

  ngOnDestroy(): void {
    this.stopAutoSlide(); // ✅ Prevent memory leak
  }
// responsive slider
currentIndex = 0;
totalSlides = 4;

touchStartX = 0;
touchEndX = 0;
onTouchStart(event: TouchEvent) {
  this.touchStartX = event.changedTouches[0].screenX;
}

onTouchEnd(event: TouchEvent) {
  this.touchEndX = event.changedTouches[0].screenX;
  this.handleSwipe();
}

handleSwipe() {
  const swipeDistance = this.touchStartX - this.touchEndX;

  if (swipeDistance > 50) {
    this.nextSlide();
  } else if (swipeDistance < -50) {
    this.prevSlide();
  }
}
}
