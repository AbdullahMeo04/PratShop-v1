// src/components/__tests__/SelectorQuantitat.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectorQuantitat from '../SelectorQuantitat';

describe('SelectorQuantitat (Component controlat B9)', () => {
  it('renderitza correctament el valor actual', () => {
    render(<SelectorQuantitat valor={3} maxim={10} onCanvi={() => {}} />);
    expect(screen.getByText('3')).toBeDefined();
  });

  it('deshabilita el botó de reduir quan el valor és igual al mínim per defecte (1)', () => {
    render(<SelectorQuantitat valor={1} maxim={5} onCanvi={() => {}} />);
    const botoReduir = screen.getByRole('button', { name: /reduir quantitat/i });
    expect((botoReduir as HTMLButtonElement).disabled).toBe(true);
  });

  it('deshabilita el botó d augmentar quan el valor assoleix l estoc màxim', () => {
    render(<SelectorQuantitat valor={5} maxim={5} onCanvi={() => {}} />);
    const botoAugmentar = screen.getByRole('button', { name: /augmentar quantitat/i });
    expect((botoAugmentar as HTMLButtonElement).disabled).toBe(true);
  });

  it('permet augmentar i crida onCanvi amb valor + 1', () => {
    const handleCanvi = vi.fn();
    render(<SelectorQuantitat valor={2} maxim={5} onCanvi={handleCanvi} />);
    const botoAugmentar = screen.getByRole('button', { name: /augmentar quantitat/i });

    fireEvent.click(botoAugmentar);
    expect(handleCanvi).toHaveBeenCalledWith(3);
  });

  it('permet reduir i crida onCanvi amb valor - 1', () => {
    const handleCanvi = vi.fn();
    render(<SelectorQuantitat valor={3} maxim={5} onCanvi={handleCanvi} />);
    const botoReduir = screen.getByRole('button', { name: /reduir quantitat/i });

    fireEvent.click(botoReduir);
    expect(handleCanvi).toHaveBeenCalledWith(2);
  });

  it('respecta un mínim personalitzat superior a 1', () => {
    render(<SelectorQuantitat valor={2} minim={2} maxim={10} onCanvi={() => {}} />);
    const botoReduir = screen.getByRole('button', { name: /reduir quantitat/i });
    expect((botoReduir as HTMLButtonElement).disabled).toBe(true);
  });
});
