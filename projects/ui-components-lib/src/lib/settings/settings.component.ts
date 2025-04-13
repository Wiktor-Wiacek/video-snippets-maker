import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ElementRef, inject } from '@angular/core';
import { SettingsContentComponent } from '../settings-content/settings-content.component';

@Component({
  selector: 'ui-lib-settings',
  imports: [OverlayModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
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

    overlayRef.attach(new ComponentPortal(SettingsContentComponent));
  }
}
