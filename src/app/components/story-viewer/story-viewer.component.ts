import { Component, Input, OnInit } from '@angular/core';
import { Story } from '../../data/stories';

@Component({
  selector: 'app-story-viewer',
  template: `
    <div class="story-container">
      <!-- Üst Başlık Alanı -->
      <div class="header">
        <button class="back-button" routerLink="/stories">
          <i class="fas fa-arrow-left"></i> Geri Dön
        </button>
        <h1>{{story.title}}</h1>
        <span class="free-badge" *ngIf="!story.isPro">Ücretsiz</span>
      </div>

      <!-- Kitap Alanı -->
      <div class="book-container">
        <!-- Sol Ok -->
        <button 
          class="nav-button prev" 
          [disabled]="currentPage <= 1"
          (click)="prevPage()">
          <i class="fas fa-chevron-left"></i>
        </button>

        <!-- Kitap -->
        <div class="book">
          <!-- Sol Sayfa -->
          <div class="page left" [class.empty]="currentPage === 1">
            <div class="page-content" *ngIf="currentPage > 1">
              <div class="page-image">
                <img [src]="getPageImage(currentPage - 1)" [alt]="'Sayfa ' + (currentPage - 1)">
              </div>
              <div class="page-text">
                <p>{{getPageContent(currentPage - 1)}}</p>
              </div>
              <div class="page-number">{{currentPage - 1}}</div>
            </div>
          </div>

          <!-- Sağ Sayfa -->
          <div class="page right">
            <div class="page-content">
              <div class="page-image">
                <img [src]="getPageImage(currentPage)" [alt]="'Sayfa ' + currentPage">
              </div>
              <div class="page-text">
                <p>{{getPageContent(currentPage)}}</p>
              </div>
              <div class="page-number">{{currentPage}}</div>
            </div>
          </div>
        </div>

        <!-- Sağ Ok -->
        <button 
          class="nav-button next" 
          [disabled]="currentPage >= totalPages"
          (click)="nextPage()">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- Gizli Ses Oynatıcı -->
      <audio #audioPlayer (ended)="onAudioEnded()" style="display: none;"></audio>
    </div>
  `,
  styles: [`
    .story-container {
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
      background: #f8f9fa;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 40px;

      h1 {
        flex: 1;
        font-size: 32px;
        color: #2d3436;
        margin: 0;
      }
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border: none;
      background: #6c5ce7;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 16px;

      &:hover {
        background: #5b4cdb;
      }
    }

    .free-badge {
      background: #00b894;
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 14px;
    }

    .book-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      padding: 40px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .book {
      display: flex;
      background: #fff;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 30px;
      gap: 2px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #eee;
      }
    }

    .page {
      width: 400px;
      min-height: 600px;
      padding: 20px;
      position: relative;

      &.empty {
        background: #f5f5f5;
      }

      &.left {
        border-right: 1px solid #eee;
      }
    }

    .page-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .page-image {
      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
    }

    .page-text {
      flex: 1;
      p {
        font-size: 18px;
        line-height: 1.8;
        color: #2d3436;
      }
    }

    .page-number {
      position: absolute;
      bottom: 20px;
      right: 20px;
      font-size: 16px;
      color: #b2bec3;
    }

    .nav-button {
      width: 60px;
      height: 60px;
      border: none;
      border-radius: 50%;
      background: #6c5ce7;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;

      &:disabled {
        background: #dfe6e9;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        background: #5b4cdb;
        transform: scale(1.1);
      }
    }
  `]
})
export class StoryViewerComponent implements OnInit {
  @Input() story!: Story;
  currentPage: number = 1;
  totalPages: number = 10;
  audioPlayer: HTMLAudioElement | null = null;

  ngOnInit() {
    if (this.story?.pages) {
      this.totalPages = this.story.pages.length;
      this.audioPlayer = document.querySelector('audio');
      this.playCurrentPageAudio();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 2;
      this.playCurrentPageAudio();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 2;
      this.playCurrentPageAudio();
    }
  }

  getPageContent(pageNumber: number): string {
    return this.story.pages?.[pageNumber - 1]?.content || '';
  }

  getPageImage(pageNumber: number): string {
    return this.story.pages?.[pageNumber - 1]?.image || '';
  }

  playCurrentPageAudio() {
    if (!this.audioPlayer) return;
    
    const currentPageAudio = this.story.pages?.[this.currentPage - 1]?.audio;
    if (currentPageAudio) {
      this.audioPlayer.src = currentPageAudio;
      this.audioPlayer.play();
    }
  }

  onAudioEnded() {
    const nextPageAudio = this.story.pages?.[this.currentPage]?.audio;
    if (nextPageAudio && this.audioPlayer) {
      this.audioPlayer.src = nextPageAudio;
      this.audioPlayer.play();
    }
  }
} 