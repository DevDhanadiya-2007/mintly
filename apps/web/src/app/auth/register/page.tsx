'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Input, Label, Separator } from '@ui/index'
import { useRouter } from 'next/navigation'
import axios from "axios"

const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterForm) => {
        setIsLoading(true)
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
            if (!backendUrl) {
                throw new Error('Backend URL is not defined')
            }

            registerSchema.parse(data)

            const response = await axios.post(`${backendUrl}/api/auth/register`,
                { email: data.email, password: data.password },
                { withCredentials: true }
            )

            if (response.status === 201) {
                toast.success("Registration Successful", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
                setTimeout(() => router.push('/auth/login'), 3000)
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach((err) => {
                    setError(err.path[0] as "email" | "password", {
                        type: "manual",
                        message: err.message
                    })
                })
                toast.error("Invalid Credentials", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } else if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || 'An error occurred'
                setError("email", {
                    type: "manual",
                    message: message
                })
                toast.error(message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } else {
                console.error('Unexpected error:', error)
                toast.error("An unexpected error occurred", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <motion.div
                    className="bg-black rounded-lg shadow-xl overflow-hidden border border-gray-800"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <div className="p-8">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                            className="text-3xl font-bold text-center text-white mb-8"
                        >
                            Create an account
                        </motion.h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                                    Email address
                                </Label>
                                <div className="mt-1 relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10 bg-black border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500 transition-all duration-300"
                                        {...register("email")}
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                </div>
                                <AnimatePresence>
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-sm text-red-400 flex items-center mt-1"
                                        >
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.email.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>
                                <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                                    Password
                                </Label>
                                <div className="mt-1 relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="pl-10 pr-10 bg-black border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500 transition-all duration-300"
                                        {...register("password")}
                                        aria-invalid={errors.password ? "true" : "false"}
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none transition-colors duration-300"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {errors.password && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-sm text-red-400 flex items-center mt-1"
                                        >
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.password.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-white hover:bg-gray-200 text-black transition-all duration-300 flex items-center justify-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Create account
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                            <Separator className="my-4 bg-gray-700" />
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full bg-transparent text-white border-gray-700 hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
                                    onClick={() => toast.error("Google sign-in not implemented yet", {
                                        position: "top-center",
                                        autoClose: 1500,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                    })}
                                >
                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Continue with Google
                                </Button>
                            </motion.div>
                        </form>
                    </div>
                    <div className="px-8 py-4 bg-black border-t border-gray-800">
                        <p className="text-sm text-gray-400 text-center">
                            Already have an account?{' '}
                            <motion.a
                                href="/auth/login"
                                className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Sign in
                            </motion.a>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}