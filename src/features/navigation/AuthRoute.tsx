'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, CheckCircle2 } from 'lucide-react';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { useAuth } from '@/features/auth/AuthContext';
import logo from '@/shared/assets/logo';
import type { AuthPage } from '@/features/navigation/paths';
import { useNexoraLifeTheme } from '@/features/navigation/useNexoraLifeTheme';
import personnelImage from '@/shared/assets/personnel.png';
import bottleImage from '@/shared/assets/bottle.png';
import Image from 'next/image';
import { p } from 'motion/react-client';


const BACKGROUND_IMAGES = [bottleImage, personnelImage];

export function AuthRoute({ page }: { page: AuthPage }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { isDark, setIsDark } = useNexoraLifeTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-emerald-50 dark:bg-emerald-950 transition-colors duration-500">
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-emerald-900 shadow-xl border border-emerald-100 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 hover:scale-110 transition-transform z-50"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl h-auto md:h-[700px] flex flex-col md:flex-row rounded-[24px] overflow-hidden shadow-2xl border border-white/10 dark:border-white/5 bg-white dark:bg-emerald-950"
      >
        <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden group">
          <AnimatePresence mode="wait">
            <Image
              key={`${page}-${currentImageIndex}`}
              src={BACKGROUND_IMAGES[currentImageIndex]}
              alt="NexoraLife Global wellness"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          <div
            className={`absolute inset-0 transition-all duration-700 ${
              page === 'signup'
                ? 'bg-amber-400/90 mix-blend-multiply'
                : 'bg-linear-to-t from-black/95 via-black/40 to-transparent'
            }`}
          />

          <div className="absolute top-8 left-8 flex space-x-2">
            {BACKGROUND_IMAGES.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-1000 ${
                  i === currentImageIndex
                    ? page === 'signup'
                      ? 'bg-white w-8'
                      : 'bg-amber-400 w-8'
                    : page === 'signup'
                      ? 'bg-white/20 w-4'
                      : 'bg-white/20 w-4'
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-12 left-12 right-12 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-3">
                <img
                  src={logo}
                  alt="NexoraLife Global logo"
                  className={`h-12 w-12 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transition-all duration-700 md:h-14 md:w-14 ${
                    page === 'signup' ? 'brightness-0 invert' : ''
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-xl font-semibold tracking-tight text-white md:text-2xl">NexoraLife Global</span>
              </div>
            </motion.div>

            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-5xl font-serif italic text-white leading-none"
              >
                Join Our <br /> Community
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-1 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/80 text-base max-w-md leading-relaxed font-light"
            >
              Create an account to explore quality wellness products and learn about independent distribution opportunities with NexoraLife.
            </motion.p>

            {page === 'signup' && (
              <div className="space-y-4 pt-4">
                {[
                  { title: 'Quality', desc: 'We select products with care and value customer satisfaction.' },
                  { title: 'Empowerment', desc: 'We encourage personal growth, useful skills, and meaningful opportunities.' },
                  { title: 'Integrity', desc: 'We believe in honesty, transparency, and accountability.' },
                  { title: 'Community', desc: 'We believe in cooperation, mutual respect, and shared progress.' },
                  { title: 'Innovation', desc: 'We welcome fresh ideas and look for better ways to serve.' },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="flex items-start space-x-3 group"
                  >
                    <div className="mt-1 p-1 rounded-full bg-white/20 text-white group-hover:bg-white group-hover:text-amber-400 transition-colors">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">
                        {feature.title} – <span className="font-normal text-white/80">{feature.desc}</span>
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full md:w-1/2 flex flex-col bg-linear-to-br from-white via-amber-50/30 to-yellow-100/40 dark:from-emerald-950 dark:via-emerald-950 dark:to-yellow-900/30 p-6 md:p-10 transition-all duration-700">
          <AnimatePresence mode="wait">
            {page === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <SignUpForm
                  onLoginClick={() => router.push('/login')}
                  onLoginSuccess={() => router.push('/dashboard')}
                />
              </motion.div>
            )}
            {page === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <LoginForm
                  onSignUpClick={() => router.push('/signup')}
                  onForgotPasswordClick={() => router.push('/forgot-password')}
                  onLoginSuccess={() => router.push('/dashboard')}
                />
              </motion.div>
            )}
            {page === 'forgot-password' && (
              <motion.div
                key="forgot-password"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <ForgotPasswordForm
                  onBackToLogin={() => router.push('/login')}
                  onSignUpClick={() => router.push('/signup')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
