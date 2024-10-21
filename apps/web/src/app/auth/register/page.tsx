'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowRight, LogIn } from 'lucide-react'
import { z } from 'zod'
import { Button, Input, Label } from "@ui/index"
import axios from 'axios'
import { useRouter } from 'next/navigation'

const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

const Toast = ({ message, type }: { message: string; type: 'success' | 'error' }) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={`fixed bottom-4 right-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md shadow-lg text-sm`}
    >
        {message}
    </motion.div>
)

export default function page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
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
        try {
            schema.parse({ email, password })
            const response = await axios.post('http://localhost:4000/api/auth/register',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )
            if (response.status === 201) {
                setToast({ message: 'Registration successful!', type: 'success' })
                setTimeout(() => router.push('/'), 2000)
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors = error.flatten().fieldErrors
                setErrors(newErrors)
                setToast({ message: 'Please check your email and password', type: 'error' })
            } else if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || 'An error occurred'
                setErrors({ email: message })
                setToast({ message, type: 'error' })
            } else {
                console.error('Unexpected error:', error)
                setToast({ message: 'An unexpected error occurred', type: 'error' })
            }
        }
    }

    const handleGoogleSignIn = () => {
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 -mt-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8"
            >
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-6 text-3xl font-extrabold"
                    >
                        Create your account
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
                                    className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border ${errors.email ? 'border-red-500' : 'border-gray-700'} placeholder-gray-500 text-white bg-black focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm`}
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
                                    autoComplete="new-password"
                                    required
                                    className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 pr-10 border ${errors.password ? 'border-red-500' : 'border-gray-700'} placeholder-gray-500 text-white bg-black focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm`}
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
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <ArrowRight className="h-5 w-5 text-gray-700 group-hover:text-gray-900" aria-hidden="true" />
                            </span>
                            Register
                        </Button>
                    </div>
                </form>

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
                        <motion.div>
                            <Button
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                            >
                                <LogIn className="h-5 w-5 mr-2" aria-hidden="true" />
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