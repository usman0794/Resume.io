import { useState, useRef, useEffect, useCallback } from 'react';
import type { SectionConfig } from '@/config/sections.config';

const AUTOSAVE_DELAY = 500;

interface QuestionnaireStateReturn {
  currentSection: SectionConfig | undefined;
  currentSectionIndex: number;
  inputValue: string;
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  progressPercent: number;
  totalSections: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSaved: boolean;
  setInputValue: (value: string) => void;
  goToNextSection: () => void;
  goToPreviousSection: () => void;
  skipSection: () => void;
  goToSection: (index: number) => void;
}

export function useQuestionnaireState(
  sections: SectionConfig[],
  initialFormData: Record<string, unknown>,
  onSave: (fieldId: string, value: string) => void,
): QuestionnaireStateReturn {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentSection = sections[currentSectionIndex];
  const totalSections = sections.length;
  const progressPercent = totalSections > 0
    ? Math.round(((currentSectionIndex + 1) / totalSections) * 100)
    : 0;

  useEffect(() => {
    if (!currentSection) return;
    const fieldId = currentSection.question?.id ?? currentSection.questions?.[0]?.id;
    setInputValue(fieldId ? String(initialFormData?.[fieldId] ?? '') : '');
  }, [currentSectionIndex, currentSection, initialFormData]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentSection]);

  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      const fieldId = currentSection?.question?.id ?? currentSection?.questions?.[0]?.id;
      if (fieldId) onSave(fieldId, inputValue);
    }, AUTOSAVE_DELAY);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [inputValue, currentSection, onSave]);

  const goToNextSection = useCallback(() => {
    setCurrentSectionIndex((prev) => (prev < totalSections - 1 ? prev + 1 : prev));
  }, [totalSections]);

  const goToPreviousSection = useCallback(() => {
    setCurrentSectionIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const skipSection = useCallback(() => goToNextSection(), [goToNextSection]);

  const goToSection = useCallback((index: number) => {
    if (index >= 0 && index < totalSections) setCurrentSectionIndex(index);
  }, [totalSections]);

  const fieldId = currentSection?.question?.id ?? currentSection?.questions?.[0]?.id;
  const isSaved = Boolean(fieldId && initialFormData?.[fieldId] === inputValue && inputValue.trim());

  return {
    currentSection,
    currentSectionIndex,
    inputValue,
    inputRef,
    progressPercent,
    totalSections,
    canGoNext: currentSectionIndex < totalSections - 1,
    canGoPrevious: currentSectionIndex > 0,
    isSaved,
    setInputValue,
    goToNextSection,
    goToPreviousSection,
    skipSection,
    goToSection,
  };
}

export default useQuestionnaireState;
