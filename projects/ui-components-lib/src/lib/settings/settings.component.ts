import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  inject,
  input,
  InputSignalWithTransform,
  output,
} from '@angular/core';
import { SettingsContentComponent } from '../settings-content/settings-content.component';
import { Setting } from '../models/setting';

const defaultSettings: Setting[] = [
  {
    value: '360p',
    description: '360p (Low Quality)',
  },
  {
    value: '720p',
    description: '720p (Medium Quality)',
  },
  {
    value: '1080p',
    description: '1080p (High Quality)',
  },
];
@Component({
  selector: 'ui-lib-settings',
  imports: [OverlayModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  settings = input(defaultSettings);
  optionSelected = output<Setting | undefined>();

  private readonly overlay = inject(Overlay);

  openTooltip(origin: HTMLElement) {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions([
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: 8,
        },
      ]);

    const overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
    });

    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());

    const portal = new ComponentPortal(SettingsContentComponent);
    const componentRef = overlayRef.attach(portal);
    if (componentRef.instance) {
      componentRef.instance.settings = this
        .settings as unknown as InputSignalWithTransform<
        {
          isSelected: boolean;
          value: string;
          description: string;
        }[],
        Setting[]
      >;

      componentRef.instance.optionSelected.subscribe(
        (selectedOption: Setting | undefined) => {
          this.optionSelected.emit(selectedOption);
        }
      );
    }
  }
}
