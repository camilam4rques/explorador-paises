import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.html',
  styleUrls: ['./error-message.css']
})
export class ErrorMessageComponent {

  @Input() message: string = 'Ocorreu um erro inesperado.';
  @Input() showRetry: boolean = false;

  @Output() retry = new EventEmitter<void>();

  onRetry() {
    this.retry.emit();
  }
}
