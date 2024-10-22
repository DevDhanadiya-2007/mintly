'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { Shield, Key, Wallet, ArrowRight, Lock, Cpu, Layers } from 'lucide-react'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@ui/index'

export default function HomePage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const controls = useAnimation()

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 }
    }))
  }, [controls])

  const features = [
    {
      icon: Shield,
      title: 'Uncompromising Security',
      description: 'Your keys are encrypted with state-of-the-art algorithms and stored exclusively in your browser. We employ zero-knowledge architecture, ensuring that even we cannot access your sensitive information.'
    },
    {
      icon: Key,
      title: 'Full Key Control',
      description: 'Maintain absolute control over your mnemonic and private keys at all times. Our system is designed to give you complete ownership and responsibility for your crypto assets.'
    },
    {
      icon: Wallet,
      title: 'Seamless Wallet Management',
      description: 'Create, import, and manage multiple wallets with ease in one secure platform. Our intuitive interface allows you to switch between wallets, monitor balances, and perform transactions effortlessly.'
    }
  ]

  const howItWorks = [
    { icon: Lock, title: 'Create or Import', description: 'Securely create a new wallet or import existing ones using industry-standard encryption methods.' },
    { icon: Cpu, title: 'Secure Storage', description: 'Your keys are encrypted and stored only in your browser, leveraging the latest in client-side security technology.' },
    { icon: Layers, title: 'Manage with Ease', description: 'Easily manage multiple wallets, track your assets, and perform transactions all from one intuitive dashboard.' }
  ]

  const faqs = [
    { question: "How does Mintly ensure the security of my keys?", answer: "Mintly uses advanced encryption algorithms to secure your keys, which are stored only in your browser. We never have access to your unencrypted keys." },
    { question: "Can I use Mintly with hardware wallets?", answer: "Yes, Mintly supports integration with popular hardware wallets for an extra layer of security." },
    { question: "What happens if I lose access to my browser?", answer: "Your keys are secured by your seed phrase. Always keep a secure, offline backup of your seed phrase to recover your wallet on any device." },
    { question: "Is Mintly compatible with all cryptocurrencies?", answer: "Mintly supports a wide range of cryptocurrencies and tokens across multiple blockchains. We're constantly expanding our support for new assets." }
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <main className="container mx-auto px-4 py-16 space-y-32">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Your Keys, Your Crypto,<br />
            <span className="text-white">
              Your Control
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Mintly empowers you with a secure, browser-based wallet management platform.
            Create, import, and control your Web3 wallets with unparalleled security and ease.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Get Started <ArrowRight className="ml-2 h-5 w-5 inline-block align-text-bottom" />
          </Button>
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
            >
              <Card
                className="bg-gray-900 overflow-hidden h-full relative group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 border-2 border-transparent">
                  <div className="absolute inset-[-2px] animate-flow-border" />
                </div>
                <CardHeader className="relative z-10 p-6">
                  <feature.icon className="w-12 h-12 text-white mb-4" />
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 relative z-10">
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12">How Mintly Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                className="flex flex-col items-center bg-gray-900 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 border-2 border-transparent">
                  <div className="absolute inset-[-2px] animate-flow-border" />
                </div>
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold mb-4">
                  <step.icon className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <blockquote className="text-xl italic text-gray-400 mb-4">
            "Mintly has revolutionized how I manage my crypto wallets. The security and ease of use are unparalleled."
          </blockquote>
          <p className="font-semibold">- Alex C., Blockchain Developer</p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AnimatePresence>
                  <AccordionContent className="text-gray-400">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AnimatePresence>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Ready to Take Control?</h2>
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Launch Mintly <ArrowRight className="ml-2 h-5 w-5 inline-block align-text-bottom" />
          </Button>
        </motion.section>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 Mintly. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}