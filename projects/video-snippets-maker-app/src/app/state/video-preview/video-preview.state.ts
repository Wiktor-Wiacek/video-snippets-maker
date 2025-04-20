import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { VideoPreviewModel } from './video-preview.model';

@State<VideoPreviewModel>({
  name: 'VideoPreview',
  defaults: {
    inPreviewMode: false,
  },
})
@Injectable()
export class VideoPreviewState {}
