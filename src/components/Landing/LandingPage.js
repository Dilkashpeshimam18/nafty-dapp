import { useState, useEffect } from 'react';
import {
  Sparkles,
  Shield,
  Coins,
  Users,
  Lock,
  Cpu,
  ArrowRight,
  Menu,
  X,
  Github,
  Twitter,
  MessageCircle,
  Bot,
  Wallet,
  Image as ImageIcon,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { useStateContext } from '../../context/index';
import naftyAppImage from '../../assets/nafty.png';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { connectWallet } = useStateContext();

  const features = [
    {
      icon: <Bot className="w-7 h-7" />,
      title: 'AI-Powered Content',
      description:
        'Generate engaging posts with Gemini AI. Create viral content in seconds with advanced machine learning.',
    },
    {
      icon: <ImageIcon className="w-7 h-7" />,
      title: 'NFT Marketplace',
      description: 'Every post is a unique NFT. Own, trade, and monetize your digital content on the blockchain.',
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Blockchain Security',
      description: 'Built on Ethereum. Your data is immutable, secure, and truly yours. Decentralized by design.',
    },
    {
      icon: <Coins className="w-7 h-7" />,
      title: 'Monetize Content',
      description: 'Earn from your creativity. Sell your NFT posts to your fans and build a sustainable income.',
    },
    {
      icon: <Wallet className="w-7 h-7" />,
      title: 'Web3 Native',
      description: 'Connect with MetaMask. No emails, no passwords, no centralized control. Pure Web3.',
    },
    {
      icon: <Lock className="w-7 h-7" />,
      title: 'Smart Contracts',
      description: 'Transparent, automated, and trustless. All interactions powered by audited smart contracts.',
    },
  ];

  const benefits = [
    'Own your content forever',
    'Monetize every post',
    'AI-powered creation',
    'No middlemen fees',
    'Complete privacy',
    'Global marketplace',
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Space_Grotesk',sans-serif] overflow-hidden">
      {/* Large gradient circle background */}
      <div className="fixed top-[-10%] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#6645eb]/30 via-[#d445eb]/20 to-transparent blur-[100px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-[1260px] mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#6645eb] to-[#d445eb] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span style={{fontFamily:'monospace'}} className="text-[22px] font-medium tracking-[-0.02em]">NAFTY</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-10">
              <a href="#features" className="text-[15px] text-white/70 hover:text-white transition">
                Features
              </a>
              <a href="#benefits" className="text-[15px] text-white/70 hover:text-white transition">
                Benefits
              </a>
              <a href="#how-it-works" className="text-[15px] text-white/70 hover:text-white transition">
                How it Works
              </a>
              <a href="#about" className="text-[15px] text-white/70 hover:text-white transition">
                About
              </a>
              <button
                onClick={connectWallet}
                className="px-6 py-2.5 bg-gradient-to-r from-[#6645eb] to-[#d445eb] rounded-[10px] text-[15px] font-medium hover:opacity-90 transition"
              >
                Connect Wallet
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/5 bg-[#020817]/95 backdrop-blur-xl">
            <div className="px-6 py-6 space-y-4">
              <a href="#features" className="block text-white/70 hover:text-white transition">
                Features
              </a>
              <a href="#benefits" className="block text-white/70 hover:text-white transition">
                Benefits
              </a>
              <a href="#how-it-works" className="block text-white/70 hover:text-white transition">
                How it Works
              </a>
              <a href="#about" className="block text-white/70 hover:text-white transition">
                About
              </a>
              <button
                onClick={connectWallet}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#6645eb] to-[#d445eb] rounded-[10px] font-medium"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Icons */}
          <div className="absolute top-20 left-10 animate-float-slow">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6645eb]/20 to-transparent rounded-[12px] flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Bot className="w-8 h-8 text-[#6645eb]" />
            </div>
          </div>
          <div className="absolute top-40 right-20 animate-float-delayed">
            <div className="w-12 h-12 bg-gradient-to-br from-[#d445eb]/20 to-transparent rounded-[10px] flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Coins className="w-6 h-6 text-[#d445eb]" />
            </div>
          </div>
          <div className="absolute bottom-40 left-20 animate-float">
            <div className="w-14 h-14 bg-gradient-to-br from-[#6645eb]/20 to-transparent rounded-[11px] flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Shield className="w-7 h-7 text-[#6645eb]" />
            </div>
          </div>
          <div className="absolute top-60 right-10 animate-float-slow">
            <div className="w-10 h-10 bg-gradient-to-br from-[#d445eb]/20 to-transparent rounded-[8px] flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Sparkles className="w-5 h-5 text-[#d445eb]" />
            </div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-32 left-1/4 w-64 h-64 bg-[#6645eb]/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#d445eb]/10 rounded-full blur-3xl animate-pulse-slower"></div>

          {/* Small Particles */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#6645eb] rounded-full animate-ping-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#d445eb] rounded-full animate-ping-slower"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-[#6645eb] rounded-full animate-ping-slow"></div>

          {/* Sparkle Particles */}
          <div className="absolute top-[30%] right-[25%] animate-twinkle-1">
            <Sparkles className="w-4 h-4 text-[#6645eb]" />
          </div>
          <div className="absolute top-[55%] left-[20%] animate-twinkle-2">
            <Sparkles className="w-3 h-3 text-[#6645eb]" />
          </div>
          <div className="absolute bottom-[25%] right-[30%] animate-twinkle-3">
            <Sparkles className="w-5 h-5 text-[#6645eb]" />
          </div>
          <div className="absolute top-[40%] left-[35%] animate-twinkle-1">
            <Sparkles className="w-3 h-3 text-[#6645eb]" />
          </div>
          <div className="absolute bottom-[40%] left-[45%] animate-twinkle-2">
            <Sparkles className="w-4 h-4 text-[#6645eb]" />
          </div>
          <div className="absolute top-[70%] right-[25%] animate-twinkle-3">
            <Sparkles className="w-3 h-3 text-[#6645eb]" />
          </div>
        </div>

        <div className="max-w-[1260px] mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-[#6645eb] animate-pulse"></div>
            <span className="text-[13px] uppercase tracking-wider text-white/80">BLOCKCHAIN + AI SOCIAL MEDIA</span>
          </div>

          {/* Heading */}
          <h1 className="text-[37px] sm:text-[50px] lg:text-[60px] font-medium tracking-[-0.02em] leading-[1.1] mb-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-100">
            THE FUTURE OF SOCIAL MEDIA IS HERE 
          </h1>

          <p className="text-[17px] lg:text-[19px] text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Own your content. Create with AI. Trade as NFTs. Welcome to Nafty - where blockchain meets creativity and
            every post has value.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-300">
            <button
              onClick={connectWallet}
              className="px-8 py-4 bg-gradient-to-r from-[#6645eb] to-[#d445eb] rounded-[10px] text-[16px] font-medium hover:opacity-90 transition"
            >
              Connect Wallet
            </button>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-[10px] text-[16px] font-medium hover:bg-white/10 transition"
            >
              Learn More
            </a>
          </div>

          {/* Hero Image/Mockup */}
          <div className="relative max-w-5xl mx-auto animate-fade-in-up animation-delay-400">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#6645eb]/20 via-[#d445eb]/20 to-[#6645eb]/20 blur-3xl animate-pulse-slow"></div>

            {/* Floating mini icons around the image */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#6645eb] to-[#d445eb] rounded-[10px] flex items-center justify-center animate-bounce-slow shadow-lg shadow-[#6645eb]/50">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-br from-[#d445eb] to-[#6645eb] rounded-[12px] flex items-center justify-center animate-bounce-delayed shadow-lg shadow-[#d445eb]/50">
              <ImageIcon className="w-7 h-7" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-[#6645eb] to-[#d445eb] rounded-[10px] flex items-center justify-center animate-bounce-slow shadow-lg shadow-[#6645eb]/50">
              <Users className="w-6 h-6" />
            </div>

            {/* Main container */}
            <div className="relative bg-white/5 border border-white/10 rounded-[15px] p-2 backdrop-blur-sm hover:border-white/20 transition-all duration-500">
              <div className="bg-gradient-to-br from-[#0d0725] to-[#020817] rounded-[12px] overflow-hidden">
                {/* App Screenshot */}
                <img
                  src={naftyAppImage}
                  alt="Nafty App Interface"
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-6 border-t border-white/5">
        <div className="max-w-[1260px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '50K+', label: 'NFT Posts Created' },
              { value: '100K+', label: 'Transactions' },
              { value: '$2M+', label: 'Total Volume' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-[42px] lg:text-[50px] font-medium tracking-[-0.02em] bg-gradient-to-r from-[#6645eb] to-[#d445eb] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-[14px] text-white/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-[1260px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <span className="text-[13px] uppercase tracking-wider text-white/80">FEATURES</span>
            </div>
            <h2 className="text-[37px] sm:text-[50px] font-medium tracking-[-0.02em] leading-[1.1] mb-6">
              WHY CHOOSE NAFTY
            </h2>
            <p className="text-[17px] text-white/60 max-w-2xl mx-auto">
              Powerful features that combine the best of AI and blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white/5 border border-white/10 rounded-[15px] p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#6645eb]/20 to-[#d445eb]/20 rounded-[10px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-[20px] font-medium mb-3 tracking-[-0.01em]">{feature.title}</h3>
                <p className="text-[15px] text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-[1260px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-[13px] uppercase tracking-wider text-white/80">BENEFITS</span>
              </div>
              <h2 className="text-[37px] sm:text-[50px] font-medium tracking-[-0.02em] leading-[1.1] mb-6">
                REVOLUTIONIZE YOUR SOCIAL EXPERIENCE
              </h2>
              <p className="text-[17px] text-white/60 leading-relaxed mb-8">
                Join the next generation of social media where you control your data, own your content, and earn from
                your creativity.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#6645eb] flex-shrink-0" />
                    <span className="text-[15px] text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={connectWallet}
                className="px-8 py-4 bg-gradient-to-r from-[#6645eb] to-[#d445eb] rounded-[10px] text-[16px] font-medium hover:opacity-90 transition"
              >
                Start Creating Now
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6645eb]/20 to-[#d445eb]/20 blur-3xl"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-[15px] p-2 backdrop-blur-sm">
                <div className="bg-gradient-to-br from-[#0d0725] to-[#020817] rounded-[12px] p-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-[10px]">
                      <Star className="w-8 h-8 text-[#d445eb]" />
                      <div className="flex-1">
                        <div className="h-3 bg-white/20 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-[10px]">
                      <Star className="w-8 h-8 text-[#d445eb]" />
                      <div className="flex-1">
                        <div className="h-3 bg-white/20 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-[10px]">
                      <Star className="w-8 h-8 text-[#d445eb]" />
                      <div className="flex-1">
                        <div className="h-3 bg-white/20 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                       <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-[10px]">
                      <Star className="w-8 h-8 text-[#d445eb]" />
                      <div className="flex-1">
                        <div className="h-3 bg-white/20 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                       <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-[10px]">
                      <Star className="w-8 h-8 text-[#d445eb]" />
                      <div className="flex-1">
                        <div className="h-3 bg-white/20 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-[1260px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <span className="text-[13px] uppercase tracking-wider text-white/80">HOW IT WORKS</span>
            </div>
            <h2 className="text-[37px] sm:text-[50px] font-medium tracking-[-0.02em] leading-[1.1] mb-6">
              GET STARTED IN 3 SIMPLE STEPS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Connect Wallet',
                description: 'Link your MetaMask wallet in one click. No signup, no email required.',
              },
              {
                number: '02',
                title: 'Create Content',
                description: 'Use AI to generate posts or write your own. Upload images and customize.',
              },
              {
                number: '03',
                title: 'Mint & Earn',
                description: 'Post as NFT, engage with community, and earn from your creativity.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-[15px] p-8 hover:bg-white/10 transition"
              >
                <div className="text-[50px] font-medium text-white/20 mb-4 tracking-[-0.02em]">{step.number}</div>
                <h3 className="text-[22px] font-medium mb-3 tracking-[-0.01em]">{step.title}</h3>
                <p className="text-[15px] text-white/60 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="text-[13px] uppercase tracking-wider text-white/80">ABOUT NAFTY</span>
          </div>
          <h2 className="text-[37px] sm:text-[50px] font-medium tracking-[-0.02em] leading-[1.1] mb-6">
            THE NEXT GENERATION OF SOCIAL MEDIA
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-6">
            Nafty is a revolutionary Web3 social media platform that combines the power of blockchain technology with
            cutting-edge AI. We believe content creators should truly own their work and be fairly rewarded for their
            creativity.
          </p>
          <p className="text-[17px] text-white/60 leading-relaxed">
            Built on Ethereum and powered by Gemini AI, Nafty transforms every post into a tradeable NFT, giving you
            complete control over your digital identity and content monetization.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-[37px] sm:text-[50px] font-medium tracking-[-0.02em] leading-[1.1] mb-6">
            READY TO JOIN THE REVOLUTION?
          </h2>
          <p className="text-[17px] text-white/60 mb-10">
            Start creating, sharing, and earning on the blockchain today.
          </p>
          <button
            onClick={connectWallet}
            className="px-10 py-4 bg-gradient-to-r from-[#6645eb] to-[#d445eb] rounded-[10px] text-[16px] font-medium hover:opacity-90 transition inline-flex items-center space-x-2"
          >
            <span>Launch Nafty Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-12 px-6">
        <div className="max-w-[1260px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#6645eb] to-[#d445eb] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[22px] font-medium tracking-[-0.02em]">Nafty</span>
              </div>
              <p className="text-[15px] text-white/50 mb-6 max-w-sm">
                The future of social media. Own your content, create with AI, and trade as NFTs.
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-[8px] flex items-center justify-center hover:bg-white/10 transition"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-[8px] flex items-center justify-center hover:bg-white/10 transition"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-[8px] flex items-center justify-center hover:bg-white/10 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[15px] font-medium mb-4 uppercase tracking-wider">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-[15px] text-white/50 hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-[15px] text-white/50 hover:text-white transition">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-[15px] text-white/50 hover:text-white transition">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[15px] font-medium mb-4 uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-[15px] text-white/50 hover:text-white transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[15px] text-white/50 hover:text-white transition">
                    Smart Contracts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[15px] text-white/50 hover:text-white transition">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-[14px] text-white/40">
              &copy; 2025 Nafty. All rights reserved. Built with blockchain and AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
