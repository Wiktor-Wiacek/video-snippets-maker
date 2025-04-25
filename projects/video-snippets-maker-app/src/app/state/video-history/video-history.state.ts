import { Action, State, StateContext } from '@ngxs/store';
import { VideoHistoryModel } from './video-history.model';
import { inject, Injectable } from '@angular/core';
import { GetVideoHistory, SaveVideo } from './video-history.actions';
import { DatabaseProvider } from '../../abstracts/database.provider';

@State<VideoHistoryModel>({
  name: 'VideoHistory',
  defaults: {
    history: [],
  },
})
@Injectable()
export class VideoHistoryState {
  private readonly db = inject(DatabaseProvider);

  @Action(SaveVideo)
  async saveVideo(ctx: StateContext<VideoHistoryModel>, action: SaveVideo) {
    const state = ctx.getState();
    const { id, duration, createdAt, thumbnail, video } = action.payload;
    try {
      await Promise.all([
        this.db.addVideoThumbnail({
          id,
          thumbnail,
        }),
        this.db.addVideo({
          id,
          video: video,
        }),
      ]);

      const history = [
        ...state.history,
        {
          id,
          duration,
          createdAt,
          thumbnail,
        },
      ];

      ctx.setState({
        ...state,
        history,
      });
    } catch (error) {
      console.error('Error saving video to database:', error);
      return;
    }
  }

  @Action(GetVideoHistory)
  async getVideoHistory(ctx: StateContext<VideoHistoryModel>) {
    try {
      const thumbnails = await this.db.getVideoHistory();
      const thumbnailMap = thumbnails.reduce((map, item) => {
        map[item.id] = item;
        return map;
      }, {} as Record<string, { id: string; thumbnail: Blob }>);

      const state = ctx.getState().history.map((video) => ({
        ...video,
        thumbnail: thumbnailMap[video.id]?.thumbnail,
      }));

      ctx.setState({
        ...ctx.getState(),
        history: state,
      });
    } catch (error) {
      console.error('Error getting video history from database:', error);
      return;
    }
  }
}
