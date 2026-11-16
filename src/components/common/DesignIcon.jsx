import React from 'react';
/** Оригинальные SVG дизайнера. Название файла — в public/design/icons. */
export default function DesignIcon({file,size=20,alt='',className=''}){
  return <img className={className} src={`/design/icons/${encodeURIComponent(file)}`} width={size} height={size} alt={alt} aria-hidden={alt?'false':'true'}/>;
}
