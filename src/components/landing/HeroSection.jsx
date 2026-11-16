import React from 'react';
import { ArrowRight } from 'lucide-react';
import {HeroTwinRings} from '../three/HeroJewelryRing';

/** Первый экран: композиция по референсу Дарьи; оба кольца — настоящие GLB. */
export default function HeroSection() {
  return <section className="hero heroRef orfiraHero116" id="top">
    <div className="heroRefInner wrap">
      <div className="heroCopy">
        <h1>Современная <strong>3D-платформа</strong><br/>для обучения ювелирному делу</h1>
        <p>Помогайте ученикам и студентам лучше понимать устройство и технологии создания ювелирных изделий — даже обучаясь онлайн, они разбирают конструкцию и выполняют задания на 3D-модели.</p>
        <div className="heroActions"><a href="#contact" className="btn dark">Получить консультацию <ArrowRight size={18}/></a></div>
        <p className="heroMicro">Условия подключения для вашей организации</p>
      </div>
      <HeroTwinRings/>
    </div>
  </section>;
}
