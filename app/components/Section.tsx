'use client';

import { useState } from 'react';

export default function Section({ title, children, isOpen, onToggle }: { title: string; children: React.ReactNode; isOpen: boolean; onToggle: (title: string) => void }) {
  return (
    <div className="mb-4">
      <button
        onClick={() => onToggle(title)}
        className="w-full text-left p-2 bg-gray-300 hover:bg-gray-400 rounded-t"
      >
        {title} {isOpen ? '▼' : '▶'}
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
        style={{ transitionProperty: 'max-height' }}
      >
        <div className="p-2 bg-white">{children}</div>
      </div>
    </div>
  );
}