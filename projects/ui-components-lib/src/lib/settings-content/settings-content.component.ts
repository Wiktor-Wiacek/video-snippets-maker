import { Component, input } from '@angular/core';

interface Setting {
  value: string;
  description: string;
  isSelected?: boolean;
}

const defaultSettings: Setting[] = [
  {
    value: '360p ',
    description: '360p (Low Quality)',
  },
  {
    value: '720p ',
    description: '720p (Medium Quality)',
  },
  {
    value: '1080p ',
    description: '1080p (High Quality)',
  },
];

@Component({
  selector: 'ui-lib-settings-content',
  templateUrl: './settings-content.component.html',
  styleUrl: './settings-content.component.scss',
})
export class SettingsContentComponent {
  settings = input(defaultSettings, {
    transform: (value: Setting[]) => {
      return value.map((setting) => ({
        ...setting,
        isSelected: false,
      }));
    },
  });

  selected: Setting | undefined;

  selectSetting(setting: Setting) {
    this.settings().forEach((s) => {
      s.isSelected = false;
    });

    setting.isSelected = !setting.isSelected;
  }
}
