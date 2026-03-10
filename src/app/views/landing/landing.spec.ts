import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Landing } from './landing';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeAll(() => {
    class IntersectionObserverMock {
      observe(): void {
        void 0;
      }

      unobserve(): void {
        void 0;
      }

      disconnect(): void {
        void 0;
      }
    }

    (globalThis as Record<string, unknown>)['IntersectionObserver'] = IntersectionObserverMock;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
