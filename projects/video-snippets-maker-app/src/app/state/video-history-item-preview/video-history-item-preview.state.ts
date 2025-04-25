import { Action, State, StateContext } from '@ngxs/store';
import { VideoHistoryItemPreviewModel } from './video-history-item-preview.model';
import { GetVideoPreview } from './video-history-item-preview.actions';
import { DatabaseProvider } from '../../abstracts/database.provider';
import { inject } from '@angular/core';

@State<VideoHistoryItemPreviewModel>({
  name: 'VideoHistoryItemPreview',
})
export class VideoHistoryItemPreviewState {
  private readonly db = inject(DatabaseProvider);

  @Action(GetVideoPreview)
  async getVideoPreview(
    ctx: StateContext<VideoHistoryItemPreviewModel>,
    action: GetVideoPreview
  ) {
    try {
      const video = await this.db.getVideo(action.payload.id);

      ctx.setState({
        ...action.payload,
        video: video.video,
      });
    } catch (error) {
      console.error('Error getting video preview from database:', error);
      return;
    }
  }
}
