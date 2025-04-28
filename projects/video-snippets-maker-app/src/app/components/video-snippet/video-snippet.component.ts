import { Component, input, output } from '@angular/core';
import { VideoSnippet } from '../../models/video-snippet';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ButtonComponent } from 'ui-components-lib';

@Component({
  selector: 'app-video-snippet',
  imports: [DatePipe, DecimalPipe, ButtonComponent],
  templateUrl: './video-snippet.component.html',
  styleUrl: './video-snippet.component.scss',
})
export class VideoSnippetComponent {
  video = input<VideoSnippet>();
  open = output<void>();
  remove = output<void>();

  trashIconVisible = false;

  openVideo(): void {}
  removeVideo(): void {}
  showTrashIcon(): void {
    this.trashIconVisible = true;
  }
  hideTrashIcon(): void {
    this.trashIconVisible = false;
  }
}
