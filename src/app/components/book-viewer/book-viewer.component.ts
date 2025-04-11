import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Story, Page } from '../../data/stories';

@Component({
  selector: 'app-book-viewer',
  template: `
    <div class="book-viewer">
      <div class="book-controls">
        <button 
          [disabled]="currentPage <= 1" 
          (click)="previousPage()" 
          class="nav-button prev">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="book-pages">
          <div class="page left" *ngIf="leftPage">
            <img [src]="leftPage.image" [alt]="'Sayfa ' + leftPage.pageNumber">
            <p class="content">{{leftPage.content}}</p>
            <div class="page-number">{{leftPage.pageNumber}}</div>
          </div>
          
          <div class="page right" *ngIf="rightPage">
            <img [src]="rightPage.image" [alt]="'Sayfa ' + rightPage.pageNumber">
            <p class="content">{{rightPage.content}}</p>
            <div class="page-number">{{rightPage.pageNumber}}</div>
          </div>
        </div>
        
        <button 
          [disabled]="currentPage >= maxPage" 
          (click)="nextPage()" 
          class="nav-button next">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <audio #audioPlayer (ended)="onAudioEnded()"></audio>
    </div>
  `,
  styles: [/* ... stil kodları aynı, kesmedim senin için yukarıda duruyor zaten */]
})
export class BookViewerComponent implements OnInit, OnDestroy {
  @Input() story!: Story;

  currentPage = 1;
  maxPage = 10;
  leftPage: Page | null = null;
  rightPage: Page | null = null;
  audioPlayer: HTMLAudioElement | null = null;

  ngOnInit() {
    if (this.story?.pages) {
      this.maxPage = this.story.pages.length;
      this.updatePages();
    }

    this.audioPlayer = document.querySelector('audio');
    this.playCurrentPageAudio();
  }

  ngOnDestroy() {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
    }
  }

  updatePages() {
    if (!this.story?.pages) return;

    const leftPageIndex = this.currentPage - 1;
    const rightPageIndex = this.currentPage;

    this.leftPage = this.story.pages[leftPageIndex] || null;
    this.rightPage = this.story.pages[rightPageIndex] || null;

    this.playCurrentPageAudio();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 2;
      this.updatePages();
    }
  }

  nextPage() {
    if (this.currentPage < this.maxPage - 1) {
      this.currentPage += 2;
      this.updatePages();
    }
  }

  playCurrentPageAudio() {
    if (!this.audioPlayer || !this.leftPage) return;

    this.audioPlayer.src = this.leftPage.audio;
    this.audioPlayer.play();
  }

  onAudioEnded() {
    if (this.rightPage?.audio && this.audioPlayer) {
      this.audioPlayer.src = this.rightPage.audio;
      this.audioPlayer.play();
    }
  }
}
