import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-lib-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  type = input<
    | 'play'
    | 'pause'
    | 'start-record'
    | 'stop-record'
    | 'settings'
    | 'x-mark'
    | 'trash'
  >();
  state = input<'' | 'hover' | 'active'>('');
}
