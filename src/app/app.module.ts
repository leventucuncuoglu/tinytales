import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoryViewerComponent } from './components/story-viewer/story-viewer.component';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryViewerComponent,
    BookViewerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 