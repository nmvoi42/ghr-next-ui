import { ImageResponse } from 'next/og';
 
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';
 
// Creates a simple icon for the site
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 14,
        }}
      >
        GH
      </div>
    ),
    { ...size, }
  );
}