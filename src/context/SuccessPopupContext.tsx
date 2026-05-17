import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import SuccessPopup from '../components/SuccessPopup';

export interface ShowSuccessOptions {
  title: string;
  message: string;
  onClose?: () => void;
}

interface SuccessPopupContextValue {
  showSuccess: (options: ShowSuccessOptions) => void;
}

const SuccessPopupContext = createContext<SuccessPopupContextValue | null>(null);

interface SuccessPopupProviderProps {
  children: ReactNode;
}

export function SuccessPopupProvider({ children }: SuccessPopupProviderProps) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ShowSuccessOptions>({
    title: '',
    message: '',
  });
  const onCloseRef = React.useRef<(() => void) | undefined>(undefined);

  const showSuccess = useCallback((options: ShowSuccessOptions) => {
    setContent({ title: options.title, message: options.message });
    onCloseRef.current = options.onClose;
    setVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    const callback = onCloseRef.current;
    onCloseRef.current = undefined;
    callback?.();
  }, []);

  const value = useMemo(() => ({ showSuccess }), [showSuccess]);

  return (
    <SuccessPopupContext.Provider value={value}>
      {children}
      <SuccessPopup
        visible={visible}
        title={content.title}
        message={content.message}
        onClose={handleClose}
      />
    </SuccessPopupContext.Provider>
  );
}

export function useSuccessPopup(): SuccessPopupContextValue {
  const ctx = useContext(SuccessPopupContext);
  if (!ctx) {
    throw new Error('useSuccessPopup must be used within SuccessPopupProvider');
  }
  return ctx;
}
