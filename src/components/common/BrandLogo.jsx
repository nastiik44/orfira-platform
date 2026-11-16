import React from 'react';
/** Общий логотип Orfira. Изображение меняется в public/design/logo.png. */
export default function BrandLogo({href='#top',onClick,className=''}){
  return <a href={href} onClick={onClick} className={`logo landingLogo ${className}`} aria-label="Orfira — наверх"><img src="/design/logo.png" alt="Orfira"/></a>;
}
