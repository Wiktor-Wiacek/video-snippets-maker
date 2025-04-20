import { Action, State, StateContext } from '@ngxs/store';
import { VideoHistoryModel } from './video-history.model';
import { Injectable } from '@angular/core';
import { SaveVideo } from './video-history.actions';

@State<VideoHistoryModel>({
  name: 'VideoHistory',
  defaults: {
    history: [],
  },
})
@Injectable()
export class VideoHistoryState {
  @Action(SaveVideo)
  saveVideo(ctx: StateContext<VideoHistoryModel>, action: SaveVideo) {
    const state = ctx.getState();
    const { video, thumbnail } = action.payload;
    const history = [
      ...state.history,
      {
        id: Math.random().toString(36).substring(2, 15),
        video,
        thumbnail,
        thumbnailObjectURL: URL.createObjectURL(thumbnail),
        createdAt: new Date(),
      },
    ];
    ctx.setState({
      ...state,
      history,
    });
  }
}
