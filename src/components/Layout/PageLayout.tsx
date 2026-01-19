import React from 'react';
import { Container } from './Container';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen py-8 ${className}`}>
      <Container maxWidth="2xl">
        {children}
      </Container>
    </div>
  );
};