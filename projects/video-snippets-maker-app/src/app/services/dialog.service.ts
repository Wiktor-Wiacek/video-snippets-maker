import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  EventEmitter,
  inject,
  Injectable,
  Type,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

export interface DialogConfig<T = never> {
  data?: T;
}

export interface ConfirmDialogData {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export interface DialogRef<T, R = never> {
  afterClosed: Observable<R | undefined>;
  componentInstance: T;
  close: (result?: R) => void;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private appRef = inject(ApplicationRef);
  private environmentInjector = inject(EnvironmentInjector);

  /**
   * Open a dialog with the given component
   */
  open<T extends object, R = never, D = never>(
    component: Type<T>,
    config?: DialogConfig<D>
  ): DialogRef<T, R> {
    // Create the component
    const componentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
    });

    // Get the component instance
    const componentInstance = componentRef.instance;

    // Pass data to component if provided
    if (config?.data) {
      Object.assign(componentInstance, config.data);
    }

    // Create an observable that will emit when the dialog is closed
    const afterClosed$ = new Subject<R | undefined>();

    // Attach to the Angular component tree
    this.appRef.attachView(componentRef.hostView);

    // Add to DOM
    document.body.appendChild(componentRef.location.nativeElement);

    // Listen for closed event if component has it
    if (
      'closed' in componentInstance &&
      componentInstance['closed'] instanceof EventEmitter
    ) {
      (componentInstance['closed'] as EventEmitter<R>)
        .pipe(take(1))
        .subscribe((result) => {
          this.removeDialog(componentRef);
          afterClosed$.next(result);
          afterClosed$.complete();
        });
    }

    // Method to manually close the dialog
    const close = (result?: R) => {
      this.removeDialog(componentRef);
      afterClosed$.next(result);
      afterClosed$.complete();
    };

    return {
      afterClosed: afterClosed$.asObservable(),
      componentInstance,
      close,
    };
  }

  /**
   * Clean up a dialog when closing
   */
  private removeDialog<T>(componentRef: ComponentRef<T>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
