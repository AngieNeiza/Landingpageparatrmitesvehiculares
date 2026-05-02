import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class FormularioErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Formulario Error:', error, errorInfo);
  }

  render() {
    // Siempre renderizar los children sin mostrar mensajes de error
    // Solo loguear en consola para debugging
    return this.props.children;
  }
}

// Versión con React 18 usando hooks (alternativa moderna)
export function FormErrorBoundaryHook({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
