import React from 'react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import OrganizationsSection from '../components/landing/OrganizationsSection';
import PricingSection from '../components/landing/PricingSection';
import ResultsSection from '../components/landing/ResultsSection';
import FaqSection from '../components/landing/FaqSection';
import ContactSection from '../components/landing/ContactSection';
export default function LandingPage({onNavigate}){
 return <div className="orfiraLanding"><Header onNavigate={onNavigate}/><main id="top"><HeroSection/><AboutSection/><FeaturesSection/><OrganizationsSection/><PricingSection/><ResultsSection/><FaqSection/><ContactSection/></main><Footer/></div>;
}
