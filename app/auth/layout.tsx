'use client';

import { Providers } from '../../components/shared/providers';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      {children}
    </Providers>
  );
} 