import { Component, input, output } from '@angular/core';
import { Setting } from '../models/setting';

@Component({
  selector: 'ui-lib-settings-content',
  templateUrl: './settings-content.component.html',
  styleUrl: './settings-content.component.scss',
})
export class SettingsContentComponent {
  settings = input([], {
    transform: (value: Setting[]) => {
      return value.map((setting) => ({
        ...setting,
        isSelected: false,
      }));
    },
  });

  optionSelected = output<Setting | undefined>();

  selected: Setting | undefined;

  selectSetting(setting: Setting) {
    this.settings().forEach((s) => {
      s.isSelected = false;
    });

    setting.isSelected = !setting.isSelected;
    this.optionSelected.emit(setting);
  }
}
