import { Routes } from '@angular/router';
import { VideoSnippetMakerComponent } from './components/video-snippet-maker/video-snippet-maker.component';

export const routes: Routes = [
  {
    path: '',
    component: VideoSnippetMakerComponent,
  },
  {
    path: 'ui-preview',
    loadComponent: () =>
      import('./components/ui-preview/ui-preview.component').then(
        (m) => m.UiPreviewComponent
      ),
  },
];
