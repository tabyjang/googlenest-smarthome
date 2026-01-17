import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// 에러를 발생시키는 테스트 컴포넌트
const ThrowError = () => {
  throw new Error('Test error');
};

// 정상 작동하는 테스트 컴포넌트
const NormalComponent = () => {
  return <div>정상 작동</div>;
};

// 폴백 UI
const FallbackUI = () => {
  return <div>에러가 발생했습니다</div>;
};

describe('ErrorBoundary', () => {
  // console.error를 mock하여 테스트 중 에러 로그 방지
  const originalError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('에러가 발생하지 않으면 children을 정상적으로 렌더링한다', () => {
    render(
      <ErrorBoundary fallback={<FallbackUI />}>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('정상 작동')).toBeInTheDocument();
    expect(screen.queryByText('에러가 발생했습니다')).not.toBeInTheDocument();
  });

  it('에러가 발생하면 fallback UI를 렌더링한다', () => {
    render(
      <ErrorBoundary fallback={<FallbackUI />}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('에러가 발생했습니다')).toBeInTheDocument();
    expect(screen.queryByText('정상 작동')).not.toBeInTheDocument();
  });
});
