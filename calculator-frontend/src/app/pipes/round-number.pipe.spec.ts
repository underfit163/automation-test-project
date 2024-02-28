import { RoundNumberPipe } from './round-number.pipe';
import {TestBed} from "@angular/core/testing";

describe('RoundNumberPipe', () => {
  let pipe: RoundNumberPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundNumberPipe],
    });
    pipe = TestBed.inject(RoundNumberPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should round a number with default digits', () => {
    const result = pipe.transform('5.6789');
    expect(result).toEqual(5.68);
  });

  it('should round a number with specified digits', () => {
    const result = pipe.transform('5.6789', 1);
    expect(result).toEqual(5.7);
  });

  it('should handle string input', () => {
    const result = pipe.transform('5.6789', 2);
    expect(result).toEqual(5.68);
  });

  it('should handle invalid input', () => {
    const result = pipe.transform('invalid', 2);
    expect(result).toEqual('invalid');
  });

  it('should handle negative digits', () => {
    const result = pipe.transform('5.6789', -2);
    expect(result).toEqual(0);
  });
});
