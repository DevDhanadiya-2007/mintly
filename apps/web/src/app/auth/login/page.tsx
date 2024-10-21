'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowRight, LogIn } from 'lucide-react'
import { Button, Input, Label } from '@ui/index'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Toast = ({ message, type }: { message: string; type: 'success' | 'error' }) => (
    <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`fixed bottom-8 right-5 ${type === 'success' ? 'bg-green-700' : 'bg-red-500'
            } text-white px-6 py-3 rounded-md shadow-lg text-sm font-medium z-50 flex items-center`}
    >
        <span className={`mr-2 ${type === 'success' ? 'text-green-200' : 'text-red-200'}`}>
            {type === 'success' ? '✓' : '✗'}
        </span>
        {message}
    </motion.div>
)

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [toast])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    const handleGoogleSignIn = () => {
        console.log('Signing in with Google')
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 -mt-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-6"
            >
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-2 text-3xl font-extrabold"
                    >
                        Sign in to your account
                    </motion.h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <Label htmlFor="email" className="sr-only">
                                Email address
                            </Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-white bg-black focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-700 placeholder-gray-500 text-white bg-black focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors duration-300"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <ArrowRight className="h-5 w-5 text-gray-700 group-hover:text-gray-900" aria-hidden="true" />
                            </span>
                            Sign in
                        </Button>
                    </div>
                </form>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-center"
                >
                    <Link href="/auth/register" className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">
                        Don&apos;t have an account? <span className="text-cyan-400 hover:text-cyan-300">Register</span>
                    </Link>
                </motion.div>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-black text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                    <path fill="none" d="M1 1h22v22H1z" />
                                </svg>
                                Continue with Google
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
            <AnimatePresence>
                {toast && (
                    <Toast message={toast.message} type={toast.type} />
                )}
            </AnimatePresence>
        </div>
    )
}