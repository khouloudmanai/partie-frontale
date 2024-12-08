import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GenerativeAiComponent } from './generative-ai.component';

describe('GenerativeAiComponent', () => {
  let component: GenerativeAiComponent;
  let fixture: ComponentFixture<GenerativeAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerativeAiComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerativeAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Better Solutions For Your Business');
  });

  it('should have a button with text "Start For Free"', () => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent).toContain('Start For Free');
  });
});

