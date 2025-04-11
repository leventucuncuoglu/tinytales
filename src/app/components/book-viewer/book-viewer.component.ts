import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Story } from '../../data/stories';

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
  styles: [`
    .book-viewer {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .book-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    
    .book-pages {
      display: flex;
      gap: 2px;
      background: #f5f5f5;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      border-radius: 10px;
      padding: 20px;
    }
    
    .page {
      width: 400px;
      height: 600px;
      background: white;
      padding: 20px;
      position: relative;
      border-radius: 5px;
    }
    
    .page img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    
    .page .content {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 40px;
    }
    
    .page-number {
      position: absolute;
      bottom: 20px;
      right: 20px;
      font-size: 14px;
      color: #666;
    }
    
    .nav-button {
      width: 50px;
      height: 50px;
      border: none;
      border-radius: 50%;
      background: #6c5ce7;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .nav-button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .nav-button:hover:not(:disabled) {
      background: #5b4cdb;
    }
  `]
})
export class BookViewerComponent implements OnInit, OnDestroy {
  @Input() story!: Story;
  
  currentPage: number = 1;
  maxPage: number = 10;
  leftPage: any;
  rightPage: any;
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
    
    this.leftPage = this.story.pages[leftPageIndex];
    this.rightPage = this.story.pages[rightPageIndex];
    
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
    if (this.rightPage?.audio) {
      this.audioPlayer!.src = this.rightPage.audio;
      this.audioPlayer!.play();
    }
  }
} 