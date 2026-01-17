import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Estimator from './Estimator';

describe('Estimator', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    vi.resetAllMocks();
  });

  it('정상 제출 시 성공 메시지 표시', async () => {
    const user = userEvent.setup();

    // Mock successful API response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    );

    render(<Estimator />);

    // Click "견적서 받기" button
    const quoteButton = screen.getByText('견적서 받기');
    await user.click(quoteButton);

    // Fill out the form
    const nameInput = screen.getByPlaceholderText('홍길동');
    const emailInput = screen.getByPlaceholderText('example@email.com');
    const phoneInput = screen.getByPlaceholderText('010-1234-5678');
    const addressInput = screen.getByPlaceholderText('설치 예정 주소를 입력해주세요');

    await user.type(nameInput, '테스터');
    await user.type(emailInput, 'test@example.com');
    await user.type(phoneInput, '010-9999-9999');
    await user.type(addressInput, '서울특별시 강남구');

    // Submit the form
    const submitButton = screen.getByText('견적서 이메일로 받기');
    await user.click(submitButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText('견적서가 발송되었습니다')).toBeInTheDocument();
    });

    expect(screen.getByText(/입력하신 이메일로 견적서를 보내드렸습니다/)).toBeInTheDocument();
  });

  it('API 실패 시 에러 메시지 표시', async () => {
    const user = userEvent.setup();

    // Mock failed API response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      } as Response)
    );

    render(<Estimator />);

    // Click "견적서 받기" button
    const quoteButton = screen.getByText('견적서 받기');
    await user.click(quoteButton);

    // Fill out the form
    const nameInput = screen.getByPlaceholderText('홍길동');
    const emailInput = screen.getByPlaceholderText('example@email.com');
    const phoneInput = screen.getByPlaceholderText('010-1234-5678');
    const addressInput = screen.getByPlaceholderText('설치 예정 주소를 입력해주세요');

    await user.type(nameInput, '테스터');
    await user.type(emailInput, 'test@example.com');
    await user.type(phoneInput, '010-9999-9999');
    await user.type(addressInput, '서울특별시 강남구');

    // Submit the form
    const submitButton = screen.getByText('견적서 이메일로 받기');
    await user.click(submitButton);

    // Wait for error message
    await waitFor(() => {
      expect(
        screen.getByText(/견적 요청 전송 중 오류가 발생했습니다/)
      ).toBeInTheDocument();
    });

    // Check that retry button is present
    expect(screen.getByText('다시 시도')).toBeInTheDocument();
  });
});
