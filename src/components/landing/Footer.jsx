import BrandLogo from '../common/BrandLogo';
import React from 'react';
import {nav} from '../../config/site';
export default function Footer(){return (<footer className="footer"><div className="wrap footerInner"><BrandLogo/><nav>{nav.map(([t,h])=><a key={h} href={h}>{t}</a>)}</nav><small>Учебный прототип · 2026</small></div></footer>);}
