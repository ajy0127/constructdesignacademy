'use client';

import Image from 'next/image';

export default function TestPage() {
  const testImages = [
    '/Heritage.png',
    '/Precision.png',
    '/innovation.png',
    '/discreation.png',
    '/images/practice/luxury.png',
    '/images/practice/tech.png',
    '/images/practice/uxui.png'
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Image Loading Test</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testImages.map((src, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <div className="font-mono text-sm mb-2">{src}</div>
            <div className="relative h-32 w-32 mx-auto">
              <Image
                src={src}
                alt={`Test image ${index + 1}`}
                fill
                className="object-contain"
                onError={(e) => {
                  console.error(`[Test] Failed to load: ${src}`, {
                    error: e,
                    currentSrc: (e.target as HTMLImageElement).currentSrc
                  });
                }}
                onLoad={() => {
                  console.log(`[Test] Successfully loaded: ${src}`);
                }}
              />
            </div>
            <div className="mt-2 text-center text-sm">
              {src.includes('/images/') ? 'Alternative Path' : 'Root Path'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
